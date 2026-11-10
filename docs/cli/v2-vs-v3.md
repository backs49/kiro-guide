---
sources:
  - https://kiro.dev/changelog/cli/3-0/
  - https://kiro.dev/blog/cli-3/
  - https://kiro.dev/docs/cli/agent-harness/
  - https://kiro.dev/docs/cli/v3/
  - https://kiro.dev/docs/cli/v3/new-features/
  - https://kiro.dev/docs/cli/v3/migration-guide/
  - https://kiro.dev/docs/cli/v3/hooks-migration/
  - https://kiro.dev/docs/checkpoints/
  - https://kiro.dev/changelog/cli/2-33/
  - https://kiro.dev/changelog/cli/2-36/
  - https://kiro.dev/changelog/cli/3-1/
---

# CLI V3와 V2 하네스

<span class="level">L2</span> **Kiro CLI 3.0.0(2026-11-03)부터 V3 하네스가 기본**입니다. V3는 Kiro IDE·Kiro Web과 같은 통합 에이전트 하네스(agent harness)입니다. 이전 V2 하네스는 플래그나 설정으로 계속 쓸 수 있습니다.

::: info 하네스(harness)란
에이전트가 도구를 호출하고, 권한을 확인하고, Hook·Steering·세션을 처리하는 **실행 엔진**입니다. 같은 `kiro-cli` 바이너리 안에서 V3와 V2 중 하나를 골라 실행합니다.
:::

## 3.0.0에서 바뀐 것

- 이름 없이 대화형으로 실행하면(`kiro-cli`) **V3 하네스**로 시작합니다. V2를 쓰던 사용자에게는 시작할 때 안내가 한 번 나옵니다.
- **Classic(V1) 인터페이스는 더 이상 실행되지 않습니다.** 별칭이나 바로가기에 `--classic`이 있으면 지우세요. 설정이 Classic을 가리키면 대화 시작 시 V3로 계속할지 묻고, 스크립트에서는 그 설정을 무시합니다.
- **CLI 데스크톱 앱과 인라인 셸 자동완성은 은퇴**했습니다. `kiro-cli`는 단일 독립 실행 파일이 됩니다. `autocomplete`, `inline`, `translate`, `theme`, `dashboard` 명령도 쓸 수 없으므로 이 명령을 부르던 스크립트는 고쳐야 합니다.
- 공식 블로그는 대부분의 사용자에게 **설정 변경이 필요 없다**고 설명합니다.

## 하네스 고르기

```bash
kiro-cli                               # V3 (기본)
kiro-cli --v2                          # 이번 실행만 V2
kiro-cli settings chat.agentEngine v2  # 기본값을 V2로 바꾸기 (v3 / v2 / v1)
```

- `chat.agentEngine` 설정은 **전역 설정만** 가능합니다. 워크스페이스의 `.kiro/settings/cli.json`으로는 바꿀 수 없습니다.
- glibc가 V3 요구 버전보다 낮은 Linux에서는 하네스를 지정하지 않으면 **V2로 열리고**, `kiro-cli --v3`는 시작하지 않고 멈춥니다.

### 실행 방식별 기본 하네스

| 실행 방식 | 기본 하네스 |
|-----------|-------------|
| 대화형 (`kiro-cli`) | V3 (실행 가능한 머신에서) |
| Headless + `--trust-all-tools` | V3 |
| 그 밖의 Headless 스크립트 | V2 |
| ACP (`kiro-cli acp`) | V3. 단, V2 전용 플래그가 있거나 V2가 필요한 클라이언트로 인식되면 V2 |

## V3와 V2 차이

