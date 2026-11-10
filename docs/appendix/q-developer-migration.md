---
sources:
  - https://kiro.dev/docs/upgrade-guides/migrating-from-q-developer/
  - https://kiro.dev/docs/upgrade-guides/migrating-from-q/
  - https://kiro.dev/cli-upgrade
  - https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/upgrade-to-kiro.html
  - https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-developer-ide-end-of-support.html
---

# 부록: Amazon Q Developer에서 이전하기

<span class="level">L1</span> Amazon Q Developer(IDE 플러그인, Q CLI)를 쓰던 개발자를 위한 공식 이전 가이드 요약입니다. 실제 이전 작업 전에는 원문을 꼭 확인하세요.

## 일정

- AWS는 **Amazon Q Developer IDE 플러그인 지원을 2027년 4월 30일에 종료**한다고 공지했습니다.
- Kiro CLI는 Amazon Q Developer CLI의 후속 제품입니다.

## Q Developer CLI → Kiro CLI

### 호환성

- Kiro CLI는 **Q Developer CLI와 하위 호환**됩니다. 기존 Amazon Q 규칙과 설정을 계속 쓸 수 있습니다.
- Kiro CLI는 설정 경로가 다르지만 하위 호환을 유지하며, Q Developer CLI 설정을 바탕으로 `cli.json` 파일이 만들어집니다.
- Kiro CLI 설치 스크립트는 기존 Q CLI 설치를 감지합니다.

### 구독

- Kiro CLI는 **기존 Q Developer Pro 구독으로도 사용할 수 있고**, Kiro 구독도 지원합니다.
- Kiro 대시보드에는 Kiro와 Q Developer 구독이 따로 표시됩니다.

### 되돌리기

```bash
kiro-cli uninstall
# 이후 Amazon Q Developer CLI를 다시 설치
```

Kiro CLI에서 새로 만든 프롬프트, 에이전트, Steering 파일은 Q Developer CLI에서 쓸 수 없습니다.

::: warning TODO(확인 필요)
- `~/.aws/amazonq/` 등 Q CLI 설정 경로가 Kiro의 어느 경로(`~/.kiro/...`)로 대응되는지 정리한 **경로 대응표**는 [Upgrading from Q CLI](https://kiro.dev/docs/upgrade-guides/migrating-from-q/)의 표를 직접 확인한 뒤 추가할 예정입니다.
- 외부 블로그의 "로그인된 Q CLI에서 `q update` 한 번으로 업그레이드" 설명은 공식 문서에서 확인하지 못했습니다.
:::

## Q Developer IDE 플러그인 → Kiro

### VS Code 사용자

1. [Kiro IDE를 설치](/start/install-ide)합니다. Kiro는 VS Code 기반이라 확장·테마·키 바인딩·설정을 그대로 가져올 수 있습니다.
2. 첫 실행 시 **VS Code 프로필 가져오기**를 수락합니다.
3. GitHub, Google, AWS Builder ID, IAM Identity Center 중 하나로 로그인합니다. 회사에서 Q Developer Pro를 Identity Center로 쓰고 있었다면 **IAM Identity Center**를 고릅니다.

### JetBrains 사용자 (IntelliJ IDEA 등)

Kiro는 JetBrains 전용 플러그인 대신 **ACP**로 연동합니다.

1. [Kiro CLI를 설치](/start/install-cli)합니다.
2. CLI 인증 절차로 로그인합니다.
3. JetBrains AI Assistant에 Kiro를 사용자 지정 에이전트로 추가합니다. → [ACP](/features/acp)

### Visual Studio · Eclipse 사용자

공식 문서 기준으로 Kiro에는 Visual Studio와 Eclipse용 네이티브 플러그인이 없습니다. Kiro IDE를 따로 쓰거나 터미널에서 Kiro CLI를 쓰는 방법을 검토하세요.

## 이전 체크리스트

- [ ] 조직 관리자와 구독(Q Developer Pro / Kiro) 정책 확인
- [ ] Kiro IDE 또는 CLI 설치, 같은 인증 방식으로 로그인
- [ ] 기존 Q CLI 규칙·에이전트가 Kiro CLI에서 인식되는지 확인 (`/agent list`, `/context show`)
- [ ] 기존 규칙을 Kiro [Steering](/features/steering)으로 정리할지 결정
- [ ] MCP 서버 설정을 `.kiro/settings/mcp.json`으로 옮기고 `/mcp`로 확인
- [ ] JetBrains 사용자는 ACP 연동 시험
- [ ] 2027-04-30 이전에 IDE 플러그인 사용 중단 계획 수립
