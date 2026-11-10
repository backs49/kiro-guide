---
sources:
  - https://kiro.dev/docs/cli/installation/
  - https://kiro.dev/docs/cli/setup/
  - https://kiro.dev/docs/getting-started/installation/
  - https://kiro.dev/changelog/cli/
  - https://kiro.dev/docs/cli/v3/
  - https://kiro.dev/docs/cli/agent-harness/
  - https://kiro.dev/changelog/cli/3-0/
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

이 가이드는 CLI **3.1.0**(2026-11-05) 기준입니다.

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

## V3 하네스가 기본입니다 (3.0.0 이상)

CLI **3.0.0(2026-11-03)부터** `kiro-cli`를 실행하면 Kiro IDE·Web과 같은 **V3 하네스**로 시작합니다. 이전 V2 하네스가 필요하면 다음처럼 실행합니다.

```bash
kiro-cli --v2                          # 이번 실행만 V2
kiro-cli settings chat.agentEngine v2  # 기본값을 V2로 (전역 설정)
```

::: warning 2.x에서 업데이트한 경우
- **CLI 데스크톱 앱과 인라인 셸 자동완성은 은퇴**했습니다. `autocomplete`, `inline`, `translate`, `theme`, `dashboard` 명령도 없어졌습니다.
- **Classic(V1) 인터페이스는 실행되지 않습니다.** 별칭이나 바로가기에 `--classic`이 있다면 지우세요.
- V3에서 만든 세션은 V2에서 열 수 없습니다. V2로 돌아갈 가능성이 있다면 `~/.kiro/sessions/`를 백업해 두세요.
- glibc가 V3 요구 버전보다 낮은 Linux에서는 자동으로 V2로 열립니다.
- 차이점 전체는 [CLI V3와 V2 하네스](/cli/v2-vs-v3)에 정리했습니다.
:::

## Amazon Q Developer CLI가 이미 설치되어 있다면

설치 스크립트가 기존 Amazon Q CLI 설치를 감지합니다. 설정 이전 방법은 [부록: Q Developer에서 이전하기](/appendix/q-developer-migration)를 보세요.
