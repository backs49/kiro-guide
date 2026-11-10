---
sources:
  - https://kiro.dev/changelog/ide/
  - https://kiro.dev/changelog/cli/
---

# 부록: 가이드 변경 이력

이 가이드 자체의 변경 이력과, 작성 시 참고한 Kiro 버전입니다. Kiro 제품 변경 내역은 [공식 변경 로그](https://kiro.dev/changelog/)를 보세요.

## 가이드 변경 이력

| 날짜 | 버전 | 내용 |
|------|------|------|
| 2026-11-10 | 0.2.0 | 2026-11-02 이후 변경 반영: CLI 3.0.0(V3 하네스 기본, Classic·데스크톱 앱·자동완성 은퇴), CLI 3.1.0(압축 Hook, 세션 크레딧 표시), 워크스페이스 신뢰, Approve for me, `permissions.yaml`, IDE 1.4.86·1.4.121, Workflows 페이지 추가, 팀 플랜 정보 |
| 2026-11-02 | 0.1.0 | 초안 작성. 소개, 시작하기, 요금, IDE, CLI, 핵심 기능, 실무 레시피, Claude Code 대응표, FAQ, 참고 링크, Q Developer 이전 부록 |

## 작성 기준 Kiro 버전 (2026-11-10 확인)

::: info 확인 방법
초안 작성 환경에서는 kiro.dev에 직접 접속할 수 없어, **공식 문서·변경 로그 페이지의 내용을 웹 검색 결과로 확인**했습니다. 각 페이지 하단의 "확인 날짜"도 이 방식의 확인을 뜻합니다. `TODO(확인 필요)` 항목과 버전 정보는 실제 공식 문서에서 다시 확인하세요. 2026-11-10 갱신도 같은 방식으로, 2026-11-02 이후 변경 로그를 검색해 가이드에 영향이 있는 부분을 반영했습니다.
:::

| 제품 | 버전 | 릴리스 날짜 | 비고 |
|------|------|-------------|------|
| Kiro IDE | 1.4.121 | 2026-11-05 | 압축 Hook, Workflow 실행 검색, 서브에이전트 메모리 |
| Kiro CLI | 3.1.0 | 2026-11-05 | V3 하네스 기본 (3.0.0부터). V2는 `kiro-cli --v2` |

## 최근 Kiro 주요 변경 (가이드 관련)

| 날짜 | 제품 | 버전 | 내용 |
|------|------|------|------|
| 2026-11-05 | IDE | 1.4.121 | Pre/Post Compaction Hook, Workflow Runs 검색, 서브에이전트 메모리 |
| 2026-11-05 | CLI | 3.1.0 | `PreCompact`/`PostCompact` Hook, `/usage`·상태 표시줄에 세션 크레딧, 세션 요약(opt-in), 서브에이전트가 부모 메모리 읽기 |
| 2026-11-03 | CLI | 3.0.0 | **V3 하네스 기본**, Classic(V1)·데스크톱 앱·인라인 자동완성 은퇴, Approve for me 포함 |
| 2026-11-02 | IDE | 1.4.86 | Workflow 실행 전용 탭, Steering 파일 경고 |
| 2026-10-28 | IDE | 1.4.62 | Windows 시스템 전체 설치, 채팅에 파일 끌어다 놓기 개선 |
| 2026-10-22 | IDE | 1.4.26 | 채팅에서 Workflow 시작 빈도 조절 |
| 2026-10-15 | IDE | 1.3.11 | Markdown 파일 렌더링 리뷰 패널 |
| 2026-10-29 | CLI | 2.36.0 | Approve for me, 하위 명령 승인 규칙, ACP 엔진 설정 |
| 2026-10-05 | CLI | 2.28.0 | 클래식에서 3.0 전환, 카테고리 기반 Hook 매칭 |
| — | CLI | 2.33 | V3 워크스페이스 신뢰 |
| — | CLI | 2.13 | CLI 3.0 전역 Hook(`~/.kiro/hooks/`), Introspect 서브에이전트 |
| — | CLI | 2.8.0 | CLI 3.0 early access |
| 2026-06 | 요금 | — | Pro Max 플랜 추가 |

[Workflows](/features/workflows) 페이지를 0.2.0에서 추가했습니다.

## 갱신 방법 (유지보수자용)

1. [IDE](https://kiro.dev/changelog/ide/)·[CLI](https://kiro.dev/changelog/cli/) 변경 로그에서 새 버전을 확인합니다.
2. `docs/.vitepress/theme/versions.ts`의 기준 버전과 확인 날짜를 고칩니다.
3. 바뀐 기능의 페이지를 고치고, 해당 페이지 front matter의 `sources`를 갱신합니다.
4. 이 페이지의 표에 변경 이력을 추가합니다.
