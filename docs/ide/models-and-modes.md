---
sources:
  - https://kiro.dev/docs/models/
  - https://kiro.dev/docs/ide/chat/autopilot/
  - https://kiro.dev/docs/ide/chat/
  - https://kiro.dev/docs/privacy-and-security/
  - https://kiro.dev/docs/reference/settings/
  - https://kiro.dev/docs/specs/plan/
---

# 모델 선택과 에이전트 동작

<span class="level">L1</span> 어떤 모델로, 얼마나 자율적으로 에이전트를 움직일지 정하는 설정입니다.

## 모델 선택

채팅 패널의 모델 선택기에서 모델을 고릅니다.

- **Auto**: Kiro가 작업마다 적절한 모델로 자동 라우팅합니다. 공식 문서는 대부분의 작업을 Auto로 시작하라고 권장합니다.
- **특정 모델 직접 선택**: 복잡한 설계나 어려운 디버깅처럼 특정 모델이 필요할 때 고릅니다. 모델에 따라 크레딧 소모가 달라집니다. → [요금과 크레딧](/pricing/)
- 모델 선택은 **채팅(대화형·비대화형)** 에만 적용됩니다.
- 조직 관리자가 **모델 접근 관리**를 켜면, 승인된 모델만 IDE와 CLI의 선택기에 나타납니다.

::: info 모델 목록은 자주 바뀝니다
제공 모델과 플랜별 사용 가능 여부는 수시로 바뀌므로 이 가이드에는 모델 이름을 고정해 적지 않습니다. [Models 문서](https://kiro.dev/docs/models/)를 확인하세요.
:::

## Autopilot과 Supervised

| 모드 | 동작 | 추천 상황 |
|------|------|-----------|
| **Autopilot** (기본) | 에이전트가 여러 파일 수정과 복잡한 작업을 최소한의 개입으로 진행 | 익숙한 프로젝트, 스펙 작업 목록 실행 |
| **Supervised** | 파일 수정이 있는 **턴마다 사용자 승인**을 기다림. 변경은 hunk 단위로 표시 | Kiro를 처음 쓸 때, 중요 모듈 수정 |

전환 방법:

- 채팅 화면의 모드 전환 토글
- **Settings → Agent → Agent Autonomy** (설정 키 `kiroAgent.agentAutonomy`)

::: danger Supervised는 보안 장치가 아닙니다
공식 문서는 Supervised 모드를 **코드 리뷰 워크플로**로 설명하며, 보안 통제 수단이 아니라고 명시합니다. 명령 실행, 파일 접근 같은 위험은 [Permissions](/features/permissions)와 워크스페이스 신뢰 설정으로 관리하세요.
:::

## Plan 모드

Plan 모드는 **읽기 전용**으로 동작하며 프로젝트를 수정하지 않습니다. 구현 전에 계획만 세우고 검토하고 싶을 때 씁니다. 계획을 확정하면 실행 단계로 넘기는데, 클래식 모드에서는 넘기기 전에 확인을 요청합니다.

- CLI 3.0에서는 `Shift+Tab`으로 Plan 모드를 켜고 끕니다.

::: warning TODO(확인 필요)
IDE에서 Plan 모드를 켜는 정확한 UI 위치는 [Plan mode 문서](https://kiro.dev/docs/specs/plan/)에서 확인 후 추가할 예정입니다.
:::

## 에이전트가 하는 일 확인하기

- 채팅 응답에는 에이전트가 읽은 파일, 실행한 도구·명령, 수정한 파일이 표시됩니다.
- 명령 실행이나 MCP 도구 호출은 권한 설정에 따라 승인 요청이 뜹니다. **무슨 명령인지 읽고** 승인하세요.
- 신뢰하지 않은 워크스페이스에서는 MCP `autoApprove` 목록에 있는 도구도 매번 승인을 요청합니다.

## 실무 추천 설정

1. 처음 1~2주: **Supervised + Auto 모델**로 변경을 하나씩 확인
2. 익숙해진 뒤: 일반 작업은 **Autopilot**, 중요 모듈은 Supervised
3. 큰 기능: 먼저 **Plan 모드나 스펙**으로 계획을 합의한 뒤 실행
