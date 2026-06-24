---
name: code-review
description: Copilot code review で予約デモの PR をレビューするときに使う。src/discounts.js、src/booking.js、test/discounts.test.js、test/booking.test.js の変更を、振る舞い・テスト・入力検証の観点に絞って確認する。
---

# 予約デモ用 Code Review Skill

このデモ用ワークスペースで `src/` または `test/` 配下の変更をレビューするときに、この Skill を使う。特に、Pull Request の差分に次のファイルが含まれる場合は、この Skill の観点を優先してレビューする。

- `src/discounts.js`
- `src/booking.js`
- `test/discounts.test.js`
- `test/booking.test.js`

レビュー観点:

1. 期限切れの割引が、割引対象から除外されているかを確認する。
2. 振る舞いの変更が、焦点を絞った `node:test` のテストで確認されているかを見る。
3. 予約入力の検証エラーが、どの項目が不正なのか分かる文言になっているかを確認する。
4. 書式だけの指摘は、正しさやセキュリティの問題を隠していない限り無視する。

デモ中にこの Skill が使われたことが分かりやすいように、レビューコメントを書く場合は本文の冒頭に `肥後レビュー:` を入れ、熊本弁を交えて書く。方言は雰囲気づけにとどめ、指摘内容は具体的で、お客様がそのまま修正判断に使える表現にする。
