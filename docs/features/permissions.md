---
sources:
  - https://kiro.dev/docs/permissions/
  - https://kiro.dev/docs/ide/whats-new-v1/permissions/
  - https://kiro.dev/docs/cli/v3/new-features/
  - https://kiro.dev/docs/custom-agents/configuration-reference/
  - https://kiro.dev/docs/privacy-and-security/
---

# Permissions

<span class="level">L3</span> Permissions는 에이전트가 **어떤 도구를 승인 없이, 승인 후, 또는 전혀 쓰지 못하게** 할지 정하는 규칙입니다.

## 계층 구조 (IDE 1.0+ / CLI 3.0)

Kiro의 공용 기본 권한 위에 다음 규칙이 차례로 덧씌워집니다.

```text
Kiro 내장 기본값
  └─ 사용자(user) 규칙
      └─ 워크스페이스(workspace) 규칙
          └─ 에이전트(agent) 규칙
              └─ 세션(session) 규칙
```

## Capability (권한 대상)

규칙은 도구 단위가 아니라 **capability(능력) 단위**로 씁니다. 공식 문서에 나온 capability는 다음과 같습니다.

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

::: warning TODO(확인 필요)
- capability별 **기본 동작(허용/확인/거부)** 표
- `permissions.rules`의 정확한 JSON 문법(규칙 항목의 키 이름, 경로·명령 패턴 표기)

위 두 가지는 [Permissions 문서](https://kiro.dev/docs/permissions/)에서 확인 후 예시를 추가할 예정입니다.
:::

## 2.x와 3.0 차이

| | CLI 2.x (클래식) | IDE 1.0+ / CLI 3.0 |
|---|------------------|--------------------|
| 설정 위치 | 에이전트 설정의 `toolsSettings`, `allowedTools` | 에이전트 설정의 `permissions` (capability 기반 `permissions.rules`) |
| 호환 | — | **`toolsSettings`를 읽지 않음** → 옮겨 써야 함 |
| 세션 중 조정 | `/tools trust-all`, `/tools reset` | 세션 규칙으로 덧씌움 |

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
