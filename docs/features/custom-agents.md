---
sources:
  - https://kiro.dev/docs/custom-agents/
  - https://kiro.dev/docs/custom-agents/creating/
  - https://kiro.dev/docs/custom-agents/configuration-reference/
  - https://kiro.dev/docs/cli/custom-agents/creating/
  - https://kiro.dev/docs/custom-agents/built-in/
  - https://kiro.dev/docs/cli/custom-agents/troubleshooting
---

# Custom agents

<span class="level">L3</span> Custom agent는 **지시문, 사용할 도구, 권한, 참고 자료, 모델**을 묶은 역할별 에이전트입니다. 예: "리뷰만 하고 수정은 하지 않는 리뷰 에이전트", "문서만 쓰는 에이전트".

## 파일 위치

| 범위 | 경로 | 비고 |
|------|------|------|
| 워크스페이스 | `.kiro/agents/` | Git으로 팀과 공유. **신뢰한 워크스페이스에서만 로드** |
| 전역 | `~/.kiro/agents/` | 모든 프로젝트 |

- 파일 이름이 에이전트 이름이 됩니다.
- 같은 이름이면 **워크스페이스 에이전트가 우선**합니다.
- 설정 형식은 JSON입니다. 공식 문서는 Markdown 형식도 지원한다고 설명합니다.

## 만들기

```bash
# CLI 대화 중
/agent create

# 셸에서
kiro-cli agent create <AGENT_NAME>
```

- `/agent create`는 기본적으로 AI가 설정 작성을 도와줍니다. 직접 작성하려면 `--manual`을 씁니다.
- 저장 위치를 지정하지 않으면 **전역 디렉터리**에 저장됩니다. 워크스페이스·전역·사용자 지정 경로 옵션이 있습니다.

::: warning TODO(확인 필요)
`kiro-cli agent create`의 저장 위치 옵션 이름(워크스페이스/전역/`--directory`)과 `--from` 옵션의 정확한 사용법은 [Creating custom agents](https://kiro.dev/docs/cli/custom-agents/creating/)에서 확인하세요.
:::

## 설정 예: 리뷰 에이전트

```json
{
  "name": "reviewer",
  "description": "Spring Boot 코드 리뷰 전용. 파일을 수정하지 않는다.",
  "prompt": "너는 Spring Boot 코드 리뷰어다. 버그, 트랜잭션 경계, 예외 처리, 테스트 누락만 지적하고 코드는 수정하지 않는다.",
  "tools": ["@builtin"],
  "resources": ["file://.kiro/steering/**/*.md"],
  "includeMcpJson": false
}
```

| 필드 | 설명 |
|------|------|
| `name`, `description` | 이름과 설명 |
| `prompt` | 에이전트 지시문 |
| `tools` | 쓸 수 있는 도구. `*`, `@builtin`, `@<MCP 서버>` 표기 지원 |
| `allowedTools` | 승인 없이 쓸 수 있는 도구 (클래식 방식) |
| `resources` | 항상 참고할 파일. `file://` 글롭 패턴 사용 가능 |
| `mcpServers`, `includeMcpJson`, `toolAliases` | MCP 관련 → [MCP](./mcp.md) |
| `model` | 사용할 모델 |
| `permissions` | IDE 1.0+ / CLI V3 하네스의 capability 기반 권한 → [Permissions](./permissions.md) |

::: warning TODO(확인 필요)
"수정하지 않는다"를 지시문만으로 보장할 수는 없습니다. 파일 쓰기를 실제로 막으려면 CLI V2 하네스에서는 `allowedTools`/`toolsSettings`, CLI V3 하네스 / IDE 1.0+에서는 `permissions` 규칙을 함께 설정해야 하는데, 각 필드의 정확한 값 표기는 공식 레퍼런스와 대조하지 못해 예시에서 뺐습니다. 최신 [Configuration reference](https://kiro.dev/docs/custom-agents/configuration-reference/)를 확인하세요. 이전 형식 설정은 `/upgrade-agent`로 변환할 수 있습니다.
:::

## 사용하기

```bash
# 시작할 때 지정
kiro-cli chat --agent reviewer

# 대화 중 전환
/agent swap reviewer

# 목록, 기본 에이전트 지정
/agent list
/agent set-default reviewer
```

- IDE에서는 채팅 패널의 **에이전트 선택기**에서 고릅니다 (에이전트가 응답 대기 중일 때만 전환 가능).
- Kiro Web에서는 Custom agent를 기본 세션 에이전트로 선택할 수 없습니다.

## 문제 해결

- `/agent list`에 보이지 않으면 파일 경로와 JSON 문법을 확인하세요.
- 워크스페이스 에이전트가 안 보이면 해당 워크스페이스를 **신뢰**했는지 확인하세요.
