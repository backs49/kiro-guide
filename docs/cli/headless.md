---
sources:
  - https://kiro.dev/docs/cli/headless/
  - https://kiro.dev/docs/getting-started/authentication/
  - https://kiro.dev/blog/introducing-headless-mode/
  - https://kiro.dev/changelog/cli/2-0/
---

# Headless 모드 (스크립트·CI 연동)

<span class="level">L3</span> Headless 모드는 대화형 화면 없이 프롬프트를 실행하고 결과를 표준 출력으로 내보낸 뒤 종료합니다. 셸 스크립트나 CI 파이프라인에서 Kiro를 호출할 때 씁니다. CLI 2.0부터 지원합니다.

## 기본 사용법

```bash
# 프롬프트를 인자로 전달
kiro-cli chat --no-interactive "build.gradle 의 의존성 목록을 마크다운 표로 출력해 줘"

# 파이프로 전달
printf '%s\n' "src/main/java 의 TODO 주석을 파일별로 정리해 줘" | kiro-cli chat --no-interactive
```

- Headless 모드에서는 TUI를 쓸 수 없습니다.
- 도구 승인을 사람이 할 수 없으므로 필요한 도구를 미리 신뢰해야 합니다.

```bash
# 필요한 도구만 신뢰 (권장)
kiro-cli chat --no-interactive --trust-tools=read,grep "..."

# 모든 도구 신뢰 (격리된 CI 러너에서만)
kiro-cli chat --no-interactive --trust-all-tools "..."
```

## 인증: API 키

Headless 모드에서는 브라우저 로그인 대신 **API 키**를 씁니다.

1. [app.kiro.dev](https://app.kiro.dev/)의 **API Keys** 메뉴에서 키를 만듭니다.
2. 키를 `KIRO_API_KEY` 환경 변수로 전달합니다. 이 변수가 있으면 CLI는 브라우저 로그인 절차를 건너뜁니다.

```bash
export KIRO_API_KEY=<API_KEY>   # 로컬 테스트용. 셸 기록에 남지 않도록 주의
kiro-cli whoami                 # 어떤 인증 방식이 쓰이는지 확인
```

::: danger API 키 관리
- API 키를 코드, 설정 파일, 스크립트에 **절대 하드코딩하지 마세요.** CI의 시크릿 저장소를 쓰세요.
- 같은 머신에 브라우저 로그인 세션이 있으면 그쪽이 우선합니다. CI 러너에서는 `kiro-cli whoami`로 확인하세요.
:::

## GitHub Actions 예시: PR 변경분 요약

PR이 열리면 변경 내용을 요약해 작업 로그에 남기는 예시입니다. 저장소 **Settings → Secrets and variables → Actions**에 `KIRO_API_KEY`를 등록해 두었다고 가정합니다.

```yaml
name: kiro-pr-summary
on:
  pull_request:

permissions:
  contents: read

jobs:
  summary:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Install Kiro CLI
        run: curl -fsSL https://cli.kiro.dev/install | bash
      - name: Summarize changes
        env:
          KIRO_API_KEY: ${{ secrets.KIRO_API_KEY }}
        run: |
          git diff origin/${{ github.base_ref }}...HEAD > /tmp/pr.diff
          kiro-cli chat --no-interactive --trust-tools=read \
            "/tmp/pr.diff 파일을 읽고 변경 요약과 리뷰 시 주의할 점을 한국어로 정리해 줘"
```

::: warning TODO(확인 필요)
- 설치 스크립트가 `kiro-cli`를 설치하는 경로와, CI 러너에서 `PATH`에 추가가 필요한지 여부.
- `--trust-tools`에 쓰는 도구 이름 목록(`read`, `grep` 외)과 CLI 3.0에서의 동작 차이.
- Headless 예시에 등장하는 `--sandbox`, `--cloud` 플래그의 정확한 의미.
:::

## 활용 아이디어

| 용도 | 프롬프트 예 |
|------|-------------|
| PR 요약 | 변경 요약, 리스크, 테스트 포인트 정리 |
| 릴리스 노트 초안 | 태그 사이 커밋 로그를 사용자용 문장으로 정리 |
| 문서 점검 | README의 실행 방법이 실제 `build.gradle`과 맞는지 확인 |
| 정적 분석 결과 해설 | 정적 분석 리포트 파일을 읽고 우선순위 정리 |

자동으로 코드를 **수정해 커밋까지** 하게 하는 구성은 권한 범위가 커지므로, 처음에는 읽기 전용 작업부터 시작하세요.
