---
sources:
  - https://kiro.dev/docs/cli/installation/
  - https://kiro.dev/docs/cli/setup/
  - https://kiro.dev/docs/getting-started/installation/
  - https://kiro.dev/changelog/cli/
  - https://kiro.dev/docs/cli/v3/
---

# Kiro CLI 설치

<span class="level">L0</span> 터미널에서 `kiro-cli`를 설치하고 버전을 확인합니다.

## 시스템 요구사항

| OS | 요구사항 (공식 문서 기준) |
|----|---------------------------|
| macOS | 지원 |
| Windows | **Windows 11**, Windows Terminal 또는 PowerShell에서 설치 (명령 프롬프트 `cmd` 아님) |
| Linux | glibc 2.34 이상, 또는 musl 빌드 |

Windows 지원은 CLI 2.0부터 추가되었습니다.

## 설치 명령

::: code-group

```bash [macOS / Linux]
curl -fsSL https://cli.kiro.dev/install | bash
```

```powershell [Windows (PowerShell)]
irm 'https://cli.kiro.dev/install.ps1' | iex
```

:::

::: warning 스크립트를 실행하기 전에
`curl ... | bash`, `irm ... | iex`는 내려받은 스크립트를 바로 실행합니다. 회사 정책상 외부 스크립트 실행이 제한되어 있다면 보안 담당 부서와 먼저 상의하세요. 설치 스크립트 내용을 먼저 내려받아 확인한 뒤 실행하는 방법도 있습니다.
:::

::: warning TODO(확인 필요)
macOS Homebrew 설치 경로(포뮬러/캐스크 이름)는 공식 설치 문서에서 확인한 뒤 추가할 예정입니다.
:::

## 설치 확인

```bash
kiro-cli --version
```

이 가이드는 CLI **2.36.0**(2026-10-29) 기준입니다.

## 첫 실행

```bash
kiro-cli
```

로그인하지 않은 상태라면 로그인 절차가 시작됩니다. → [로그인(인증)](./auth.md)

## 업데이트와 제거

- CLI는 백그라운드 자동 업데이트를 지원합니다.
- 제거:

```bash
kiro-cli uninstall
```

Windows에서는 **설정 → 앱**에서 제거할 수도 있습니다.

## CLI 3.0 (early access) 써 보기

CLI 2.x를 설치하면 3.0 엔진을 함께 시험할 수 있습니다. 기존 2.x 설정은 직접 전환하기 전까지 그대로 유지됩니다.

```bash
kiro-cli --v3
```

::: danger 3.0으로 전환하기 전에
- 3.0은 **Amazon Linux 2에서 동작하지 않습니다.** AL2 환경이라면 2.x를 계속 쓰세요.
- 3.0 세션은 2.x에서 이어서 열 수 없습니다. 전환 전에 `~/.kiro/sessions/`를 백업하세요.
- 차이점 전체는 [CLI 2.x와 3.0](/cli/v2-vs-v3)에 정리했습니다.
:::

::: warning TODO(확인 필요)
외부 RFC 문서에는 "2026년 10월 말 CLI 3.0이 기본 경험이 된다"는 언급이 있으나, 공식 문서에서는 확인하지 못했습니다. 2.36.0(2026-10-29) changelog 기준으로는 2.x가 현재 라인입니다.
:::

## Amazon Q Developer CLI가 이미 설치되어 있다면

설치 스크립트가 기존 Amazon Q CLI 설치를 감지합니다. 설정 이전 방법은 [부록: Q Developer에서 이전하기](/appendix/q-developer-migration)를 보세요.
