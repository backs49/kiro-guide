---
sources:
  - https://kiro.dev/docs/cli/chat/session-management/
  - https://kiro.dev/docs/reference/cli-commands/
  - https://kiro.dev/docs/cli/v3/new-features/
  - https://kiro.dev/docs/cli/v3/
  - https://kiro.dev/docs/cli/agent-harness/
  - https://kiro.dev/changelog/cli/3-1/
  - https://kiro.dev/changelog/cli/3-3/
  - https://kiro.dev/changelog/cli/3-5/
  - https://kiro.dev/docs/compaction/
---

# 세션 관리

<span class="level">L1</span> Kiro CLI는 대화 턴마다 세션을 **자동 저장**합니다. 이어서 작업하거나, 다른 머신으로 옮기거나, 정리하는 방법을 다룹니다.

## 핵심 개념

- 세션은 **디렉터리 단위**로 저장됩니다. 다른 폴더에서 `--resume`하면 이전 세션이 보이지 않습니다.
- 로컬 세션은 **머신 간에 동기화되지 않습니다.**

## 세션 이어 하기

```bash
# 현재 디렉터리의 가장 최근 세션 이어 하기
kiro-cli chat --resume

# 목록에서 골라 이어 하기
kiro-cli chat --resume-picker

# 세션 ID로 이어 하기
kiro-cli chat --resume-id <SESSION_ID>

# 세션 목록 보기 / 삭제
kiro-cli chat --list-sessions
kiro-cli chat --delete-session <SESSION_ID>
```

::: tip "No saved chat sessions"가 나올 때
대부분 **다른 디렉터리**에서 실행했기 때문입니다. 세션을 만든 프로젝트 폴더로 이동한 뒤 다시 시도하세요.
:::

## 세션 저장·불러오기 (`/chat`)

대화형 모드에서 세션을 파일로 내보내고 불러올 수 있습니다.

### V2 하네스

```text
/chat save <경로>.json
/chat load <경로>.json
```

### V3 하네스 (기본)

```text
/chat save <경로>.zip
/chat load <경로>.zip
```

V3는 세션을 **zip 아카이브**로 저장합니다.

- 직접 만든 스크립트로 저장·불러오려면 `/chat save-via-script`, `/chat load-via-script`를 씁니다.
- 클라우드 세션에서는 `/chat save`, `/chat load`를 쓸 수 없습니다.

## V2 ↔ V3 세션 호환

| 방향 | 가능 여부 |
|------|-----------|
| V2 세션을 V3에서 열기 | 가능 (V3용 복사본으로 가져옴) |
| V3 세션을 V2에서 열기 | **불가** |
| V3 사용 후 V2로 돌아가기 (`--v2`) | V3에서 만든 세션은 V2에서 보이지 않음 |

CLI 3.0.0부터 기본이 V3이므로, V2로 돌아갈 가능성이 있다면 `~/.kiro/sessions/`를 백업해 두세요. → [CLI V3와 V2 하네스](./v2-vs-v3.md)

## 컨텍스트가 길어졌을 때

| 상황 | 방법 |
|------|------|
| 같은 주제를 계속하지만 대화가 길어짐 | `/compact` 로 요약 (압축 전후에 [Hook](/features/hooks) 실행 가능, 3.1.0+) |
| 주제가 완전히 바뀜 | `/clear` 로 초기화하거나 새 세션 시작 |
| 이전 지점부터 다른 방향으로 다시 시도 (V3) | `/rewind` 로 이전 턴에서 분기 |

### 자동 압축 설정 {#compaction}

V3 세션은 컨텍스트 사용량이 기준을 넘으면 자동으로 압축합니다. CLI 3.3.0부터 기준을 바꿀 수 있습니다.

| 키 | 기본값 | 의미 |
|----|--------|------|
| `compaction.autoCompactionThreshold` | `80` | 자동 압축을 시작할 컨텍스트 사용률(%). 0~100 |
| `compaction.excludeMessages` | `2` | 압축하지 않고 그대로 둘 최근 메시지 쌍 수 |
| `compaction.excludeContextWindowPercent` | `2` | 최근 메시지로 남길 컨텍스트 창 최소 비율(%). 위 값과 함께 평가해 더 큰 쪽을 적용 |

```bash
kiro-cli settings compaction.autoCompactionThreshold 70
```

- 대화형 세션에서는 `/settings` → **Compaction**에서 기준값과 자동 압축 켜기·끄기를 바꿉니다.
- 변경은 **다음에 시작하거나 불러오는 세션**부터 적용됩니다.
- 워크스페이스의 `.kiro/settings/cli.json`에 같은 키를 두면 그 워크스페이스에서는 전역 값을 덮어씁니다.
- IDE는 압축이 자동으로만 일어나며, `/compact`는 CLI 전용입니다.

## 클라우드 세션

- CLI 3.4.0부터 클라우드 세션을 이어 하거나 목록으로 보는 위치가 늘었습니다.
- CLI 3.5.0부터 회사 VPC에 연결된 클라우드 세션(Enterprise, Preview)은 입력창 아래 행과 `/session-id`에 연결 이름·VPC ID·리전을 표시합니다. Headless `--cloud` 실행은 stderr에 `[cloud] vpc <name> · <vpc-id> · <region>` 줄을, `--output-format stream-json`은 `vpcConnection`이 담긴 `cloudSession` 레코드를 출력합니다.
