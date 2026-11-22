---
sources:
  - https://kiro.dev/docs/hooks/
  - https://kiro.dev/docs/ide/whats-new-v1/hooks/
  - https://kiro.dev/docs/cli/v3/hooks/
  - https://kiro.dev/docs/cli/v3/hooks-migration/
  - https://kiro.dev/docs/ide/editor/multi-root-workspaces/
  - https://kiro.dev/changelog/cli/2-13/
  - https://kiro.dev/changelog/ide/1-2-56/
  - https://kiro.dev/changelog/cli/3-1/
  - https://kiro.dev/changelog/ide/1-4-121/
  - https://kiro.dev/changelog/cli/2-33/
  - https://kiro.dev/docs/hooks/types/
  - https://kiro.dev/changelog/cli/3-4/
  - https://kiro.dev/changelog/ide/1-4-236/
---

# Hooks

<span class="level">L3</span> Hook은 **이벤트가 발생했을 때 명령이나 에이전트 지시를 자동으로 실행**하는 기능입니다. 예: Java 파일 저장 시 포매터 실행, 스펙 작업 시작 전 빌드 확인.

## 파일 위치와 형식 (IDE 1.0+ / CLI V3 하네스)

| 범위 | 경로 |
|------|------|
| 워크스페이스 | `.kiro/hooks/*.json` |
| 전역 | `~/.kiro/hooks/*.json` — 모든 워크스페이스에서 동작 (CLI V3) |

- Hook은 **독립된 JSON 파일**로 저장됩니다. 현재 스키마 버전은 **`v1`** 입니다.
- IDE에서는 Kiro 패널의 **Agent Hooks** 영역에서 만들고 관리할 수 있습니다.
- CLI V3에서는 **워크스페이스를 신뢰하기 전까지** 그 폴더의 Hook을 로드하지 않습니다. → [대화형 TUI](/cli/interactive)

### 필드 구조

| 필드 | 필수 | 설명 |
|------|------|------|
| `hooks[]` | 예 | Hook 목록 |
| `hooks[].name` | 예 | 고유한 이름 |
| `hooks[].trigger` | 예 | 이벤트 이름 (PascalCase, 예: `PostFileSave`) |
| `hooks[].matcher` | 아니오 | 정규식. 파일 이벤트에서는 파일 경로와 비교 |
| `hooks[].action` | 예 | 실행할 동작. `type`이 `command`(셸 명령) 또는 `agent`(에이전트 지시) |
| `timeout` | 아니오 | 초 단위, 기본 60초 |
| `enabled` | 아니오 | CLI 3.0 문서에 있는 선택 필드 |

### 예: Java 파일 저장 시 포매터 실행

```json
{
  "version": "v1",
  "hooks": [
    {
      "name": "format-java-on-save",
      "trigger": "PostFileSave",
      "matcher": "\\.java$",
      "action": {
        "type": "command",
        "command": "./gradlew spotlessApply -q"
      }
    }
  ]
}
```

- `action.type`이 `command`이면 `command`에 셸 명령을, `agent`이면 `prompt`에 에이전트 지시문을 적습니다.
- 파일 관련 트리거의 `command`에서는 `{{filePath}}` 템플릿 변수로 대상 파일 경로를 쓸 수 있습니다.
- `timeout`은 초 단위이며 기본값은 60초입니다.
- 공식 문서 일부 예시는 `name`을 생략하지만, 필드 표에는 필수로 나와 있으므로 **항상 넣는 것을 권장**합니다.
- `spotlessApply`는 프로젝트에 Spotless 플러그인이 설정되어 있다고 가정한 예입니다.

### 예: 에이전트 지시(`agent`) Hook

```json
{
  "version": "v1",
  "hooks": [
    {
      "name": "review-controller-on-save",
      "trigger": "PostFileSave",
      "matcher": "src/main/java/.*Controller\\.java$",
      "action": {
        "type": "agent",
        "prompt": "방금 저장된 컨트롤러에서 입력 검증(@Valid) 누락과 예외 처리 누락만 짧게 지적해 줘. 코드는 수정하지 마."
      }
    }
  ]
}
```

