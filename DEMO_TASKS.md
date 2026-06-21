# デモ用タスク

## タスク A: 質問して説明を得る

Copilot に依頼する:

```text
このワークスペースの予約管理ロジックを説明して。重要なファイルとテストの関係も教えて。
```

## タスク B: 入力検証を追加する

Copilot に依頼する:

```text
src/booking.js の validateBooking に、checkOutDate が checkInDate 以前の場合の入力検証を追加して。公開関数名は変えず、node:test のテストも追加して npm test を実行して。
```

## タスク C: 失敗しているテストを修正する

実行する:

```powershell
npm test
```

その後、Copilot Agent または Copilot CLI に依頼する:

```text
npm test が失敗しています。失敗の原因を調べ、最小限の変更で修正してください。公開 API は変えないでください。
```

## タスク D: レビューする

Copilot がファイルを変更した後に依頼する:

```text
今回の差分をレビューして。入力検証、テスト不足、意図しない公開 API 変更だけ指摘して。
```

## タスク E: Skill を使う

Copilot に依頼する:

```text
workshop-testing Skill を使ってください。npm test が失敗しています。失敗原因を調べ、最小限の変更で修正し、npm test を実行してください。
```

## タスク F: Custom agent を使う

利用できる場合は `security-reviewer` custom agent を選び、その後に依頼する:

```text
直近の変更をレビューして。入力検証の抜け、不安全な入力処理、機密データの意図しない露出だけ指摘して。広いリファクタリングは提案しないで。
```
