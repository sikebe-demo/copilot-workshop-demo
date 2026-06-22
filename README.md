# Copilot ワークショップ デモ用ワークスペース

このフォルダーを VS Code のワークスペースとして開くと、GitHub Copilot ワークショップのライブデモに使えます。

## セットアップ

```powershell
cd copilot-workshop-demo
npm test
```

依存パッケージはありません。Node.js の標準 `node:test` だけを使います。

## C# version

The C# port lives under `csharp/BookingApp` and uses the same JSON files in `data/`.

```powershell
dotnet run --project csharp/BookingApp
dotnet run --project csharp/BookingApp.Tests
```

The C# test runner uses only the .NET standard library, so it does not require NuGet test packages.

## デモ用タスク

- `src/booking.js`: 予約入力の検証を追加・説明する題材。
- `src/discounts.js`: filter の不具合を Agent mode / CLI で修正する題材。
- `.github/copilot-instructions.md`: repository custom instructions の反映確認用。
- `.github/prompts/add-booking-tests.prompt.md`: prompt file の再利用デモ用。
- `.github/skills/workshop-testing/SKILL.md`: Skill の構成例。
- `.github/agents/security-reviewer.agent.md`: Custom agent の構成例。

## 初期状態

`npm test` は最初は `test/discounts.test.js` の一部が失敗します。Agent mode や Copilot CLI に「失敗するテストを直す」作業を任せるための状態です。
