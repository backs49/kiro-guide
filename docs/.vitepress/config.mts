import { defineConfig } from 'vitepress'

// GitHub Pages 프로젝트 페이지는 https://<USER>.github.io/<REPO>/ 경로로 서비스됩니다.
// 저장소 이름이 다르면 VITEPRESS_BASE 환경 변수(예: "/my-repo/")로 바꾸세요.
const base = process.env.VITEPRESS_BASE ?? '/kiro-guide/'

export default defineConfig({
  lang: 'ko-KR',
  title: 'Kiro 가이드',
  description: 'Kiro IDE와 Kiro CLI를 처음 쓰는 개발자를 위한 한국어 비공식 사용자 가이드',
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#b5532f' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }]
  ],

  // 가이드 전체의 기준 버전·확인 날짜 (페이지 하단 표기에 사용)
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'Kiro 가이드',

    nav: [
      { text: '시작하기', link: '/start/install-ide' },
      { text: '핵심 기능', link: '/features/specs' },
      { text: '실무 레시피', link: '/recipes/feature-spec' },
      { text: 'Claude Code 대응표', link: '/reference/claude-code-mapping' },
      { text: '공식 문서', link: 'https://kiro.dev/docs/' }
    ],

    sidebar: [
      {
        text: '1. 소개',
        collapsed: false,
        items: [
          { text: 'Kiro란', link: '/intro/what-is-kiro' },
          { text: 'IDE · CLI · Web 차이', link: '/intro/ide-cli-web' },
          { text: '스펙 주도 개발', link: '/intro/spec-driven' }
        ]
      },
      {
        text: '2. 시작하기',
        collapsed: false,
        items: [
          { text: 'IDE 설치', link: '/start/install-ide' },
          { text: 'CLI 설치', link: '/start/install-cli' },
          { text: '로그인(인증)', link: '/start/auth' },
          { text: '첫 프로젝트 만들기', link: '/start/first-project' }
        ]
      },
      {
        text: '3. 요금과 크레딧',
        collapsed: true,
        items: [{ text: '플랜과 크레딧', link: '/pricing/' }]
      },
      {
        text: '4. IDE 사용법',
        collapsed: true,
        items: [
          { text: '채팅 인터페이스', link: '/ide/chat' },
          { text: '컨텍스트 참조 (#)', link: '/ide/context' },
          { text: '모델 · 에이전트 동작', link: '/ide/models-and-modes' }
        ]
      },
      {
        text: '5. CLI 사용법',
        collapsed: true,
        items: [
          { text: '대화형 TUI와 기본 명령', link: '/cli/interactive' },
          { text: '세션 관리', link: '/cli/sessions' },
          { text: 'Headless 모드 (스크립트·CI)', link: '/cli/headless' },
          { text: 'CLI 2.x와 3.0', link: '/cli/v2-vs-v3' }
        ]
      },
      {
        text: '6. 핵심 기능 심화',
        collapsed: true,
        items: [
          { text: 'Specs', link: '/features/specs' },
          { text: 'Steering', link: '/features/steering' },
          { text: 'Hooks', link: '/features/hooks' },
          { text: 'MCP', link: '/features/mcp' },
          { text: 'Permissions', link: '/features/permissions' },
          { text: 'Custom agents', link: '/features/custom-agents' },
          { text: 'Skills', link: '/features/skills' },
          { text: 'Powers', link: '/features/powers' },
          { text: 'ACP (다른 에디터 연동)', link: '/features/acp' }
        ]
      },
      {
        text: '7. 실무 레시피',
        collapsed: true,
        items: [
          { text: '기능 추가 스펙 작성', link: '/recipes/feature-spec' },
          { text: '버그 수정 스펙 작성', link: '/recipes/bugfix-spec' },
          { text: '코드 리뷰용 Hook', link: '/recipes/review-hook' },
          { text: '팀 컨벤션 Steering', link: '/recipes/team-steering' }
        ]
      },
      {
        text: '8~10. 참고',
        collapsed: true,
        items: [
          { text: 'Claude Code 개념 대응표', link: '/reference/claude-code-mapping' },
          { text: '트러블슈팅 / FAQ', link: '/reference/faq' },
          { text: '참고 링크', link: '/reference/links' }
        ]
      },
      {
        text: '11. 부록',
        collapsed: true,
        items: [
          { text: 'Q Developer에서 이전하기', link: '/appendix/q-developer-migration' },
          { text: '가이드 변경 이력', link: '/appendix/changelog' }
        ]
      }
    ],

    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: { prefix: true, fuzzy: 0.2 }
        },
        translations: {
          button: { buttonText: '검색', buttonAriaLabel: '검색' },
          modal: {
            displayDetails: '상세 목록 표시',
            resetButtonTitle: '검색어 지우기',
            backButtonTitle: '검색 닫기',
            noResultsText: '검색 결과가 없습니다',
            footer: {
              selectText: '선택',
              selectKeyAriaLabel: 'Enter',
              navigateText: '이동',
              navigateUpKeyAriaLabel: '위 화살표',
              navigateDownKeyAriaLabel: '아래 화살표',
              closeText: '닫기',
              closeKeyAriaLabel: 'Esc'
            }
          }
        }
      }
    },

    outline: { level: [2, 3], label: '이 페이지 목차' },
    docFooter: { prev: '이전', next: '다음' },
    lastUpdated: { text: '최종 수정' },
    darkModeSwitchLabel: '테마',
    lightModeSwitchTitle: '라이트 모드로 전환',
    darkModeSwitchTitle: '다크 모드로 전환',
    sidebarMenuLabel: '목차',
    returnToTopLabel: '맨 위로',
    langMenuLabel: '언어',
    notFound: {
      title: '페이지를 찾을 수 없습니다',
      quote: '주소를 확인하거나 사이드바에서 문서를 찾아 주세요.',
      linkText: '홈으로'
    },

    footer: {
      message:
        '비공식 사용자 가이드이며 Amazon Web Services 및 Kiro 팀과 무관합니다. 최신 정보는 <a href="https://kiro.dev/docs/">공식 문서</a>를 확인하세요.',
      copyright: '코드: MIT License (초안)'
    }
  },

  markdown: {
    lineNumbers: false,
    container: {
      tipLabel: '팁',
      warningLabel: '주의',
      dangerLabel: '위험',
      infoLabel: '정보',
      detailsLabel: '자세히'
    }
  }
})
