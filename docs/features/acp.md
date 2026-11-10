---
sources:
  - https://kiro.dev/docs/cli/acp/
  - https://kiro.dev/docs/acp/
  - https://kiro.dev/blog/kiro-adopts-acp/
  - https://kiro.dev/docs/cli/v3/acp-migration/
  - https://kiro.dev/docs/upgrade-guides/migrating-from-q-developer/
  - https://kiro.dev/docs/cli/agent-harness/
  - https://kiro.dev/changelog/cli/2-36/
---

# ACP (다른 에디터에서 Kiro 쓰기)

<span class="level">L3</span> **ACP(Agent Client Protocol)** 를 쓰면 Kiro CLI를 JetBrains IDE(IntelliJ IDEA 등)나 Zed 같은 에디터 안의 에이전트로 쓸 수 있습니다. IntelliJ로 Spring Boot를 개발하는 팀에 특히 유용합니다.

## 동작 방식

```bash
kiro-cli acp                     # ACP 에이전트로 실행 (stdin/stdout, JSON-RPC)
kiro-cli acp --agent <AGENT_NAME> # 특정 Custom agent로 실행
```

에디터가 `kiro-cli acp`를 하위 프로세스로 띄우고 JSON-RPC로 통신합니다. 표준 ACP 메서드에 더해, 슬래시 명령·MCP·세션 관리용 `_kiro.dev/` 접두사의 확장 메서드를 제공합니다.

## JetBrains (IntelliJ IDEA 등)

1. [Kiro CLI를 설치](/start/install-cli)하고 CLI에서 [로그인](/start/auth)합니다.
2. `~/.jetbrains/acp.json`의 `agent_servers`에 Kiro를 등록합니다. `command`에는 `kiro-cli`의 **전체 경로**를, `args`에는 `["acp"]`를 넣습니다.
3. JetBrains AI Assistant에서 Kiro를 사용자 지정 에이전트로 선택합니다.

```json
{
  "agent_servers": {
    "Kiro": {
      "command": "/<KIRO_CLI_PATH>/kiro-cli",
      "args": ["acp"]
    }
  }
}
```

::: warning TODO(확인 필요)
`acp.json`의 전체 스키마(서버 이름 키, `env` 등 추가 필드)는 JetBrains ACP 문서와 [Kiro ACP 문서](https://kiro.dev/docs/cli/acp/)에서 확인하세요. `kiro-cli` 경로는 `which kiro-cli`(macOS/Linux) 또는 `where kiro-cli`(Windows)로 확인합니다.
:::

## Zed

Zed는 ACP를 기본 지원합니다. `~/.config/zed/settings.json`에 사용자 지정 에이전트 항목을 추가한 뒤, AI 패널의 에이전트 선택기에서 Kiro를 고릅니다.

## 어떤 하네스로 실행되나

CLI 3.0.0부터 `kiro-cli acp`는 하네스를 지정하지 않으면 **V3**로 시작합니다. 단, 실행 인자에 V2 전용 플래그가 있거나 Kiro가 V2가 필요한 클라이언트로 인식하면 V2로 시작합니다. CLI 2.36.0에서 ACP 엔진 설정이 추가되었습니다.

::: warning TODO(확인 필요)
CLI 2.36.0에서 추가된 ACP 엔진 설정의 이름과 값.
:::

## ACP 클라이언트 개발자용 (V3)

직접 ACP 클라이언트를 만드는 경우, 3.0 마이그레이션 가이드는 `--agent-engine=v3`, `--auth-method=cli` 옵션으로 서버를 띄우고 인증은 CLI가 담당하는 방식을 권장합니다. 자세한 내용은 [ACP client migration](https://kiro.dev/docs/cli/v3/acp-migration/)을 보세요.

## 문제 해결

- 로그는 Kiro 표준 로그 위치에 남습니다. 자세한 로그가 필요하면 `KIRO_LOG_LEVEL=debug`로 실행합니다.
- 에디터가 `kiro-cli`를 찾지 못하면 `command`를 전체 경로로 지정했는지 확인하세요.
