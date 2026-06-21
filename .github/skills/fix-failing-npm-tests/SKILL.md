---
name: fix-failing-npm-tests
description: 'Use when: npm test fails, node:test failures need investigation, failing tests should be fixed without weakening tests, implementation must be corrected and npm test rerun.'
---

# Fix Failing npm Tests

このワークスペースで、`npm test` の失敗を調べ、テストを弱めずに実装を修正し、再度 `npm test` で確認するときに使う。

この Skill を読み込んだら、回答の冒頭に「fix-failing-npm-tests Skill を参照しました」と短く書く。

## When to Use

- `npm test` が失敗している原因を調べるとき。
- `node:test` の失敗内容から、期待される振る舞いを読み取って実装を直すとき。
- テスト期待値を安易に変更せず、既存テストの意図を保ったまま修正したいとき。
- 修正後に `npm test` まで実行して完了確認したいとき。

## Procedure

1. 直近の `npm test` 出力、失敗したテスト名、Assertion の actual/expected、スタック上のテストファイルを確認する。
2. 失敗しているテストファイルと対象ソースファイルを読む。
3. テストが表す期待仕様を整理する。テストに明らかな誤りがある場合を除き、テストは弱めない。
4. 実装側の根本原因を直す。変更範囲は失敗テストに関係する最小限にする。
5. 振る舞いの抜けが見つかった場合だけ、焦点を絞った `node:test` のテストを最小追加する。
6. `npm test` を実行する。
7. まだ失敗する場合は、失敗内容を読み直して手順 2 から繰り返す。

## Decision Points

- テストの期待値とプロダクト仕様が一致している場合: 実装を修正する。
- テストが対象外の古い仕様を固定している場合: ユーザーに確認してからテスト更新を検討する。
- 複数の失敗がある場合: 同じ根本原因か、独立した失敗かを切り分ける。同じ原因ならまとめて直し、独立していれば一つずつ確認する。
- 依頼範囲外の失敗が残る場合: 触った範囲の検証結果と、残っている失敗を明確に分けて報告する。

## Quality Checks

- 失敗テストを削除、skip、todo 化していない。
- Assertion を弱めるだけの変更をしていない。
- 公開関数名や外部 API を、依頼なしに変更していない。
- 入力検証エラーは、どの項目が不正なのか分かる文言になっている。
- `npm test` を実行し、成功または残存失敗の内容を最終報告に含めている。

使うコマンド:

```powershell
npm test
```