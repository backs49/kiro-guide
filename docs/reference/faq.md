---
sources:
  - https://kiro.dev/faq/
  - https://kiro.dev/docs/cli/chat/session-management/
  - https://kiro.dev/docs/getting-started/authentication/
  - https://kiro.dev/docs/steering/
  - https://kiro.dev/docs/cli/custom-agents/troubleshooting
  - https://kiro.dev/docs/mcp/security
  - https://kiro.dev/docs/cli/v3/
  - https://kiro.dev/docs/cli/agent-harness/
  - https://kiro.dev/changelog/cli/3-0/
---

# 트러블슈팅 / FAQ

<span class="level">L1</span> 처음 쓸 때 자주 막히는 지점을 모았습니다.

## 설치·로그인

### Windows에서 CLI 설치 명령이 실패해요
- **명령 프롬프트(cmd)가 아니라 PowerShell 또는 Windows Terminal**에서 실행했는지 확인하세요.
- CLI는 **Windows 11**이 필요합니다.
- 회사 PC라면 실행 정책·프록시 때문에 막혔을 수 있습니다. 사내 IT 담당 부서와 상의하세요.

### 원격 서버(SSH)에서 GitHub/Google 로그인이 안 돼요
소셜 로그인은 로컬 콜백 포트가 필요한 PKCE 방식입니다. SSH 포트 포워딩을 설정하거나, 디바이스 코드 방식인 **Builder ID** 또는 **IAM Identity Center**로 로그인하세요. → [로그인](/start/auth)

### CI에서 API 키가 아닌 다른 계정으로 인증돼요
브라우저 로그인 세션이 `KIRO_API_KEY`보다 우선합니다. 러너에 남은 로그인 세션이 없는지 `kiro-cli whoami`로 확인하세요.

### 오래된 Linux(Amazon Linux 2 등)에서 `kiro-cli --v3`가 시작되지 않아요
glibc가 V3 요구 버전보다 낮은 Linux에서는 `kiro-cli --v3`가 시작되지 않고, 하네스를 지정하지 않으면 V2로 열립니다. 그대로 V2를 쓰거나 더 새로운 OS로 옮기세요. (AL2의 3.x 동작은 TODO(확인 필요))

### CLI를 업데이트했더니 자동완성과 데스크톱 앱이 없어졌어요
CLI 3.0.0에서 **인라인 셸 자동완성과 CLI 데스크톱 앱은 은퇴**했습니다. `autocomplete`, `inline`, `translate`, `theme`, `dashboard` 명령도 없어졌으니 이 명령을 쓰던 스크립트를 고치세요.

### `--classic`으로 실행하던 별칭이 이상하게 동작해요
Classic(V1) 인터페이스는 3.0.0부터 실행되지 않습니다. 별칭에서 `--classic`을 지우세요. 이전 동작이 필요하면 `kiro-cli --v2`를 쓰세요.

### CI에서만 Kiro 동작이 달라요
CLI 3.0.0부터 Headless는 `--trust-all-tools`를 쓰면 V3, 아니면 V2로 실행됩니다. 대화형(V3 기본)과 하네스가 다를 수 있습니다. → [Headless 모드](/cli/headless)

## IDE

### VS Code에서 쓰던 확장이 검색되지 않아요
Kiro는 **Open VSX** 레지스트리를 씁니다. VS Code Marketplace 전용 확장은 없을 수 있습니다. 확장 제공처에서 VSIX 배포 여부를 확인하세요.

### 에이전트를 바꾸려는데 선택이 안 돼요
에이전트는 **응답 대기 상태(idle)** 일 때만 바꿀 수 있습니다. 진행 중인 응답이 끝난 뒤 다시 시도하세요.

## Steering · Hook · Agent

### Steering 규칙이 적용되지 않아요
1. front matter가 **파일의 맨 첫 줄**에서 시작하는지 확인하세요 (앞에 빈 줄 금지).
2. `fileMatch`라면 `fileMatchPattern`이 실제 파일 경로와 맞는지 확인하세요.
3. CLI V2 하네스는 `always` 파일만 자동 로딩합니다. `fileMatch`/`manual`을 쓰려면 IDE 또는 CLI V3 하네스(3.0.0부터 기본)를 쓰세요.
4. CLI V3에서는 **워크스페이스를 신뢰했는지** 확인하세요. 신뢰 전에는 Steering을 로드하지 않습니다.
5. IDE 1.4.86 이상은 제대로 쓰지 못한 Steering 파일에 경고를 표시합니다.
6. 전역(`~/.kiro/steering/`) `fileMatch` 파일이 동작하지 않는다는 사용자 보고가 있습니다. 워크스페이스로 옮겨 확인해 보세요.

### 인터넷에서 찾은 Hook 예제가 동작하지 않아요
`when`/`then`, `fileEdited` 같은 표기는 **이전 형식**입니다. 현재 형식은 `.kiro/hooks/*.json`, `v1` 스키마, `PostFileSave` 같은 PascalCase 트리거입니다. → [Hooks](/features/hooks)

### 만든 Custom agent가 `/agent list`에 안 보여요
- 파일 경로(`.kiro/agents/` 또는 `~/.kiro/agents/`)와 JSON 문법을 확인하세요.
- 워크스페이스 에이전트는 **신뢰한 워크스페이스에서만** 로드됩니다.

## 세션·비용

### `--resume` 했는데 "No saved chat sessions"가 나와요
세션은 **디렉터리 단위**로 저장됩니다. 세션을 만든 프로젝트 폴더에서 실행하세요.

### `--v2`로 돌아왔더니 세션이 없어요
V3에서 만든 세션은 V2에서 열 수 없습니다. V2로 돌아갈 가능성이 있다면 `~/.kiro/sessions/`를 백업해 두세요.

### 크레딧이 생각보다 빨리 줄어요
- 컨텍스트를 `#codebase` 대신 `#file`/`#folder`로 좁히세요.
- `always` Steering 파일이 너무 길지 않은지 확인하세요.
- 긴 대화는 `/compact` 또는 `/clear`로 정리하세요.
- `PostFileSave`에 `agent` Hook을 넓은 `matcher`로 걸어 두지 않았는지 확인하세요.
→ [요금과 크레딧](/pricing/)

## 보안

### 회사 코드에 써도 되나요?
회사 정책을 먼저 확인하세요. 조직 도입(IAM Identity Center, Enterprise) 여부, 허용 모델, 데이터 처리 정책은 관리자와 보안 담당 부서가 결정할 일입니다. 데이터 처리에 관한 내용은 공식 [Privacy and Security 문서](https://kiro.dev/docs/privacy-and-security/)를 확인하세요.

### MCP 서버나 Power를 아무거나 설치해도 되나요?
안 됩니다. MCP 서버는 Kiro 샌드박스 밖에서 내 권한으로 실행됩니다. 출처를 확인하고, 토큰은 환경 변수로 넘기고, 쓰기 도구는 `autoApprove`에 넣지 마세요. → [MCP](/features/mcp)
