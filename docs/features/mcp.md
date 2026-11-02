---
sources:
  - https://kiro.dev/docs/mcp/
  - https://kiro.dev/docs/mcp/configuration/
  - https://kiro.dev/docs/mcp/security
  - https://kiro.dev/docs/mcp/examples/
  - https://kiro.dev/docs/cli/mcp/
  - https://kiro.dev/docs/custom-agents/configuration-reference/
---

# MCP (Model Context Protocol)

<span class="level">L3</span> MCP 서버를 연결하면 문서 검색, 이슈 트래커, DB 조회 같은 외부 기능을 Kiro 에이전트의 **도구**로 쓸 수 있습니다.

## 설정 파일 위치

| 범위 | 경로 |
|------|------|
| 워크스페이스 | `.kiro/settings/mcp.json` |
| 사용자(전역) | `~/.kiro/settings/mcp.json` |
| Custom agent 전용 | 에이전트 설정의 `mcpServers` 필드 → [Custom agents](./custom-agents.md) |

IDE와 CLI는 같은 경로의 설정을 읽습니다.

## 설정 형식

최상위 `mcpServers` 객체 아래에 서버 이름별로 정의합니다.

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

| 키 | 설명 |
|----|------|
| `command`, `args` | 서버 실행 명령과 인자 |
| `env` | 서버에 넘길 환경 변수. 비밀 값은 `${ENV_NAME}`처럼 **환경 변수 참조**로 씀 |
| `disabled` | `true`면 서버 전체 비활성화 |
| `autoApprove` | 확인 없이 실행할 도구 이름 목록 |
| `disabledTools` | 이 서버에서 쓰지 않을 도구 목록 (예: 삭제, 강제 push) |
| `timeout` | 요청당 제한 시간(밀리초), 기본 120000 |

## CLI로 서버 추가

```bash
kiro-cli mcp add   # 이름, 범위(scope), 명령, 인자, 환경 변수를 지정
```

대화 중에는 `/mcp`로 연결 상태를 확인합니다.

::: warning TODO(확인 필요)
`kiro-cli mcp add`의 정확한 플래그 이름은 [CLI MCP 문서](https://kiro.dev/docs/cli/mcp/)에서 확인하세요.
:::

## Custom agent에서 MCP 도구 지정

에이전트 설정의 `tools` 목록에서 다음 표기를 쓸 수 있습니다.

| 표기 | 의미 |
|------|------|
| `*` | 내장 도구 + 모든 MCP 도구 |
| `@builtin` | 모든 내장 도구 |
| `@<서버 이름>` | 해당 MCP 서버의 모든 도구 |

`includeMcpJson`으로 워크스페이스·사용자 `mcp.json`의 서버를 포함할지 정하고, 서로 다른 서버가 같은 이름의 도구를 내놓으면 `toolAliases`로 구분합니다.

## 보안 원칙

::: danger MCP 서버는 Kiro 샌드박스 밖에서 실행됩니다
MCP 서버는 내 PC에서 내 권한으로 동작하는 프로그램입니다. 다음을 지키세요.
:::

1. **출처를 확인한 서버만** 설치합니다.
2. **토큰은 하드코딩하지 않습니다.** `${GITHUB_TOKEN}`처럼 환경 변수를 참조하고, 설정 파일 권한을 `chmod 600`으로 제한합니다.
3. **`autoApprove`는 읽기 전용 도구에만** 씁니다. 쓰기·삭제 도구는 매번 확인하게 둡니다.
4. **위험한 도구는 `disabledTools`로 막습니다.**
5. **DB 연결은 읽기 전용 계정**으로, 운영 DB가 아닌 개발 DB에만 연결합니다.
6. 신뢰하지 않은 워크스페이스에서는 `autoApprove`에 있는 도구도 매번 승인을 요청합니다. 처음 받은 저장소는 내용을 확인한 뒤 신뢰하세요.

## 조직 정책

회사가 Kiro Enterprise를 쓰면 관리자가 MCP 사용을 제한할 수 있습니다. 사용할 수 없는 서버가 있다면 관리자 정책을 먼저 확인하세요.
