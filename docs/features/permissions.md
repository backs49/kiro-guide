---
sources:
  - https://kiro.dev/docs/permissions/
  - https://kiro.dev/docs/ide/whats-new-v1/permissions/
  - https://kiro.dev/docs/cli/v3/new-features/
  - https://kiro.dev/docs/custom-agents/configuration-reference/
  - https://kiro.dev/docs/privacy-and-security/
  - https://kiro.dev/docs/ide/chat/terminal/
  - https://kiro.dev/docs/enterprise/governance/permissions/
  - https://kiro.dev/docs/cli/v3/migration-guide/
  - https://kiro.dev/changelog/cli/2-36/
---

# Permissions

<span class="level">L3</span> Permissions는 에이전트가 **어떤 도구를 승인 없이, 승인 후, 또는 전혀 쓰지 못하게** 할지 정하는 규칙입니다.

## 계층 구조 (IDE 1.0+ / CLI V3 하네스)

Kiro의 공용 기본 권한 위에 다음 규칙이 차례로 덧씌워집니다.

```text
Kiro 내장 기본값
  └─ 사용자(user) 규칙
      └─ 워크스페이스(workspace) 규칙
          └─ 에이전트(agent) 규칙
              └─ 세션(session) 규칙
```

그 위에 설정으로 바꿀 수 없는 **보안 불변 규칙(hardcoded security invariants)** 이 있습니다.

## 규칙 파일 위치

| 범위 | 위치 |
|------|------|
| 사용자 | `~/.kiro/settings/permissions.yaml` |
| 워크스페이스 | `~/.kiro/workspace-roots/<hash>/permissions.yaml` (프로젝트 폴더가 아니라 홈 디렉터리 아래에 저장) |
| 에이전트 | Custom agent 설정의 `permissions` 필드 → [Custom agents](./custom-agents.md) |
| 세션 | `/tools`, `--trust-*` 플래그 등 세션 범위 덮어쓰기 |

## 효과(effect)와 우선순위

| effect | 의미 |
|--------|------|
| `deny` | 거부 |
| `ask` | 사용자에게 확인 |
| `allow` | 승인 없이 허용 |
| `evaluate` | 판단을 다음 단계에 맡김 |

우선순위는 **`deny` > `ask` > `allow` > `evaluate`** 입니다. `deny` 규칙은 어느 범위에 있든 항상 이깁니다. 조직(Enterprise) 관리자 정책은 `deny`와 `ask`만 쓸 수 있고 `allow`는 쓸 수 없습니다.

## 규칙 작성 예

공식 문서에 나온 형태는 `rules:` 목록의 각 항목에 `capability`, `match`(glob 패턴 목록), `effect`를 짝지은 것입니다.

```yaml
# ~/.kiro/settings/permissions.yaml
rules:
  - capability: shell
    match: ["./gradlew test*", "./gradlew build*", "git status", "git diff*"]
    effect: allow
  - capability: shell
    match: ["git push*", "rm -rf*"]
    effect: deny
```

- 패턴은 **정규식이 아니라 glob**입니다. V2 규칙에서 옮길 때는 `^`, `$`를 지우고 `.*`를 `*`로 바꾸며, 복잡한 정규식은 여러 규칙으로 나눕니다.
- V3에서 서브에이전트의 도구 호출은 **부모 세션 정책도 허용할 때만** 승인 없이 실행됩니다.

::: warning TODO(확인 필요)
- 위 예시는 문서에 나온 형태(키 이름 `rules`, `capability`, `match`, `effect`)를 따랐지만, `match`가 셸 명령 전체 문자열과 어떻게 대조되는지, 그 밖의 선택 키가 있는지는 [Permissions 문서](https://kiro.dev/docs/permissions/)의 전체 스키마와 대조하지 못했습니다.
- capability별 **기본 동작(허용/확인/거부)** 표.
:::

## Approve for me

V3 대화형 세션에서 **Approve for me** 정책을 켜면 일상적인 동작은 Kiro가 대신 승인합니다(CLI 2.36.0에서 추가, 3.0에도 포함).

- `/permissions` → **Policies**에서 켜며, 워크스페이스별로 저장됩니다.
- 이미 있는 `deny`·`ask`·`allow` 규칙이 먼저 적용됩니다. 위험한 명령은 `deny` 규칙으로 막아 두세요.

## Capability (권한 대상)

규칙은 도구 단위가 아니라 **capability(능력) 단위**로 씁니다. 공식 문서에 나온 capability는 다음과 같습니다. 이 밖에 묶음을 뜻하는 `all`, `builtin`, `filesystem`도 있습니다.

| Capability | 의미 |
|------------|------|
| `fs_read` | 파일 읽기 |
| `fs_write` | 파일 쓰기 |
| `shell` | 셸 명령 실행 |
| `web_fetch` | 웹 페이지 가져오기 |
| `web_search` | 웹 검색 |
| `mcp` | MCP 도구 호출 |
| `subagent` | 서브에이전트 실행 |
| `skill` | Skill 사용 |
| `power` | Power 사용 |
| `context` | 컨텍스트 관련 |
| `diagnostics` | 진단 정보 |
| `sandbox_network` | 샌드박스 네트워크 접근 |

## V2와 V3 하네스 차이

| | CLI V2 하네스 | IDE 1.0+ / CLI V3 하네스 (3.0.0+ 기본) |
|---|------------------|--------------------|
| 설정 위치 | 에이전트 설정의 `toolsSettings`, `allowedTools` | `permissions.yaml`(사용자·워크스페이스) + 에이전트 설정의 `permissions` |
| 호환 | — | **`toolsSettings`를 읽지 않음** → 옮겨 써야 함 |
| 세션 중 조정 | `/tools trust-all`, `/tools reset` | `/tools`·플래그는 세션 범위 덮어쓰기, `/permissions`로 정책 관리 |

## 실무 권장 설정

| 작업 | 권장 |
|------|------|
| 코드 읽기·검색 | 허용 |
| 파일 쓰기 | 프로젝트 폴더 안에서만, 처음에는 확인 |
| 셸 명령 | 빌드·테스트 명령(`./gradlew test` 등)만 허용, 나머지는 확인 |
| `git push`, 배포, DB 변경 | 항상 확인 또는 거부 |
| 웹 접근 | 필요할 때만 확인 후 허용 |

::: danger Supervised 모드는 권한 통제가 아닙니다
Supervised 모드는 변경을 검토하는 워크플로일 뿐 보안 통제가 아닙니다. 위험한 동작은 Permissions로 막으세요. → [모델 · 에이전트 동작](/ide/models-and-modes)
:::
