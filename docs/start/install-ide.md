---
sources:
  - https://kiro.dev/docs/getting-started/installation/
  - https://kiro.dev/docs/ide/setup/
  - https://kiro.dev/downloads/
  - https://kiro.dev/changelog/ide/
---

# Kiro IDE 설치

<span class="level">L0</span> Kiro IDE를 내려받아 설치하고 첫 실행 설정까지 마칩니다.

## 시스템 요구사항

| OS | 지원 범위 (공식 문서 기준) |
|----|---------------------------|
| macOS | Intel, Apple Silicon |
| Windows | Windows 10/11, x64 또는 ARM64 |
| Linux | Ubuntu 24+, Debian 13+, Fedora 40+, Arch, Mint 22+ / x86_64 또는 ARM64 |

## 1. 설치 파일 내려받기

[kiro.dev](https://kiro.dev/)의 다운로드 페이지에서 OS에 맞는 설치 파일을 받습니다.

::: code-group

```text [macOS]
1. kiro.dev 다운로드 페이지에서 macOS용 설치 파일을 내려받습니다
   (Intel / Apple Silicon 모두 지원).
2. 설치 파일을 실행해 설치한 뒤 Kiro를 실행합니다.
```

```text [Windows]
1. kiro.dev 다운로드 페이지에서 Windows 설치 파일을 내려받아 실행합니다.
2. 설치가 끝나면 시작 메뉴에서 Kiro를 실행합니다.
```

```text [Linux]
1. kiro.dev 다운로드 페이지에서 Debian/Ubuntu용 패키지 또는 범용 Linux 패키지를 내려받습니다.
2. Linux용 IDE는 glibc 2.39 이상이 필요합니다 (예: Ubuntu 24+, Debian 13+).
```

:::

::: warning TODO(확인 필요)
- Windows `winget` 패키지 ID: 검색 결과마다 다르게 나와 확정하지 못했습니다. `winget search kiro`로 직접 확인하세요.
- Linux 배포판별 정확한 패키지 형식(.deb/.rpm 등)과 설치 명령.
:::

이전 버전으로 되돌려야 할 때는 다운로드 페이지의 버전 목록을 이용할 수 있습니다. Linux에서 제거할 때는 패키지 관리자에 맞춰 `sudo apt remove kiro` 또는 `sudo dnf remove kiro`를 씁니다.

::: info 최근 변경
IDE 1.4.62(2026-10-28)에서 **Windows 시스템 전체(system-wide) 설치 프로그램**이 추가되었습니다. 여러 사용자가 쓰는 PC에 설치한다면 [IDE 변경 로그](https://kiro.dev/changelog/ide/)에서 설치 방식 차이를 확인하세요.
:::

::: warning 회사 PC라면
회사 보안 정책상 설치 파일 실행이나 외부 계정 로그인이 막혀 있을 수 있습니다. 개인적으로 우회하지 말고 사내 IT/보안 담당 부서의 승인 절차를 먼저 확인하세요.
:::

## 2. 첫 실행 설정

처음 실행하면 다음 순서로 설정을 진행합니다.

1. **로그인**: GitHub, Google, AWS Builder ID, AWS IAM Identity Center 중 하나로 로그인합니다. → [로그인(인증)](./auth.md)
2. **VS Code 설정 가져오기 (선택)**: VS Code를 쓰고 있었다면 프로필(확장, 설정, 키 바인딩)을 가져오겠냐고 묻습니다. 건너뛰어도 나중에 수동으로 옮길 수 있습니다.
3. **테마 선택** 등 기본 설정을 마칩니다.

::: tip 확장(Extension) 호환성
Kiro는 확장을 **Open VSX 레지스트리**에서 받습니다. VS Code Marketplace에만 있는 일부 확장은 Kiro에서 설치되지 않을 수 있습니다. Java 개발에 필요한 확장(언어 지원, 디버거, Spring Boot 도구 등)이 Open VSX에 있는지 미리 확인하세요.
:::

## 3. 설치 확인

- 왼쪽 액티비티 바에 **Kiro 패널 아이콘**이 보이면 정상입니다. 이 패널에서 Specs, Agent Hooks, Steering, MCP 서버 등을 관리합니다.
- 채팅 패널을 열어 "안녕"이라고 입력해 응답이 오는지 확인합니다.
- 메뉴의 About 화면에서 버전을 확인할 수 있습니다. 이 가이드는 IDE **1.4.121**(2026-11-05) 기준입니다.

## 업데이트

Kiro IDE는 자동 업데이트를 지원합니다. 업데이트 내역은 [IDE 변경 로그](https://kiro.dev/changelog/ide/)에서 확인합니다.

## 다음 단계

- 터미널에서도 쓰려면 → [CLI 설치](./install-cli.md)
- 바로 써 보려면 → [첫 프로젝트 만들기](./first-project.md)
