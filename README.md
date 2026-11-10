# kiro-guide

> **비공식 사용자 가이드이며 Amazon Web Services 및 Kiro 팀과 무관합니다. 최신 정보는 [공식 문서](https://kiro.dev/docs/)를 확인하세요.**

Kiro IDE와 Kiro CLI를 처음 사용하는 개발자를 위한 **한국어 사용자 가이드** 정적 사이트입니다. 설치부터 스펙 작성, 팀 규칙(Steering) 적용, Hook 자동화, CI 연동까지 단계별로 따라 할 수 있게 구성했습니다.

- 대상 독자: AI 코딩 도구를 업무에 도입하려는 개발자 (Java/Spring Boot 등 엔터프라이즈 개발 경험자)
- 기준 버전: Kiro IDE **1.4.121** / Kiro CLI **3.1.0** (V3 하네스 기본) — 2026-11-10 확인
- 각 페이지 하단에 출처 URL, 확인 날짜, 기준 버전을 표기합니다.
- 초안은 kiro.dev에 직접 접속할 수 없는 환경에서 작성되어, 공식 문서 내용을 **웹 검색 결과로 확인**했습니다. 공개 전에 `TODO(확인 필요)` 항목과 버전 정보를 실제 공식 문서에서 다시 확인하세요.

## 사용 도구

| 도구 | 버전 |
|------|------|
| [VitePress](https://vitepress.dev/) | 1.6.4 (고정) |
| Node.js | 20 이상 (개발·CI는 22 사용) |
| npm | Node.js 기본 포함 버전 |

VitePress 기본 테마로 다음 기능을 제공합니다: 한국어 UI(`lang: ko-KR`), 좌측 사이드바 목차, 로컬 검색, 다크 모드, 모바일 반응형, 코드 블록 복사 버튼.

## 로컬 실행

```bash
npm install        # 또는 npm ci

npm run dev        # 개발 서버 (http://localhost:5173/kiro-guide/)
npm run build      # 정적 파일 빌드 → docs/.vitepress/dist
npm run preview    # 빌드 결과 미리보기 (http://localhost:4173/kiro-guide/)
```

## 디렉터리 구조

```text
.
├── .github/workflows/deploy.yml   # GitHub Pages 자동 배포
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts             # 사이트 설정 (사이드바, 검색, base 경로)
│   │   └── theme/                 # 기본 테마 확장 (페이지 하단 출처·버전 표기)
│   │       └── versions.ts        # 기준 버전·확인 날짜 (갱신 시 여기만 수정)
│   ├── public/                    # 정적 파일 (favicon)
│   ├── index.md                   # 홈
│   ├── intro/                     # 1. 소개
│   ├── start/                     # 2. 시작하기
│   ├── pricing/                   # 3. 요금과 크레딧
│   ├── ide/                       # 4. IDE 사용법
│   ├── cli/                       # 5. CLI 사용법
│   ├── features/                  # 6. 핵심 기능 심화
│   ├── recipes/                   # 7. 실무 레시피
│   ├── reference/                 # 8~10. Claude Code 대응표, FAQ, 참고 링크
│   └── appendix/                  # 11. 부록 (Q Developer 이전, 변경 이력)
├── package.json
├── LICENSE
└── README.md
```

## GitHub Pages 배포

1. 이 저장소를 GitHub에 올립니다.
2. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 바꿉니다.
3. `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 빌드 후 배포합니다. (Actions 탭에서 수동 실행도 가능)
4. 사이트 주소: `https://<USER>.github.io/<REPO>/`

### base 경로

GitHub Pages 프로젝트 페이지는 `/<저장소 이름>/` 하위 경로로 서비스됩니다.

- 워크플로는 저장소 이름을 자동으로 `VITEPRESS_BASE`에 넣습니다.
- 로컬 기본값은 `/kiro-guide/`입니다 (`docs/.vitepress/config.mts`).
- `<USER>.github.io` 저장소나 커스텀 도메인을 쓰면 `VITEPRESS_BASE=/`로 빌드하세요.

```bash
VITEPRESS_BASE=/ npm run build
```

## 문서 작성 규칙

- 본문은 한국어, 명령어·파일 경로·설정 키는 원문 그대로 씁니다.
- Kiro 기능·명령어·경로·설치 방법·요금은 **공식 문서를 확인한 뒤** 씁니다. 확인하지 못한 내용은 본문에 단정해서 쓰지 않고 `TODO(확인 필요)`로 표시합니다.
- 페이지 front matter의 `sources`에 근거 URL을 적습니다. 하단 표기는 자동으로 렌더링됩니다.
- 회사명, 내부 시스템명, 내부 URL, 계정·토큰·API 키, 개인정보는 넣지 않습니다. 필요한 자리는 `<YOUR_ORG>`, `<API_KEY>` 같은 플레이스홀더를 씁니다.
- 공식 문서의 스크린샷·이미지를 복사하지 않습니다. 필요하면 공식 문서 링크로 대체합니다.

남은 확인 항목은 다음 명령으로 찾을 수 있습니다.

```bash
grep -rn "TODO(확인 필요)" docs --include=*.md
```

## 라이선스

[MIT](./LICENSE) (초안). 문서 본문에 별도 라이선스(예: CC BY 4.0)를 적용할지는 공개 전에 결정합니다.

Kiro는 Amazon Web Services의 제품이며, 이 저장소는 AWS 및 Kiro 팀과 무관한 비공식 자료입니다.
