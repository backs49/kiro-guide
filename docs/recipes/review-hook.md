---
sources:
  - https://kiro.dev/docs/hooks/
  - https://kiro.dev/docs/cli/v3/hooks/
  - https://kiro.dev/docs/ide/whats-new-v1/hooks/
---

# 레시피: 코드 리뷰용 Hook

<span class="level">L3</span> 저장할 때마다 가벼운 자동 점검을 하고, 스펙 작업을 시작하기 전에 빌드가 깨져 있지 않은지 확인하는 Hook을 만듭니다. Hook 형식은 [Hooks](/features/hooks) 페이지를 먼저 읽어 보세요.

::: info 대상 버전
아래 형식(`.kiro/hooks/*.json`, `v1` 스키마, PascalCase 트리거)은 **IDE 1.0 이상 / CLI 3.0** 기준입니다. CLI 2.x는 Hook을 에이전트 설정 안에 넣는 이전 형식을 씁니다.
:::

## Hook 1: 컨트롤러 저장 시 리뷰 코멘트 (agent)

`.kiro/hooks/review-controller.json`

```json
{
  "version": "v1",
  "hooks": [
    {
      "name": "review-controller-on-save",
      "trigger": "PostFileSave",
      "matcher": "src/main/java/.*Controller\\.java$",
      "action": {
        "type": "agent",
        "prompt": "방금 저장된 컨트롤러를 다음 기준으로만 점검하고 문제 목록을 짧게 보여 줘. 코드는 수정하지 마.\n1) 요청 DTO에 @Valid 누락\n2) 응답에 엔티티를 직접 반환\n3) 서비스 계층을 거치지 않는 Repository 직접 호출\n4) 로그에 개인정보 출력"
      }
    }
  ]
}
```

- `matcher`로 컨트롤러 파일만 대상으로 좁혀 크레딧 낭비를 줄입니다.
- **"코드는 수정하지 마"** 를 명시해 리뷰와 수정을 분리합니다.

## Hook 2: 테스트 파일 저장 시 해당 테스트만 실행 (command)

`.kiro/hooks/run-test-on-save.json`

```json
{
  "version": "v1",
  "hooks": [
    {
      "name": "run-single-test-on-save",
      "trigger": "PostFileSave",
      "matcher": "src/test/java/.*Test\\.java$",
      "action": {
        "type": "command",
        "command": "./scripts/run-single-test.sh {{filePath}}"
      },
      "timeout": 120
    }
  ]
}
```

`scripts/run-single-test.sh` (파일 경로를 Gradle 테스트 필터로 바꾸는 예시)

```bash
#!/usr/bin/env bash
set -euo pipefail
# src/test/java/com/example/order/OrderServiceTest.java → com.example.order.OrderServiceTest
class_name=$(echo "$1" | sed -E 's#.*src/test/java/##; s#\.java$##; s#/#.#g')
./gradlew test --tests "$class_name" -q
```

## Hook 3: 스펙 작업 전에 컴파일 확인 (차단형)

`.kiro/hooks/pre-task-compile.json`

```json
{
  "version": "v1",
  "hooks": [
    {
      "name": "compile-before-task",
      "trigger": "PreTaskExec",
      "action": {
        "type": "command",
        "command": "./scripts/check-compile.sh"
      },
      "timeout": 300
    }
  ]
}
```

`scripts/check-compile.sh`

```bash
#!/usr/bin/env bash
# 컴파일이 깨져 있으면 종료 코드 2로 끝내 스펙 작업 시작을 막는다.
if ! ./gradlew compileJava compileTestJava -q; then
  echo "컴파일 오류가 있어 작업을 시작하지 않습니다. 먼저 오류를 고치세요." >&2
  exit 2
fi
```

`PreTaskExec` Hook의 `command`가 **종료 코드 2**로 끝나면 작업이 차단됩니다.

## 팀에 배포하기

1. `.kiro/hooks/`와 `scripts/`를 Git에 커밋합니다.
2. 스크립트에 실행 권한을 줍니다: `chmod +x scripts/*.sh`
3. Windows 팀원이 있다면 PowerShell 버전 스크립트를 따로 두거나 Git Bash 사용을 안내합니다.
4. Hook 파일도 PR 리뷰 대상에 포함합니다. Hook은 **팀원 PC에서 셸 명령을 실행**하기 때문입니다.

::: warning TODO(확인 필요)
`timeout`을 Hook 항목 안에 두는지, `action` 안에 두는지 위치를 공식 예시와 대조하지 못했습니다. 동작하지 않으면 [Hooks 문서](https://kiro.dev/docs/hooks/)의 예시를 확인하세요.
:::