| 항목 | V2 하네스 | V3 하네스 (기본) |
|------|-----------|------------------|
| 스펙 주도 개발 | — | 터미널에서 Specs 지원 |
| 권한 모델 | 에이전트 설정의 `toolsSettings`, `allowedTools` | capability 기반 규칙 (`permissions.yaml`, 에이전트 `permissions`) → [Permissions](/features/permissions) |
| Approve for me | — | 일상적인 동작을 대신 승인 (`/permissions` → Policies, 워크스페이스별 저장) |
| 워크스페이스 신뢰 | — | 폴더를 신뢰하기 전에는 그 폴더의 Hook·에이전트·MCP·Steering·Workflow를 로드하지 않음 |
| Hooks | 에이전트 설정에 포함 | **독립 파일** `.kiro/hooks/*.json` (v1 스키마), 전역 `~/.kiro/hooks/`, 압축 Hook(`PreCompact`/`PostCompact`) |
| Steering 포함 모드 | `always`만 자동 로딩 | always, fileMatch, manual, auto 모두 지원 |
| Skills | TODO(확인 필요) | `.kiro/skills/<이름>/SKILL.md` |
| Plan 모드 | TODO(확인 필요) | `Shift+Tab` |
| 되돌리기 | TODO(확인 필요) | `/rewind`로 이전 턴에서 분기, 파일은 Git으로 복원 |
| 세션 저장 형식 | JSON | zip 아카이브 |
| AWS 도구 | 내장 `use_aws` 도구 | **제거** → MCP 서버 또는 셸 도구로 AWS CLI 호출 |
| 에이전트 설정 | JSON | 태그 기반 에이전트 구성 추가 |

::: warning TODO(확인 필요)
- `/checkpoint`(실험 기능, `chat.enableCheckpoint`)는 공식 문서에 "classic 전용"으로 나와 있었습니다. 3.0.0에서 Classic(V1)이 은퇴했으므로 V2 하네스에서 계속 쓸 수 있는지 확인하지 못했습니다.
- Amazon Linux 2에서 3.x의 동작: 이전 문서는 "V3는 AL2에서 동작하지 않는다"고 했습니다. 3.0.0 이후 AL2가 위의 "glibc가 낮은 Linux"처럼 V2로 자동 전환되는지는 확인하지 못했습니다.
- V2 하네스의 Skills·Plan 모드 지원 범위.
:::

## V2에서 V3로 옮길 때 순서

1. **세션 백업**: `~/.kiro/sessions/`를 복사해 둡니다. V2 세션은 V3에서 이어서 열 수 있지만, **V3 세션은 V2에서 열 수 없습니다.**
2. **에이전트·Hook 변환**: 자동 변환 명령을 먼저 실행합니다. 호환되는 규칙은 자동으로 바꾸고, 수동 작업이 필요한 항목을 알려 줍니다.

   ```bash
   kiro-cli agent migrate
   ```

3. **Hook 이름 변경 확인**: 이전 이름이 새 PascalCase 이름으로 바뀝니다 (예: `fileEdited` → `PostFileSave`, `preTaskExecution` → `PreTaskExec`). → [Hooks](/features/hooks)
4. **AWS 도구 대체**: `use_aws`를 쓰던 에이전트는 AWS MCP 서버나 셸 도구 + 권한 규칙으로 바꿉니다.
5. **권한 규칙 재작성**: V3와 IDE 1.0 이상은 `toolsSettings`를 읽지 않습니다. `permissions.yaml`이나 에이전트 `permissions` 필드로 옮기고, 정규식 패턴은 **glob**으로 바꿉니다. → [Permissions](/features/permissions)
6. **스크립트 점검**: `--classic`, `autocomplete`, `inline`, `translate`, `theme`, `dashboard`를 부르는 별칭·스크립트를 고칩니다.
7. **팀 공유**: 변환된 `.kiro/` 파일을 PR로 올려 팀원이 검토하게 합니다.

## 무엇을 써야 하나 (2026-11 기준 권장)

- **새로 시작하는 사용자**: 기본값인 V3를 그대로 씁니다. 이 가이드도 V3 기준으로 설명합니다.
- **V2 전용 에이전트·Hook이 많은 팀**: `kiro-cli --v2`로 당분간 유지하면서 위 순서대로 옮깁니다.
- **CI(Headless)**: `--trust-all-tools`를 쓰면 V3, 그렇지 않으면 V2로 실행된다는 점을 확인하고, 필요하면 하네스를 명시적으로 고정합니다. → [Headless 모드](./headless.md)
