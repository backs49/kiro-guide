---
sources:
  - https://kiro.dev/docs/models/
  - https://kiro.dev/docs/ide/chat/autopilot/
  - https://kiro.dev/docs/ide/chat/
  - https://kiro.dev/docs/privacy-and-security/
  - https://kiro.dev/docs/reference/settings/
  - https://kiro.dev/docs/specs/plan/
  - https://kiro.dev/docs/permissions/
  - https://kiro.dev/changelog/ide/1-4-154/
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

## 권한 모드: Supervised · Accept file changes · Approve for me {#permission-modes}

IDE 1.4.154(2026-11-10)부터 채팅 입력창의 Autopilot 토글이 **권한 모드 메뉴**로 바뀌었습니다(지원되는 환경에서). Approve for me를 쓸 수 없는 환경에서는 예전처럼 Autopilot 토글이 보이며, Supervised와 Accept file changes 사이를 전환합니다.

| 모드 | 동작 | 추천 상황 |
|------|------|-----------|
| **Supervised** | 파일 수정이 있는 **턴마다 사용자 승인**을 기다림. 변경은 hunk 단위로 표시 | Kiro를 처음 쓸 때, 중요 모듈 수정 |
| **Accept file changes** (이전 이름 Autopilot) | 파일 생성·수정·삭제는 묻지 않고 진행. **명령 실행은 여전히 확인** | 익숙한 프로젝트, 스펙 작업 목록 실행 |
| **Approve for me** | 규칙이 정하지 않은 동작을 모델이 판단해 안전하면 승인, 위험하면 차단, 애매하면 사용자에게 질문 | 승인 요청이 너무 잦을 때. deny·ask·allow 규칙이 먼저 적용됨 → [Permissions](/features/permissions#approve-for-me) |

전환 방법:

- 채팅 입력창의 **권한 모드 메뉴**에서 고릅니다. 고른 모드는 그 채팅에 유지됩니다.
- 새 채팅의 시작 모드: **Settings → Agent → Agent Autonomy** (설정 키 `kiroAgent.agentAutonomy`, 값 이름은 여전히 Autopilot / Supervised)
- Approve for me를 새 채팅의 기본값으로: What's new 화면의 **Use Approve for me by default**, 또는 명령 팔레트의 **Kiro: Approve For Me (User)...** / **Kiro: Approve For Me (Workspace)...** (IDE 1.4.178+. 1.4.154에서는 `Kiro: Enable Approve For Me (User)` 등)
- 신뢰하지 않은 워크스페이스는 Supervised로 시작하고 Approve for me는 꺼져 있습니다. 조직이 관리하는 경우 스위치가 잠깁니다.

::: danger Supervised는 보안 장치가 아닙니다
공식 문서는 Supervised 모드를 **코드 리뷰 워크플로**로 설명하며, 보안 통제 수단이 아니라고 명시합니다. 명령 실행, 파일 접근 같은 위험은 [Permissions](/features/permissions)와 워크스페이스 신뢰 설정으로 관리하세요.
:::

## Plan 모드

Plan 모드는 **읽기 전용**으로 동작하며 프로젝트를 수정하지 않습니다. 구현 전에 계획만 세우고 검토하고 싶을 때 씁니다. 계획을 확정하면 실행 단계로 넘기는데, 클래식 모드에서는 넘기기 전에 확인을 요청합니다.

- CLI(V3 하네스)에서는 `Shift+Tab`으로 Plan 모드를 켜고 끕니다.

::: warning TODO(확인 필요)
IDE에서 Plan 모드를 켜는 정확한 UI 위치는 [Plan mode 문서](https://kiro.dev/docs/specs/plan/)에서 확인 후 추가할 예정입니다.
:::

## 에이전트가 하는 일 확인하기

- 채팅 응답에는 에이전트가 읽은 파일, 실행한 도구·명령, 수정한 파일이 표시됩니다.
- 명령 실행이나 MCP 도구 호출은 권한 설정에 따라 승인 요청이 뜹니다. **무슨 명령인지 읽고** 승인하세요.
- 신뢰하지 않은 워크스페이스에서는 MCP `autoApprove` 목록에 있는 도구도 매번 승인을 요청합니다.

## 실무 추천 설정

1. 처음 1~2주: **Supervised + Auto 모델**로 변경을 하나씩 확인
2. 익숙해진 뒤: 일반 작업은 **Accept file changes**(이전 Autopilot) 또는 **Approve for me**, 중요 모듈은 Supervised
3. 큰 기능: 먼저 **Plan 모드나 스펙**으로 계획을 합의한 뒤 실행
