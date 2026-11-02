---
sources:
  - https://kiro.dev/docs/ide/chat/
  - https://kiro.dev/docs/ide/chat/slash-commands/
  - https://kiro.dev/docs/checkpoints/
  - https://kiro.dev/changelog/ide/
---

# 채팅 인터페이스

<span class="level">L1</span> Kiro IDE에서 가장 많이 쓰는 화면인 채팅 패널의 구성과 기본 사용법입니다.

## 채팅 패널 구성

채팅 패널은 크게 다음 요소로 이루어집니다.

| 요소 | 역할 |
|------|------|
| 입력창 | 요청 입력. `#`으로 컨텍스트 참조, `/`로 슬래시 명령 호출 |
| 모델 선택기 | 사용할 모델 또는 Auto 선택 → [모델 · 에이전트 동작](./models-and-modes.md) |
| 에이전트 선택기 | 기본 에이전트 또는 [Custom agent](/features/custom-agents) 선택 (에이전트가 응답 대기 중일 때만 전환 가능) |
| 모드 전환 | Autopilot / Supervised |

## 일반 대화(Vibe)와 스펙

채팅에서 바로 요청하면 일반 대화로 처리됩니다. 범위가 큰 기능이라면 채팅 패널에서 **Spec**을 선택해 스펙 흐름으로 시작할 수 있습니다. → [Specs](/features/specs)

## 슬래시 명령 (`/`)

입력창에 `/`를 입력하면 사용할 수 있는 명령 목록이 나타납니다. 항목을 고르고 Enter를 누르면 실행됩니다.

- `inclusion: manual` 또는 `inclusion: auto`로 설정한 **Steering 파일은 슬래시 명령으로도 나타납니다.** 예를 들어 `.kiro/steering/code-review.md`를 manual로 만들면 `/`메뉴에서 골라 호출할 수 있습니다. → [Steering](/features/steering)
- 일부 내장 명령은 스펙 세션에서만 사용할 수 있습니다.

## 파일을 채팅에 붙이기

- `#file`, `#folder` 등 컨텍스트 참조로 붙입니다. → [컨텍스트 참조](./context.md)
- 탐색기에서 파일을 채팅 창으로 끌어다 놓을 수 있습니다. IDE 1.4.62부터 Shift 키를 누르지 않고도 끌어다 놓을 수 있습니다.

## 변경 검토와 되돌리기 (Checkpoints)

에이전트가 파일을 수정하면 변경 내용(diff)이 표시됩니다. IDE의 **Checkpoints** 기능을 쓰면 코드베이스와 대화를 이전 시점으로 되돌릴 수 있습니다.

::: tip Checkpoints는 Git을 대체하지 않습니다
Checkpoints는 Kiro 안에서의 되돌리기 기능입니다. 의미 있는 단위마다 Git 커밋을 남기는 습관을 유지하세요. CLI 3.0에는 Checkpoints가 없고 `/rewind`와 Git으로 되돌립니다. → [CLI 2.x와 3.0](/cli/v2-vs-v3)
:::

## 요청을 잘 쓰는 법

| 덜 좋은 요청 | 더 좋은 요청 |
|--------------|-------------|
| 로그인 기능 만들어 줘 | `#spec:user-login` 의 tasks 중 2번(비밀번호 검증)만 구현하고 단위 테스트를 추가해 줘 |
| 이 에러 고쳐 줘 | `#terminal` `#file`(OrderService.java) 테스트 실패 원인을 먼저 설명하고, 수정안은 승인 후 적용해 줘 |
| 코드 리팩터링해 줘 | `#folder`(order 패키지) 에서 Repository 호출이 중복된 메서드를 찾아 목록만 보여 줘 |

원칙은 세 가지입니다.

1. **범위**를 파일·패키지·작업 번호로 좁힌다.
2. **완료 조건**(테스트 통과, 응답 형식 등)을 적는다.
3. 위험한 작업은 **설명 먼저, 적용은 나중에**라고 요청한다.
