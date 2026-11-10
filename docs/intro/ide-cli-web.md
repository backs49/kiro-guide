---
sources:
  - https://kiro.dev/ide/
  - https://kiro.dev/cli/
  - https://kiro.dev/docs/web/
  - https://kiro.dev/docs/getting-started/installation/
  - https://kiro.dev/docs/custom-agents/
  - https://kiro.dev/docs/checkpoints/
  - https://kiro.dev/docs/cli/agent-harness/
  - https://kiro.dev/docs/workflows/
---

# IDE · CLI · Web 차이

<span class="level">L0</span> 같은 Kiro 계정으로 IDE, CLI, Web을 모두 쓸 수 있습니다. 셋은 같은 에이전트 개념(스펙, Steering, MCP 등)을 공유하지만 지원 범위와 쓰임새가 다릅니다.

## 한눈에 비교

| 항목 | Kiro IDE | Kiro CLI | Kiro Web |
|------|----------|----------|----------|
| 실행 위치 | 내 PC (데스크톱 앱) | 내 PC·서버의 터미널 | 클라우드 샌드박스 |
| 기반 | VS Code(Code OSS) | 터미널 UI(TUI) | 브라우저 (`app.kiro.dev`) |
| 지원 OS | macOS(Intel/Apple Silicon), Windows 10/11(x64/ARM64), Linux(x86_64/ARM64) | macOS, Windows 11(PowerShell), Linux(glibc 2.34+ 또는 musl 빌드) | 브라우저 |
| Specs | 지원 | V3 하네스(3.0.0부터 기본)에서 지원 | spec 모드 제공 |
| Steering · MCP · Hooks | 지원 | 지원 (V3/V2 하네스 차이 있음, [비교](/cli/v2-vs-v3)) | TODO(확인 필요) |
| Custom agent를 기본 에이전트로 선택 | 가능 | 가능 | 불가 |
| Checkpoints(되돌리기) | 지원 | **V3에서는 미지원** (`/rewind`로 분기 + Git) | TODO(확인 필요) |
| Workflows | 지원 | `/workflow` 명령 | 지원 |
| 자동화·CI | — | Headless 모드 (`--no-interactive`) | 백그라운드 세션 |
| 요금 | 공통 크레딧 | 공통 크레딧 | Pro 이상 유료 플랜 |

::: info 지원 OS 출처
지원 OS는 공식 [설치 문서](https://kiro.dev/docs/getting-started/installation/) 기준입니다. 일부 외부 블로그는 Windows ARM 미지원이라고 적고 있지만, 공식 문서는 ARM64를 지원 목록에 올려 두었습니다.
:::

## 어떤 걸 먼저 쓸까?

- **IntelliJ/Eclipse로 Spring Boot를 개발해 왔다면** → 먼저 **Kiro IDE**로 시작하세요. 스펙 문서와 코드 변경(diff)을 화면에서 같이 보는 편이 익히기 쉽습니다. IntelliJ를 계속 쓰고 싶다면 [ACP 연동](/features/acp)으로 Kiro CLI를 IntelliJ AI Assistant 안에서 쓸 수 있습니다.
- **원격 서버나 컨테이너에서 작업한다면** → **Kiro CLI**가 맞습니다.
- **CI 파이프라인에서 리뷰·문서 생성 등을 자동화하려면** → **Kiro CLI Headless 모드**를 씁니다. → [Headless 모드](/cli/headless)
- **오래 걸리는 작업을 맡겨 두고 다른 일을 하려면** → **Kiro Web**의 클라우드 세션을 고려합니다.

## Kiro Web 메모

Kiro Web은 브라우저에서 대화로 작업을 지시하면, 관리형 클라우드 샌드박스에서 에이전트가 작업하는 형태입니다. 공식 문서 기준 특징은 다음과 같습니다.

- 세션은 노트북을 닫아도 계속 실행되며, Web·IDE·CLI·모바일에서 상태를 확인할 수 있습니다.
- default, spec, autonomous 모드를 제공합니다.
- GitHub와 GitLab 저장소를 대상으로 하며, 한 세션에서 여러 저장소에 걸친 변경을 조정할 수 있습니다.
- Pro, Pro+, Pro Max, Power 플랜에서 사용할 수 있습니다.

::: warning TODO(확인 필요)
Kiro Web의 정식 출시(GA) 여부: 공식 블로그는 Kiro Web과 클라우드 세션이 GA라고 설명하지만, 일부 changelog 항목은 여전히 Preview로 표기합니다. 사내 도입 전에 [Kiro Web 문서](https://kiro.dev/docs/web/)에서 현재 상태를 확인하세요.
:::

이 가이드는 **IDE와 CLI**를 중심으로 다룹니다.
