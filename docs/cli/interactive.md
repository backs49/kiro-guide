---
sources:
  - https://kiro.dev/docs/cli/
  - https://kiro.dev/docs/cli/terminal-ui/
  - https://kiro.dev/docs/cli/reference/slash-commands
  - https://kiro.dev/docs/reference/slash-commands/
  - https://kiro.dev/docs/reference/cli-commands/
  - https://kiro.dev/docs/cli/chat/context
  - https://kiro.dev/docs/cli/v3/new-features/
---

# 대화형 TUI와 기본 명령

<span class="level">L1</span> 터미널에서 `kiro-cli`를 실행하면 대화형 터미널 UI(TUI)가 열립니다. 슬래시 명령은 이 대화형 모드에서만 쓸 수 있습니다.

## 시작하기

```bash
# 프로젝트 폴더에서 실행 (세션은 디렉터리 단위로 저장됨)
cd ~/workspace/demo
kiro-cli

# 특정 Custom agent로 시작
kiro-cli chat --agent <AGENT_NAME>
```

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
| `/usage` | | 사용량 통계와 남은 크레딧 확인 |
| `/chat` | | 세션 저장·불러오기 → [세션 관리](./sessions.md) |

::: tip `/context` 변경은 임시입니다
`/context add`로 추가한 파일은 **현재 세션에만** 적용됩니다. 매번 필요한 규칙이라면 [Steering](/features/steering)이나 Custom agent의 `resources`로 등록하세요.
:::

::: info 버전별 차이
슬래시 명령의 세부 동작과 하위 명령은 CLI 2.x와 3.0에서 다를 수 있습니다. 예: 3.0은 `/rewind`가 있고 `/checkpoint`는 2.x 클래식 전용입니다. → [CLI 2.x와 3.0](./v2-vs-v3.md)
:::

## 도구 권한 승인

Kiro CLI는 기본적으로 일부 도구(파일 쓰기, 셸 명령 등)를 쓰기 전에 승인을 요청합니다.

```text
/tools              # 도구별 현재 권한 확인
/tools trust-all    # 이 세션에서 모든 도구 신뢰 (주의)
/tools reset        # 기본 권한으로 되돌리기
```

::: danger `trust-all`은 신중하게
`trust-all`을 켜면 셸 명령과 파일 수정이 승인 없이 실행됩니다. 운영 서버 접속 정보가 있는 터미널이나 중요한 저장소에서는 쓰지 마세요. 세밀한 제어는 [Permissions](/features/permissions)를 참고하세요.
:::

## Plan 모드 (CLI 3.0)

CLI 3.0에서는 `Shift+Tab`으로 Plan 모드를 켜고 끕니다. Plan 모드는 읽기 전용이라 파일을 수정하지 않고 계획만 세웁니다.

## 일상 작업 예시

```text
> 이 프로젝트의 build.gradle 의존성을 요약하고, 버전이 오래된 라이브러리를 표로 정리해 줘.

> src/test 에서 실패하는 테스트를 찾아 ./gradlew test 로 실행하고 원인을 설명해 줘.
  수정은 내가 승인한 뒤에 해 줘.

> /compact
> 이제 OrderService 의 N+1 쿼리 문제만 고쳐 줘.
```
