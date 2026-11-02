---
sources:
  - https://kiro.dev/docs/hooks/
  - https://kiro.dev/docs/ide/whats-new-v1/hooks/
  - https://kiro.dev/docs/cli/v3/hooks/
  - https://kiro.dev/docs/cli/v3/hooks-migration/
  - https://kiro.dev/docs/ide/editor/multi-root-workspaces/
  - https://kiro.dev/changelog/cli/2-13/
  - https://kiro.dev/changelog/ide/1-2-56/
---

# Hooks

<span class="level">L3</span> Hook은 **이벤트가 발생했을 때 명령이나 에이전트 지시를 자동으로 실행**하는 기능입니다. 예: Java 파일 저장 시 포매터 실행, 스펙 작업 시작 전 빌드 확인.

## 파일 위치와 형식 (IDE 1.0+ / CLI 3.0)

| 범위 | 경로 |
|------|------|
| 워크스페이스 | `.kiro/hooks/*.json` |
| 전역 (CLI 3.0) | `~/.kiro/hooks/*.json` — 모든 워크스페이스에서 동작 |

- Hook은 **독립된 JSON 파일**로 저장됩니다. 현재 스키마 버전은 **`v1`** 입니다.
- IDE에서는 Kiro 패널의 **Agent Hooks** 영역에서 만들고 관리할 수 있습니다.

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

::: warning TODO(확인 필요)
전체 트리거 목록(파일 생성·삭제, 프롬프트 제출, 에이전트 종료, 도구 실행 전후 등)과 각 이름은 [Hooks 문서](https://kiro.dev/docs/hooks/)에서 확인 후 추가할 예정입니다. IDE 1.2.56 변경 로그에 "유연한 Hook 매칭", CLI 2.28.0에 "카테고리 기반 Hook 매칭"이 추가되었다는 언급이 있습니다.
:::

## 0.x(이전 형식)에서 이름 바꾸기

| 이전 이름 | 새 이름 |
|-----------|---------|
| `fileEdited` | `PostFileSave` |
| `preTaskExecution` | `PreTaskExec` |

CLI에서는 `kiro-cli agent migrate`로 기존 Hook을 자동 변환할 수 있습니다. 인터넷에 있는 `when`/`then` 형식 예제는 **이전 형식**이므로 그대로 쓰지 마세요.

## 2.x와 3.0의 차이

| | CLI 2.x | CLI 3.0 / IDE 1.0+ |
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
