---
sources:
  - https://kiro.dev/faq/
  - https://kiro.dev/docs/cli/chat/session-management/
  - https://kiro.dev/docs/getting-started/authentication/
  - https://kiro.dev/docs/steering/
  - https://kiro.dev/docs/cli/custom-agents/troubleshooting
  - https://kiro.dev/docs/mcp/security
  - https://kiro.dev/docs/cli/v3/
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

### Amazon Linux 2에서 `kiro-cli --v3`가 동작하지 않아요
CLI 3.0은 Amazon Linux 2를 지원하지 않습니다. 2.x를 계속 쓰세요.

## IDE

### VS Code에서 쓰던 확장이 검색되지 않아요
Kiro는 **Open VSX** 레지스트리를 씁니다. VS Code Marketplace 전용 확장은 없을 수 있습니다. 확장 제공처에서 VSIX 배포 여부를 확인하세요.

### 에이전트를 바꾸려는데 선택이 안 돼요
에이전트는 **응답 대기 상태(idle)** 일 때만 바꿀 수 있습니다. 진행 중인 응답이 끝난 뒤 다시 시도하세요.

## Steering · Hook · Agent

### Steering 규칙이 적용되지 않아요
1. front matter가 **파일의 맨 첫 줄**에서 시작하는지 확인하세요 (앞에 빈 줄 금지).
2. `fileMatch`라면 `fileMatchPattern`이 실제 파일 경로와 맞는지 확인하세요.
3. CLI 2.x는 `always` 파일만 자동 로딩합니다. `fileMatch`/`manual`을 쓰려면 IDE 또는 CLI 3.0을 쓰세요.
4. 전역(`~/.kiro/steering/`) `fileMatch` 파일이 동작하지 않는다는 사용자 보고가 있습니다. 워크스페이스로 옮겨 확인해 보세요.

### 인터넷에서 찾은 Hook 예제가 동작하지 않아요
`when`/`then`, `fileEdited` 같은 표기는 **이전 형식**입니다. 현재 형식은 `.kiro/hooks/*.json`, `v1` 스키마, `PostFileSave` 같은 PascalCase 트리거입니다. → [Hooks](/features/hooks)

### 만든 Custom agent가 `/agent list`에 안 보여요
- 파일 경로(`.kiro/agents/` 또는 `~/.kiro/agents/`)와 JSON 문법을 확인하세요.
- 워크스페이스 에이전트는 **신뢰한 워크스페이스에서만** 로드됩니다.

## 세션·비용

### `--resume` 했는데 "No saved chat sessions"가 나와요
세션은 **디렉터리 단위**로 저장됩니다. 세션을 만든 프로젝트 폴더에서 실행하세요.

### 3.0을 써 보고 2.x로 돌아왔더니 세션이 없어요
3.0에서 만든 세션은 2.x에서 열 수 없습니다. 전환 전에 `~/.kiro/sessions/`를 백업해야 합니다.

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
