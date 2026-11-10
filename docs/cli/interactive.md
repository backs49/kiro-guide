---
sources:
  - https://kiro.dev/docs/cli/
  - https://kiro.dev/docs/cli/terminal-ui/
  - https://kiro.dev/docs/cli/reference/slash-commands
  - https://kiro.dev/docs/reference/slash-commands/
  - https://kiro.dev/docs/reference/cli-commands/
  - https://kiro.dev/docs/cli/chat/context
  - https://kiro.dev/docs/cli/v3/new-features/
  - https://kiro.dev/changelog/cli/2-33/
  - https://kiro.dev/changelog/cli/2-36/
  - https://kiro.dev/changelog/cli/3-1/
---

# 대화형 TUI와 기본 명령

<span class="level">L1</span> 터미널에서 `kiro-cli`를 실행하면 대화형 터미널 UI(TUI)가 열립니다. 슬래시 명령은 이 대화형 모드에서만 쓸 수 있습니다. 이 페이지는 CLI 3.0.0부터 기본인 **V3 하네스** 기준입니다. → [CLI V3와 V2 하네스](./v2-vs-v3.md)

## 시작하기

```bash
# 프로젝트 폴더에서 실행 (세션은 디렉터리 단위로 저장됨)
cd ~/workspace/demo
kiro-cli

# 특정 Custom agent로 시작
kiro-cli chat --agent <AGENT_NAME>
```

### 처음 여는 폴더: 워크스페이스 신뢰

V3 대화형 세션은 처음 여는 폴더를 **신뢰할지** 묻습니다. 신뢰하기 전에는 그 폴더의 Hook, Custom agent, MCP 서버, Steering, Skill, Workflow, 언어 서버 설정을 로드하지 않고, 셸 명령·MCP 도구 호출·Kiro 설정 폴더 쓰기도 매번 확인합니다.

- 답은 워크스페이스 루트별로 `~/.kiro/workspace-roots/` 아래에 저장되어 폴더마다 한 번만 묻습니다. 홈 디렉터리는 실행할 때마다 다시 묻습니다.
- 처음 받은 저장소는 `.kiro/` 폴더(Hook, MCP 설정 등)를 먼저 읽어 본 뒤 신뢰하세요.

## 자주 쓰는 슬래시 명령

| 명령 | 별칭 | 설명 |
|------|------|------|
| `/help` | | Help Agent로 전환해 Kiro CLI 사용법을 질문. `/help --legacy`는 기존 도움말 표시 |
| `/quit` | `/exit`, `/q` | 종료 |
| `/clear` | `/c` | 현재 세션의 대화 기록을 지우고 컨텍스트를 초기화 (같은 세션 유지) |
| `/compact` | | 대화를 요약해 컨텍스트 공간 확보 |
| `/context` | `/ctx` | 컨텍스트 파일 관리와 컨텍스트 창 사용량 확인. `show`, `add`, `remove`, `clear` |
| `/model` | | 모델 변경 또는 기본 모델 설정 (기본값 Auto) |
| `/agent` | | 에이전트 관리. `list`, `swap`, `set-default`, `create` 등 → [Custom agents](/features/custom-agents) |
| `/tools` | | 도구 목록과 권한 확인. `trust-all`, `reset`, `schema` 등 |
| `/mcp` | | 연결된 MCP 서버 확인 → [MCP](/features/mcp) |
| `/usage` | | 사용량 통계와 남은 크레딧 확인. 3.1.0부터 **현재 세션에서 쓴 크레딧**도 표시 (상태 표시줄에도 표시) |
| `/permissions` | | 권한 규칙과 정책 확인·변경 (Approve for me 포함) → [Permissions](/features/permissions) |
| `/workflow` | | Workflow 실행·목록·기록 → [Workflows](/features/workflows) |
| `/chat` | | 세션 저장·불러오기 → [세션 관리](./sessions.md) |

::: tip `/context` 변경은 임시입니다
`/context add`로 추가한 파일은 **현재 세션에만** 적용됩니다. 매번 필요한 규칙이라면 [Steering](/features/steering)이나 Custom agent의 `resources`로 등록하세요.
:::

::: info 버전별 차이
슬래시 명령의 세부 동작과 하위 명령은 V3와 V2 하네스에서 다를 수 있습니다. 예: V3는 `/rewind`로 이전 턴에서 분기합니다. → [CLI V3와 V2 하네스](./v2-vs-v3.md)
:::

## 도구 권한 승인

Kiro CLI는 기본적으로 일부 도구(파일 쓰기, 셸 명령 등)를 쓰기 전에 승인을 요청합니다.

```text
/tools              # 도구별 현재 권한 확인
/tools trust-all    # 이 세션에서 모든 도구 신뢰 (주의)
/tools reset        # 기본 권한으로 되돌리기
```

V3에서 `/tools` 명령과 `--trust-*` 플래그는 **세션 범위의 덮어쓰기**로 남아 있고, 지속적인 규칙은 `permissions.yaml`로 관리합니다.

::: danger `trust-all`은 신중하게
`trust-all`을 켜면 셸 명령과 파일 수정이 승인 없이 실행됩니다. 운영 서버 접속 정보가 있는 터미널이나 중요한 저장소에서는 쓰지 마세요. 세밀한 제어는 [Permissions](/features/permissions)를 참고하세요.
:::

### Approve for me

V3 대화형 세션에서는 **Approve for me** 정책을 켜면 일상적인 동작은 Kiro가 대신 승인합니다. `/permissions` → **Policies**에서 설정하며 워크스페이스별로 저장됩니다. 이미 있는 deny·ask·allow 규칙이 먼저 적용됩니다.

## Plan 모드

V3 하네스에서는 `Shift+Tab`으로 Plan 모드를 켜고 끕니다. Plan 모드는 읽기 전용이라 파일을 수정하지 않고 계획만 세웁니다.

## 일상 작업 예시

```text
> 이 프로젝트의 build.gradle 의존성을 요약하고, 버전이 오래된 라이브러리를 표로 정리해 줘.

> src/test 에서 실패하는 테스트를 찾아 ./gradlew test 로 실행하고 원인을 설명해 줘.
  수정은 내가 승인한 뒤에 해 줘.

> /compact
> 이제 OrderService 의 N+1 쿼리 문제만 고쳐 줘.
```
