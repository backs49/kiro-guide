---
sources:
  - https://kiro.dev/docs/steering/
  - https://kiro.dev/docs/cli/steering/
---

# 레시피: 팀 컨벤션 Steering 작성

<span class="level">L2</span> 팀의 코딩 규칙을 Steering 파일로 정리해 Git으로 공유합니다. 모든 팀원의 Kiro가 같은 규칙을 따르게 만드는 것이 목표입니다.

## 권장 파일 구성

```text
.kiro/steering/
├── product.md          # (always) 서비스 개요 — Generate Steering Docs로 생성 후 수정
├── tech.md             # (always) 기술 스택과 버전
├── structure.md        # (always) 패키지 구조, 계층 규칙
├── java-conventions.md # (fileMatch: src/main/java/**) 코딩 규칙
├── testing.md          # (fileMatch: src/test/**) 테스트 규칙
├── database.md         # (fileMatch: **/db/migration/**, **/*Repository.java) DB 규칙
└── security-review.md  # (manual) 필요할 때 호출하는 보안 점검
```

`always` 파일은 짧게 유지하고, 상세 규칙은 `fileMatch`로 나눕니다.

## tech.md 예시 (always)

```markdown
---
inclusion: always
---

# 기술 스택
- Java 17, Spring Boot 3.x, Gradle (Kotlin DSL)
- Spring Data JPA + QueryDSL, DB: <DB_PRODUCT> (개발 환경은 Testcontainers)
- 테스트: JUnit 5, AssertJ, Mockito
- 빌드·테스트 명령: `./gradlew build`, `./gradlew test`

# 금지
- 새 라이브러리를 추가하기 전에 반드시 이유를 설명하고 승인을 받는다.
- Lombok `@Data`를 엔티티에 쓰지 않는다. (equals/hashCode 문제)
```

## java-conventions.md 예시 (fileMatch)

```markdown
---
inclusion: fileMatch
fileMatchPattern: "src/main/java/**/*.java"
---

# 계층 규칙
- Controller는 요청 검증과 응답 변환만 한다. 비즈니스 로직은 Service에 둔다.
- Controller는 Repository를 직접 호출하지 않는다.
- 엔티티를 API 응답으로 직접 반환하지 않는다. `*Response` DTO로 변환한다.

# 트랜잭션
- 쓰기 메서드는 Service에 `@Transactional`을 붙인다.
- 조회 전용 Service 메서드는 `@Transactional(readOnly = true)`를 쓴다.

# 예외
- 비즈니스 예외는 `BusinessException`을 상속하고 오류 코드를 가진다.
- 예외 응답 형식은 `GlobalExceptionHandler`에서 통일한다.

# 로그
- 개인정보(이름, 전화번호, 이메일), 토큰, 비밀번호를 로그에 남기지 않는다.
```

## database.md 예시 (fileMatch, 패턴 여러 개)

```markdown
---
inclusion: fileMatch
fileMatchPattern:
  - "**/db/migration/**"
  - "**/*Repository.java"
---

# DB 규칙
- 이미 배포된 마이그레이션 파일은 수정하지 않는다. 새 버전 파일을 추가한다.
- 네이티브 쿼리에서 문자열 연결로 SQL을 만들지 않는다. 바인딩 파라미터를 쓴다.
- 대량 조회에는 페이징을 적용하고 정렬 키는 유일하게 만든다.
- 운영 DB 접속 정보, 계정, 내부 호스트명은 어떤 파일에도 쓰지 않는다.
```

## security-review.md 예시 (manual)

```markdown
---
inclusion: manual
---

# 보안 점검
다음 항목을 점검하고 위반 위치를 파일:라인으로 보여 준다. 수정은 하지 않는다.
1. 인증·인가 누락 엔드포인트
2. SQL/JPQL 인젝션 가능성
3. 민감 정보 로그 출력
4. 입력 검증 누락
```

채팅에서 `#security-review` 또는 `/` 메뉴로 호출합니다.

## 팀 운영 팁

1. **처음엔 작게**: 실제로 반복해서 지적하던 규칙 10개 정도로 시작합니다.
2. **리뷰 코멘트에서 승격**: PR 리뷰에서 같은 지적이 두 번 나오면 Steering에 추가합니다.
3. **소유자 지정**: `CODEOWNERS`로 `.kiro/steering/` 변경 시 리뷰어를 지정합니다.
4. **효과 확인**: 규칙을 추가한 뒤 실제로 지켜지는지 몇 번 시험해 보고, 안 지켜지면 표현을 더 구체적으로 바꿉니다.
5. **개인 취향은 전역으로**: 팀 규칙이 아닌 개인 선호(응답 길이 등)는 `~/.kiro/steering/`에 둡니다.

::: tip AGENTS.md와 함께 쓰기
다른 AI 도구도 함께 쓰는 팀이라면 공통 규칙을 `AGENTS.md`에 두는 방법도 있습니다. Kiro는 `AGENTS.md`를 읽지만 포함 모드를 지원하지 않고 **항상 포함**합니다. 길어지지 않게 관리하세요.
:::
