---
sources:
  - https://kiro.dev/docs/specs/
  - https://kiro.dev/docs/specs/feature-specs/
  - https://kiro.dev/docs/specs/bugfix-specs/
  - https://kiro.dev/docs/specs/best-practices/
  - https://kiro.dev/docs/specs/plan/
  - https://kiro.dev/docs/cli/v3/new-features/
---

# Specs

<span class="level">L2</span> 스펙은 기능 하나를 **요구사항 → 설계 → 작업 목록** 문서로 나눠 합의하고 구현하는 Kiro의 핵심 기능입니다. 개념은 [스펙 주도 개발](/intro/spec-driven)에서 먼저 읽어 보세요.

## 파일 위치

```text
.kiro/specs/
└── <기능 이름>/
    ├── requirements.md   # Feature Spec: 사용자 스토리 + 인수 조건
    ├── bugfix.md         # Bugfix Spec: 현재/기대/유지해야 할 동작
    ├── design.md         # 설계
    └── tasks.md          # 작업 목록 (진행 상태 추적)
```

- 기능마다 폴더 하나가 생깁니다.
- 일반 파일이므로 Git으로 관리하고 PR에서 리뷰할 수 있습니다.

## 스펙 시작하기

**IDE**

- Kiro 패널의 **Specs** 영역에서 `+` 버튼을 누르거나,
- 채팅 패널에서 **Spec**을 선택하고 만들 기능을 설명합니다.
- 이후 스펙 종류(Feature / Bugfix / Quick)와 흐름을 고릅니다. 설정에서 기본 흐름을 지정하면 선택 단계를 건너뛸 수 있습니다.

**CLI**

- 터미널에서의 스펙 주도 개발은 **CLI V3 하네스**에서 지원됩니다. CLI 3.0.0부터 V3가 기본이므로 `kiro-cli`로 바로 쓸 수 있습니다.

## 스펙 종류

### Feature Spec

새 기능을 만들 때 씁니다. 두 가지 흐름 중 하나를 고릅니다.

| 흐름 | 순서 | 어울리는 경우 |
|------|------|---------------|
| **Requirements-First** | 요구사항 → 설계 → 작업 | 기획·요구사항이 먼저 정해진 기능 |
| **Design-First** | 설계 → 요구사항 → 작업 | 기술 구조(예: 이벤트 연동 방식)가 먼저 정해져야 하는 기능 |

`requirements.md`는 **사용자 스토리와 인수 조건(acceptance criteria)** 으로 작성됩니다. 설계로 넘어가기 전에 요구사항의 빈틈을 점검하는 **Analyze Requirements** 가이드도 공식 문서에 있습니다.

### Bugfix Spec

버그를 진단하고 고칠 때 씁니다. 첫 문서는 `bugfix.md`이며 다음 세 가지를 기록합니다.

- **현재 동작**: 지금 어떻게 잘못 동작하는가
- **기대 동작**: 어떻게 동작해야 하는가
- **유지해야 할 동작(unchanged behavior)**: 수정 후에도 바뀌면 안 되는 동작 → 회귀 방지

이후 설계와 작업 단계는 Feature Spec과 같습니다. → [레시피: 버그 수정 스펙](/recipes/bugfix-spec)

### Quick Spec

이미 잘 이해된 기능에 씁니다. 단계 사이 승인 없이 요구사항·설계·작업을 **한 번에** 만듭니다. 결과물 검토는 마지막에 한 번 합니다.

## 작업 실행하기

`tasks.md`의 작업은 하나씩 실행하고, Kiro가 진행 중·완료 상태를 표시합니다.

- 한 번에 전부 돌리기보다 **작업 1~2개씩 실행 → 테스트 → 커밋**을 권장합니다.
- 작업 실행 전에 Hook(`PreTaskExec`)으로 사전 점검을 넣을 수 있습니다. → [Hooks](/features/hooks)
- 채팅에서 `#spec:<기능 이름>`으로 스펙 전체를 컨텍스트로 붙일 수 있습니다.

## Plan 모드와의 차이

| | Plan 모드 | Spec |
|---|-----------|------|
| 산출물 | 대화 안의 계획 | `.kiro/specs/` 아래 파일 |
| 수정 권한 | 읽기 전용 (프로젝트 수정 안 함) | 작업 실행 시 수정 |
| 적합한 범위 | 짧은 작업의 계획 확인 | 여러 날, 여러 사람이 보는 기능 |

## 잘 쓰는 팁

1. **요구사항 단계에서 충분히 고치세요.** 뒤 단계로 갈수록 수정 비용이 커집니다.
2. **인수 조건을 테스트로 연결하세요.** "인수 조건마다 테스트를 하나 이상 작성"을 Steering에 넣어 두면 좋습니다.
3. **설계에 기존 구조를 명시하세요.** "기존 `order` 패키지의 Controller-Service-Repository 계층을 따른다" 같은 제약을 적습니다.
4. **스펙 파일도 리뷰 대상입니다.** 코드 PR과 함께, 또는 먼저 스펙 PR을 올려 합의합니다.
