# テスト失敗の分析と修正計画

## エラーの意味

### 1. **requires guest name and dates** (booking.test.js:19)
- **問題**: `errors.includes('guestName is required')` が false
- **原因**: ゲスト名の必須チェックが入力検証ロジックで実装されていない
- **期待値**: `guestName` が undefined または空の場合、エラーメッセージ 'guestName is required' が返される

### 2. **filters member-only offers for non-members** (discounts.test.js:14)
- **問題**: 非メンバーに対して `['SPRING25', 'WEEKEND5']` を返しているが、`['WEEKEND5']` のみ返すべき
- **原因**: `SPRING25` がメンバー限定なのに、フィルタリングロジックが機能していない
- **期待値**: メンバーシップ属性に応じてオファーをフィルタリング

### 3. **excludes expired offers** (discounts.test.js:20)
- **問題**: 期限切れオファーが `true` を返しているが `false` であるべき
- **原因**: 有効期限のチェックロジックが実装されていない
- **期待値**: 現在日時より前の期限を持つオファーは除外

---

## 修正の優先順序

1. **booking.js** - `guestName` の必須エラーメッセージを追加
2. **discounts.js** - メンバー限定フィルタリングロジックを実装
3. **discounts.js** - 有効期限チェックロジックを実装

---

## 検証コマンド

```powershell
# テスト実行して確認
npm test
```
