---
sources:
  - https://kiro.dev/docs/cli/v3/
  - https://kiro.dev/docs/cli/v3/new-features/
  - https://kiro.dev/docs/cli/v3/migration-guide/
  - https://kiro.dev/docs/cli/v3/hooks-migration/
  - https://kiro.dev/docs/checkpoints/
  - https://kiro.dev/changelog/cli/2-8/
  - https://kiro.dev/changelog/cli/2-13/
  - https://kiro.dev/changelog/cli/
---

# CLI 2.x와 3.0

<span class="level">L2</span> 2026-11-02 기준 Kiro CLI의 현재 라인은 **2.x(최신 2.36.0)** 이고, **3.0은 early access**입니다. 3.0은 2.x와 함께 설치되어 있으며 직접 켜기 전까지 기존 설정은 바뀌지 않습니다.

```bash
kiro-cli --v3     # 3.0 엔진으로 실행
```

3.0 early access는 CLI 2.8.0에서 처음 공개되었습니다.

## 주요 차이 요약

| 항목 | CLI 2.x (클래식) | CLI 3.0 |
|------|------------------|---------|
| 스펙 주도 개발 | — | 터미널에서 Specs 지원 |
| 권한 모델 | 에이전트 설정의 `toolsSettings`, `allowedTools` 중심 | **capability 기반** `permissions.rules` (공용 기본값 + 사용자·워크스페이스·에이전트·세션 규칙) |
| Hooks | 에이전트 설정에 포함(embedded) | **독립 파일** `.kiro/hooks/*.json` (v1 스키마). `~/.kiro/hooks/` 전역 Hook 지원 |
| Steering 포함 모드 | 일부만 지원 (always 위주) | always, fileMatch, manual, auto 모두 지원 |
| Skills | TODO(확인 필요) | `.kiro/skills/<이름>/SKILL.md` |
| Plan 모드 | TODO(확인 필요) | `Shift+Tab` |
| Checkpoints | `/checkpoint` (실험 기능, `chat.enableCheckpoint`) | **미지원** → `/rewind` + Git 사용 |
| 세션 저장 형식 | JSON | zip 아카이브 |
| AWS 도구 | 내장 `use_aws` 도구 | **제거** → MCP 서버 또는 셸 도구로 AWS CLI 호출 |
| 비 TUI(레거시) 채팅 모드 | 지원 | 미지원 |
| Amazon Linux 2 | 지원 | **미지원** |
| 에이전트 설정 | JSON | 태그 기반 에이전트 구성 추가 |

## 3.0으로 옮길 때 순서

1. **세션 백업**: `~/.kiro/sessions/`를 복사해 둡니다. 3.0 세션은 2.x에서 열 수 없습니다.
2. **에이전트·Hook 변환**: 자동 변환 명령을 먼저 실행합니다. 호환되는 규칙은 자동으로 바꾸고, 수동 작업이 필요한 항목을 알려 줍니다.

   ```bash
   kiro-cli agent migrate
   ```

3. **Hook 이름 변경 확인**: 이전 이름이 새 PascalCase 이름으로 바뀝니다 (예: `fileEdited` → `PostFileSave`, `preTaskExecution` → `PreTaskExec`). → [Hooks](/features/hooks)
4. **AWS 도구 대체**: `use_aws`를 쓰던 에이전트는 AWS MCP 서버나 셸 도구 + 권한 규칙으로 바꿉니다.
5. **권한 규칙 재작성**: 3.0과 IDE 1.0 이상은 `toolsSettings`를 읽지 않으므로 `permissions` 필드로 옮깁니다. → [Permissions](/features/permissions)
6. **팀 공유**: 변환된 `.kiro/` 파일을 PR로 올려 팀원이 검토하게 합니다.

::: warning TODO(확인 필요)
- 공식 문서에 "v2 설정용 마이그레이션 가이드는 추가 예정"이라는 문구가 있었습니다. 최신 [Migration guide](https://kiro.dev/docs/cli/v3/migration-guide/)를 확인하세요.
- 2.28.0 changelog에 "클래식에서 3.0으로 전환(Switch to 3.0 from Classic)" 기능이 언급됩니다. 정확한 전환 명령과 기본 엔진 변경 일정은 공식 문서에서 확인하지 못했습니다.
- CLI 2.x에서 Skills 지원 범위와 경로.
:::

## 무엇을 써야 하나 (2026-11 기준 권장)

- **팀 표준·CI**: 2.x 안정 라인을 기준으로 맞춥니다.
- **개인 실험**: `kiro-cli --v3`로 3.0을 써 보고, Specs·Plan 모드·새 Hook 형식을 미리 익혀 둡니다.
- **Amazon Linux 2 서버**: 2.x를 유지합니다.