## 트리거

공식 문서에서 확인한 트리거는 다음과 같습니다.

| 트리거 | 시점 | 비고 |
|--------|------|------|
| `PostFileSave` | 파일이 저장된 뒤 (IDE 문서: 에이전트가 파일을 저장·수정했을 때) | `matcher`로 파일 경로 필터 |
| `PreTaskExec` | 스펙 작업이 시작되기 전 | **작업을 막을 수 있음**: `command` 동작이 종료 코드 `2`로 끝나면 차단 |
| `PreCompact` | 대화를 압축(수동 `/compact` 또는 자동)하기 전 | **압축을 거부할 수 있음**. CLI V3 3.1.0+ |
| `PostCompact` | 대화를 압축한 뒤 | 압축 요약을 전달받음. CLI V3 3.1.0+ |
| `PreToolUse` | 도구를 실행하기 전 | 종료 코드 `2`로 차단. 3.4.0+에서는 입력 교체(`updatedInput`)와 허용·확인·거부 결정 가능 → [아래](#tool-hooks) |
| `PermissionRequest` | 도구 호출이 승인을 요청하기 직전 | `allow`/`deny`로 답함. CLI V3 3.4.0+ / IDE 1.4.236+ |
| `SessionStart` / `SessionEnd` | 세션 시작·종료 | CLI V3 (`SessionStart`는 `agentSpawn`도 별칭으로 인식) |

IDE UI에는 이 밖에 Prompt Submit, Agent Stop, Post Tool Use, File Create / File Save / File Delete, Pre / Post Task Execution, Manual 트리거가 있습니다. 파일 트리거는 **에이전트가 바꾼 파일에만** 동작하고 사람이 직접 수정한 경우에는 동작하지 않습니다.

### 압축(Compaction) Hook

대화가 길어져 Kiro가 대화를 요약(압축)하기 전후에 Hook을 실행할 수 있습니다. 압축으로 사라지면 안 되는 정보(예: 진행 중인 작업 메모)를 저장하거나, 중요한 작업 도중 압축을 막을 때 씁니다.

| | CLI | IDE |
|---|-----|-----|
| 지원 버전 | 3.1.0 (2026-11-05) | 1.4.121 (2026-11-05) |
| 이름 | `PreCompact`, `PostCompact` 트리거 | UI의 Pre Compaction / Post Compaction 트리거 |
| 압축 막기 | `PreCompact`에서 거부 가능 | Pre Compaction Hook이 종료 코드 `2`로 끝나면 취소 |

- 오래된 CLI는 모르는 트리거의 Hook을 **조용히 건너뜁니다.** 팀원 모두 3.1.0 이상인지 확인하세요.
- IDE에서 이 트리거를 JSON 파일에 쓸 때의 이름은 공식 문서에서 확인하지 못했습니다. IDE에서는 Agent Hooks 화면에서 만드세요.

### 도구 호출 Hook과 승인 Hook {#tool-hooks}

`PreToolUse`와 `PermissionRequest`는 도구 호출을 대상으로 합니다. `matcher`에는 도구 ID(예: `read_file`, `execute_bash`), 카테고리(`read`, `write`, `shell`, `web`, `spec`), 출처 선택자(`@mcp`, `@builtin`, `@<서버>`, `@<서버>/<도구>`) 또는 정규식을 씁니다. Hook은 STDIN으로 `hook_event_name`, `cwd`, `session_id`, `tool_name`, `tool_input` 등을 담은 JSON을 받습니다.

| | `PreToolUse` | `PermissionRequest` |
|---|---|---|
| 실행 시점 | 모든 도구 호출 전 | 정책이 이미 허용·거부하지 않아 **승인 창이 뜨기 직전**에만 |
| 결정 방법 | 종료 코드 `0` + STDOUT JSON의 `permissionDecision`(`allow`·`ask`·`deny`), `permissionDecisionReason` | 종료 코드 `0` + STDOUT JSON의 `hookSpecificOutput.decision.behavior`(`allow`·`deny`), 거부 시 `message` |
| 입력 바꾸기 | `updatedInput`으로 `tool_input` **전체를 교체** (병합 아님) | 불가 |
| 종료 코드 `2` | 차단, STDERR를 에이전트에 전달 | 거부 |
| 지원 | 결정·입력 교체는 CLI 3.4.0+ / IDE 1.4.236+ | CLI V3 3.4.0+ / IDE 1.4.236+ (Agent Hooks 화면의 Tool Hooks → Permission Request) |

`PermissionRequest` Hook이 STDOUT에 출력하는 형태는 다음과 같습니다.

```json
{"hookSpecificOutput": {"decision": {"behavior": "deny", "message": "운영 DB 접속은 허용하지 않습니다."}}}
```

- 어느 Hook이든 **`deny`(또는 종료 코드 `2`)가 `allow`를 이깁니다.** Hook의 답은 그 호출 한 번에만 적용되고 규칙으로 저장되지 않습니다.
- Hook의 `allow`로 정책의 `deny`, 보호 경로, 조직 정책 확인을 넘을 수는 없습니다. → [Permissions](./permissions.md)
- 승인 창에는 Hook이 바꾼 **최종 인자**가 표시됩니다.

::: warning TODO(확인 필요)
`PreToolUse` 결정 JSON에서 `permissionDecision`·`updatedInput`이 최상위인지 `hookSpecificOutput` 아래인지 공식 문서 예시가 렌더링되지 않아 확인하지 못했습니다(IDE 설명은 `hookSpecificOutput.updatedInput`). Prompt Submit, Agent Stop, Post Tool Use, 파일·작업 트리거의 JSON 식별자도 [Hook types 문서](https://kiro.dev/docs/hooks/types/)에서 확인하세요.
:::

## 0.x(이전 형식)에서 이름 바꾸기

| 이전 이름 | 새 이름 |
|-----------|---------|
| `fileEdited` | `PostFileSave` |
| `preTaskExecution` | `PreTaskExec` |

CLI에서는 `kiro-cli agent migrate`로 기존 Hook을 자동 변환할 수 있습니다. 인터넷에 있는 `when`/`then` 형식 예제는 **이전 형식**이므로 그대로 쓰지 마세요.

## V2와 V3 하네스의 차이

| | CLI V2 하네스 | CLI V3 하네스 (3.0.0+ 기본) / IDE 1.0+ |
|---|---------|--------------------|
| 저장 위치 | 에이전트 설정 안에 포함 | `.kiro/hooks/*.json` 독립 파일 |
| 전역 Hook | — | `~/.kiro/hooks/` |
| 트리거 이름 | 이전 이름 | PascalCase |

## 멀티 루트 워크스페이스 주의

여러 폴더를 한 워크스페이스로 연 경우, 파일 생성·저장·삭제 Hook은 **Hook이 정의된 루트 폴더 안의 파일을 에이전트가 수정할 때만** 동작합니다.

## 안전하게 쓰기

- `command` Hook은 **내 권한으로 셸 명령을 실행**합니다. 다른 사람이 만든 Hook 파일은 내용을 읽고 쓰세요.
- 오래 걸리는 명령(전체 빌드 등)을 `PostFileSave`에 걸면 작업이 느려집니다. 포매터나 단일 파일 린트처럼 빠른 명령을 쓰세요.
- 막는(blocking) Hook은 실패 원인이 화면에 잘 보이도록 메시지를 출력하게 만드세요.

실전 예시는 [레시피: 코드 리뷰용 Hook](/recipes/review-hook)을 보세요.
