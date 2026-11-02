---
sources:
  - https://kiro.dev/docs/getting-started/authentication/
  - https://kiro.dev/docs/reference/cli-commands/
  - https://kiro.dev/docs/cli/authentication
  - https://kiro.dev/docs/cli/headless/
---

# 로그인(인증)

<span class="level">L0</span> Kiro IDE와 CLI는 같은 Kiro 계정을 씁니다. 개인 사용자와 조직 사용자의 로그인 방법이 다르므로 먼저 어느 쪽인지 확인하세요.

## 로그인 방법 고르기

| 방법 | 대상 | 비고 |
|------|------|------|
| **GitHub / Google (소셜 로그인)** | 개인 | 가장 간단. CLI에서는 PKCE 방식이라 원격 머신에서는 포트 포워딩이 필요 |
| **AWS Builder ID** | 개인 | AWS 개인 계정. 디바이스 코드 방식이라 원격 머신에서도 편리 |
| **AWS IAM Identity Center** | 조직(회사) | 회사가 Kiro를 조직 단위로 도입한 경우. 디바이스 코드 방식 |
| **API 키 (`KIRO_API_KEY`)** | CI·스크립트 | Headless 모드 전용. → [Headless 모드](/cli/headless) |

::: tip 회사에서 쓴다면
회사가 IAM Identity Center로 Kiro를 도입했다면 개인 계정이 아니라 **조직이 안내한 시작 URL과 리전**으로 로그인해야 회사 플랜과 정책(허용 모델, MCP 제한 등)이 적용됩니다. 시작 URL은 관리자에게 받으세요. 이 가이드에서는 `<YOUR_ORG_START_URL>`, `<REGION>`으로 표기합니다.
:::

## IDE에서 로그인

첫 실행 화면에서 로그인 방법을 고르고 브라우저 안내에 따라 승인합니다. 로그인 후 IDE로 자동으로 돌아옵니다.

## CLI에서 로그인

```bash
# 대화형으로 로그인 방법 선택
kiro-cli login

# 소셜 로그인 예: Google
kiro-cli login --social google
```

IAM Identity Center 로그인은 조직의 시작 URL(Identity Provider URL)과 리전을 함께 지정합니다.

::: warning TODO(확인 필요)
IAM Identity Center 로그인 시 시작 URL·리전을 넘기는 정확한 플래그 이름은 [CLI 명령 레퍼런스](https://kiro.dev/docs/reference/cli-commands/)에서 확인하세요.
:::

### 원격 서버(SSH)에서 로그인할 때

- **Builder ID / IAM Identity Center**는 디바이스 코드 방식입니다. 터미널에 표시된 URL과 코드를 내 PC 브라우저에서 입력하면 됩니다.
- **소셜 로그인(GitHub/Google)** 은 PKCE 방식이라 로컬 콜백 포트가 필요합니다. SSH 포트 포워딩을 설정하거나, 디바이스 코드 방식 로그인을 고르세요.

## 로그인 상태 확인과 로그아웃

```bash
# 현재 어떤 방식으로 인증되어 있는지 확인
kiro-cli whoami

# 로그아웃
kiro-cli logout
```

::: info 인증 우선순위
브라우저 로그인 세션(`kiro-cli login`)과 `KIRO_API_KEY` 환경 변수가 둘 다 있으면 **브라우저 로그인 세션이 우선**합니다. CI에서 의도한 키가 쓰이는지 `kiro-cli whoami`로 확인하세요.
:::
