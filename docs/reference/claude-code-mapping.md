---
sources:
  - https://kiro.dev/docs/steering/
  - https://kiro.dev/docs/hooks/
  - https://kiro.dev/docs/mcp/configuration/
  - https://kiro.dev/docs/skills/
  - https://kiro.dev/docs/custom-agents/
  - https://kiro.dev/docs/checkpoints/
  - https://code.claude.com/docs/en/features-overview
  - https://code.claude.com/docs/en/glossary
---

# Claude Code 사용자를 위한 개념 대응표

<span class="level">L1</span> Claude Code를 써 본 개발자가 Kiro로 넘어올 때 "그건 Kiro에서 뭐지?"를 빠르게 찾기 위한 표입니다.

::: warning 읽기 전에
- 두 도구는 비슷해 보여도 **동작 방식이 다른 부분**이 있습니다. "대응"은 역할이 비슷하다는 뜻이지 같은 기능이라는 뜻이 아닙니다.
- Kiro 쪽은 이 가이드의 기준 버전(IDE 1.4.121 / CLI 3.1.0, V3 하네스)을 따릅니다.
- Claude Code 쪽은 [Claude Code 공식 문서](https://code.claude.com/docs/)의 개념 수준으로만 적었습니다. Claude Code도 업데이트가 잦으므로 세부 동작은 해당 문서를 확인하세요.
:::

## 한눈에 보기

| 역할 | Claude Code | Kiro |
|------|-------------|------|
| 프로젝트 규칙·메모리 | `CLAUDE.md` (+ `.claude/rules/`) | **Steering** `.kiro/steering/*.md` (+ `AGENTS.md`) |
| 사용자 전역 규칙 | `~/.claude/CLAUDE.md` | `~/.kiro/steering/*.md` |
| 이벤트 자동화 | Hooks (`settings.json`) | **Hooks** `.kiro/hooks/*.json` |
| 외부 도구 연결 | MCP (`.mcp.json` 등) | **MCP** `.kiro/settings/mcp.json` |
| 재사용 절차 | Skills `.claude/skills/<이름>/SKILL.md` | **Skills** `.kiro/skills/<이름>/SKILL.md` (CLI V3) |
| 역할별 에이전트 | Subagents `.claude/agents/*.md` | **Custom agents** `.kiro/agents/` (JSON) |
| 확장 묶음 배포 | Plugins | **Powers** |
| 계획만 세우기 | Plan mode | **Plan 모드** (CLI V3 `Shift+Tab`) |
| 구조화된 기능 개발 | (별도 기능 없음, 프롬프트·스킬로 구성) | **Specs** (requirements → design → tasks) |
| 되돌리기 | Checkpoints / rewind | IDE **Checkpoints**, CLI V3 `/rewind` |
| 비대화형 실행 | 비대화형(print) 모드 | **Headless** `kiro-cli chat --no-interactive` |
| 대화 요약 | `/compact` | `/compact` |
| 권한 | permissions (allow/ask/deny 규칙) | **Permissions** (`permissions.yaml`, capability 기반 deny/ask/allow/evaluate 규칙) |
| 다단계 백그라운드 실행 | — | **Workflows** (`.kiro/workflows/`, `/workflow`) |
| 다른 에디터 연동 | IDE 확장 등 | **ACP** (`kiro-cli acp`) |

## 자세한 차이

### CLAUDE.md ↔ Steering

| | CLAUDE.md | Steering |
|---|-----------|----------|
| 파일 수 | 보통 하나(+ 하위 폴더·rules) | 주제별 여러 파일 |
| 언제 로드 | 세션에 자동 로드 | **포함 모드로 제어**: `always`, `fileMatch`, `manual`, `auto` |
| 특정 파일에만 적용 | 폴더별 파일·rules로 구성 | `fileMatch` + `fileMatchPattern` |
| 필요할 때만 호출 | — | `manual` → `#이름` 또는 `/` 메뉴 |

**옮기는 방법**: CLAUDE.md를 주제별로 나눈 뒤, 항상 필요한 내용만 `always`로 두고 나머지는 `fileMatch`/`manual`로 분리하세요. 여러 도구를 같이 쓰는 팀이라면 공통 규칙은 `AGENTS.md`에 두는 것도 방법입니다(Kiro는 `AGENTS.md`를 항상 포함).

### Hooks

| | Claude Code | Kiro |
|---|-------------|------|
| 정의 위치 | `settings.json`의 hooks 항목 | `.kiro/hooks/*.json` 독립 파일 (v1 스키마) |
| 이벤트 | 도구 사용 전후, 프롬프트 제출, 세션 시작·종료 등 | `PostFileSave`, `PreTaskExec`(스펙 작업 전), `PreCompact`/`PostCompact`(대화 압축 전후) 등. 전체 목록 TODO(확인 필요) |
| 동작 | 셸 명령 | `command`(셸) 또는 **`agent`(에이전트에 지시문 전달)** |
| 차단 | 종료 코드로 차단 | `PreTaskExec`에서 종료 코드 `2`로 차단 |

Kiro Hook은 **에이전트 지시(`agent`) 타입**이 있어 "저장하면 리뷰해 줘" 같은 자연어 자동화를 바로 만들 수 있다는 점이 다릅니다.

### MCP

두 도구 모두 `mcpServers` 형식의 JSON을 씁니다. 다른 점은 **위치와 Kiro 전용 키**입니다.

- 위치: Kiro는 `.kiro/settings/mcp.json`(워크스페이스), `~/.kiro/settings/mcp.json`(사용자)
- Kiro 전용 키: `autoApprove`, `disabledTools`, `disabled`
- 서버 정의(`command`, `args`, `env`)는 대부분 그대로 옮길 수 있지만, 옮긴 뒤 `/mcp`로 연결 상태를 꼭 확인하세요.

### Skills

폴더 + `SKILL.md` + `description`으로 활성화를 판단하는 구조가 비슷합니다. Kiro에서는 CLI V3 기준 `.kiro/skills/`에 둡니다. front matter 필수 필드는 Kiro 문서로 다시 확인하세요(TODO(확인 필요)).

### Subagents ↔ Custom agents

| | Claude Code Subagents | Kiro Custom agents |
|---|----------------------|--------------------|
| 형식 | Markdown + front matter | JSON (Markdown 형식도 지원한다고 문서에 기재) |
| 주 용도 | 메인 에이전트가 **위임**하는 하위 작업자 | 세션의 **주 에이전트를 교체**하거나 지정 (`--agent`, `/agent swap`) |
| 도구 지정 | tools 목록 | `tools` (`*`, `@builtin`, `@서버`), `permissions` |

Kiro에도 서브에이전트 개념(`subagent` capability, CLI 서브에이전트 문서)이 있지만, Custom agent는 "역할을 바꿔 끼우는 프로필"에 더 가깝습니다.

### Specs — Kiro에만 있는 것

Claude Code에는 Kiro Specs와 같은 내장 문서 흐름이 없습니다. Claude Code에서 "계획 문서를 먼저 쓰게 하는" 프롬프트·스킬을 쓰고 있었다면, Kiro에서는 [Specs](/features/specs)로 대체할 수 있습니다.

## 옮길 때 체크리스트

- [ ] `CLAUDE.md` → `.kiro/steering/` 여러 파일로 분리, 포함 모드 지정
- [ ] MCP 서버 정의를 `.kiro/settings/mcp.json`으로 옮기고 `/mcp`로 확인
- [ ] Hook을 `.kiro/hooks/*.json`으로 다시 작성 (이벤트 이름이 다름)
- [ ] Skills 폴더를 `.kiro/skills/`로 복사하고 front matter 확인
- [ ] Subagent는 Custom agent JSON으로 다시 작성
- [ ] 비밀 값이 설정 파일에 하드코딩되어 있지 않은지 확인
