---
sources:
  - https://kiro.dev/docs/powers/
  - https://kiro.dev/docs/powers/installation/
  - https://kiro.dev/docs/powers/create
  - https://kiro.dev/blog/introducing-powers/
  - https://github.com/kirodotdev/powers
---

# Powers

<span class="level">L3</span> Power는 **에이전트 지시문 + (선택) Steering + (선택) MCP 설정**을 하나로 묶어 필요할 때만 활성화되게 만든 확장 패키지입니다. 처음부터 모든 도구를 로드하지 않고, 관련 요청이 왔을 때만 켜지므로 컨텍스트 낭비가 적습니다.

## 설치

| 방법 | 설명 |
|------|------|
| 공식 Powers 목록 | [kiro.dev/powers](https://kiro.dev/powers)에서 **Add to Kiro** 버튼 |
| IDE Powers 패널 | 목록에서 검색·설치 |
| 사용자 지정 Power | Powers 패널의 **Add Custom Power**에서 GitHub 저장소 또는 로컬 폴더 지정 |

::: danger 설치 전에 확인
공식 문서도 Power를 설치하기 전에 **소스와 요청하는 접근 권한을 검토**하라고 권장합니다. 특히 MCP 서버를 포함한 Power는 내 PC에서 프로그램을 실행합니다.
:::

## 제거

- IDE: Powers 패널에서 **Uninstall**
- CLI:

```bash
/powers uninstall <POWER_NAME>
# 또는
kiro-cli powers uninstall <POWER_NAME>
```

## 형식

Power는 두 가지 형식이 있습니다. 설치 경험은 같습니다.

| 형식 | 설명 |
|------|------|
| Agent Plugins 형식 (`plugin.json`) | 새 형식 |
| `POWER.md` 형식 | 이전(legacy) 형식 |

`POWER.md`는 **front matter + 에이전트 지시문**으로 이루어지며, front matter가 언제 Power가 활성화될지 정합니다. Steering 파일과 MCP 설정은 선택 사항이라 단순한 Power는 `POWER.md` 하나로 충분합니다.

::: warning TODO(확인 필요)
- `plugin.json` 형식의 필드 구조와 `POWER.md` front matter의 필수 키.
- GitHub에서 가져올 때 저장소 루트에 필요한 파일(외부 자료는 `POWER.md` 필요라고 설명).
- 메뉴 이름("Import power from GitHub" / "Install from GitHub")은 버전마다 다를 수 있습니다.

[Create powers 문서](https://kiro.dev/docs/powers/create)와 공식 예시 저장소 [kirodotdev/powers](https://github.com/kirodotdev/powers)를 참고하세요.
:::

## 팀에서 활용하는 방법

- 팀에서 자주 쓰는 MCP 서버와 사용 규칙을 Power로 묶어 배포하면, 팀원이 MCP 설정과 Steering을 따로 맞출 필요가 줄어듭니다.
- 사내 Power 저장소는 `<YOUR_ORG>/kiro-powers` 처럼 별도 저장소로 관리하고, 변경은 PR 리뷰를 거치게 합니다.
