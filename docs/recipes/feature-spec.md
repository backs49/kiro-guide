---
sources:
  - https://kiro.dev/docs/specs/feature-specs/
  - https://kiro.dev/docs/specs/best-practices/
  - https://kiro.dev/docs/specs/
---

# 레시피: 기능 추가 스펙 작성

<span class="level">L2</span> 일반적인 Spring Boot 주문 서비스에 **"주문 취소 API"** 를 추가하는 과정을 Feature Spec(Requirements-First)으로 진행합니다.

::: info 예시 프로젝트 가정
- Spring Boot 3.x, Java 17+, Gradle, Spring Data JPA
- `order` 패키지에 `OrderController` → `OrderService` → `OrderRepository` 계층
- 주문 상태: `CREATED`, `PAID`, `SHIPPED`, `CANCELLED`

아래 문서 내용은 **사람이 검토·수정한 결과의 예시**입니다. Kiro가 만든 초안은 형식과 표현이 다를 수 있습니다.
:::

## 1. 스펙 시작

IDE 채팅에서 **Spec**을 선택하고 다음처럼 요청합니다.

```text
주문 취소 API를 추가하고 싶어.
- 결제 완료(PAID) 상태까지만 취소 가능, 배송 시작(SHIPPED) 이후는 취소 불가
- 취소 시 상태를 CANCELLED로 바꾸고 취소 사유와 시각을 저장
- 본인 주문만 취소 가능
기존 order 패키지의 Controller-Service-Repository 구조를 따라 줘.
```

Feature Spec → **Requirements-First**를 고릅니다.

## 2. requirements.md 검토

Kiro가 사용자 스토리와 인수 조건 초안을 만듭니다. 다음 관점으로 검토·수정합니다.

```markdown
# 요구사항: 주문 취소

## 사용자 스토리 1
고객으로서, 배송이 시작되기 전에 내 주문을 취소하고 싶다. 잘못 주문한 상품의 결제를 되돌리기 위해서다.

### 인수 조건
1. 주문 상태가 CREATED 또는 PAID이면, 시스템은 상태를 CANCELLED로 변경해야 한다.
2. 주문 상태가 SHIPPED 또는 CANCELLED이면, 시스템은 409 Conflict와 오류 코드 ORDER_NOT_CANCELLABLE을 반환해야 한다.
3. 요청자가 주문 소유자가 아니면, 시스템은 403 Forbidden을 반환해야 한다.
4. 취소에 성공하면, 시스템은 취소 사유(최대 200자)와 취소 시각을 저장해야 한다.
5. 존재하지 않는 주문이면, 시스템은 404 Not Found를 반환해야 한다.
```

**검토 체크리스트**

- [ ] 상태별 동작이 빠짐없이 정의되었는가 (상태 × 동작 표를 떠올려 보기)
- [ ] 오류 응답 코드와 형식이 기존 API 규칙과 맞는가
- [ ] 권한 조건이 있는가
- [ ] 범위 밖 항목(예: 환불 처리 연동)이 명시적으로 제외되었는가

::: tip 범위 밖 항목을 적어 두세요
"결제 취소(환불) 연동은 이번 범위가 아니다"처럼 **하지 않을 일**을 요구사항에 적으면 에이전트가 범위를 넘어 수정하는 일을 줄일 수 있습니다.
:::

## 3. design.md 검토

```markdown
# 설계: 주문 취소

## API
POST /api/orders/{orderId}/cancel
Request: { "reason": "string (<=200)" }
Response 200: OrderResponse

## 변경 컴포넌트
- OrderController: cancel 엔드포인트 추가, @Valid 로 reason 길이 검증
- OrderService.cancel(orderId, userId, reason): @Transactional
- Order 엔티티: cancel(reason, now) 도메인 메서드에서 상태 전이 검증
- 예외: OrderNotCancellableException → 409 (기존 GlobalExceptionHandler에 매핑)

## 데이터
- orders 테이블에 cancel_reason VARCHAR(200), cancelled_at TIMESTAMP 컬럼 추가
- Flyway: V<다음 번호>__add_order_cancel_columns.sql

## 동시성
- 동일 주문 동시 취소/배송 처리 방지를 위해 낙관적 락(@Version) 사용
```

**검토 포인트**

- 상태 전이 검증이 **엔티티(도메인)에 있는지, 서비스에 흩어져 있는지** 팀 규칙과 맞춰 봅니다.
- DB 변경이 있으면 마이그레이션 방식(Flyway/Liquibase)과 운영 반영 절차를 확인합니다. Oracle을 쓴다면 컬럼 타입(`VARCHAR2`, `TIMESTAMP`)과 DDL 반영 승인 절차를 설계에 적어 둡니다.
- 트랜잭션 경계와 동시성 처리가 명시되었는지 봅니다.

## 4. tasks.md 실행

```markdown
- [ ] 1. Flyway 마이그레이션 추가 (cancel_reason, cancelled_at)
- [ ] 2. Order.cancel() 도메인 메서드와 단위 테스트 (상태별 성공/실패)
- [ ] 3. OrderNotCancellableException 및 예외 매핑
- [ ] 4. OrderService.cancel() + 권한 검증 + 단위 테스트
- [ ] 5. OrderController 엔드포인트 + MockMvc 테스트 (200/403/404/409)
- [ ] 6. API 문서 갱신
```

권장 진행 방식:

1. 작업 **1~2개씩** 실행합니다.
2. 실행 후 `./gradlew test`로 확인합니다.
3. 통과하면 커밋합니다. (예: `feat(order): 주문 취소 도메인 로직 추가`)
4. 다음 작업으로 넘어갑니다.

## 5. PR 올리기

- 스펙 파일(`.kiro/specs/order-cancel/`)과 코드 변경을 같은 PR에 올리면 리뷰어가 **요구사항 → 설계 → 구현**을 함께 볼 수 있습니다.
- 팀에 따라 스펙만 먼저 PR로 합의하고 구현 PR을 나누는 방식도 좋습니다.
