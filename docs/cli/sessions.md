---
sources:
  - https://kiro.dev/docs/cli/chat/session-management/
  - https://kiro.dev/docs/reference/cli-commands/
  - https://kiro.dev/docs/cli/v3/new-features/
  - https://kiro.dev/docs/cli/v3/
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

### CLI 2.x

```text
/chat save <경로>.json
/chat load <경로>.json
```

### CLI 3.0

```text
/chat save <경로>.zip
/chat load <경로>.zip
```

3.0은 세션을 **zip 아카이브**로 저장합니다.

- 직접 만든 스크립트로 저장·불러오려면 `/chat save-via-script`, `/chat load-via-script`를 씁니다.
- 클라우드 세션에서는 `/chat save`, `/chat load`를 쓸 수 없습니다.

## 2.x ↔ 3.0 세션 호환

| 방향 | 가능 여부 |
|------|-----------|
| 2.x 세션을 3.0에서 열기 | 가능 (3.0용 복사본으로 가져옴) |
| 3.0 세션을 2.x에서 열기 | **불가** |
| 3.0 사용 후 2.x로 돌아가기 | 3.0에서 만든 세션은 2.x에서 보이지 않음 |

3.0을 시험하기 전에 `~/.kiro/sessions/`를 백업하세요. → [CLI 2.x와 3.0](./v2-vs-v3.md)

## 컨텍스트가 길어졌을 때

| 상황 | 방법 |
|------|------|
| 같은 주제를 계속하지만 대화가 길어짐 | `/compact` 로 요약 |
| 주제가 완전히 바뀜 | `/clear` 로 초기화하거나 새 세션 시작 |
| 이전 지점부터 다른 방향으로 다시 시도 (3.0) | `/rewind` 로 이전 턴에서 분기 |
