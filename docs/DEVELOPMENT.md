# 開発フロー

## セットアップ

```sh
npm install
npm run dev       # http://localhost:4321
```

Node.js 22系・npm 11以上を使う（`package.json` の `engines` で強制される。古いnpmだとインストール自体が失敗する）。

## 主なコマンド

| コマンド          | 内容                                                           |
| ----------------- | -------------------------------------------------------------- |
| `npm run dev`     | 開発サーバー                                                   |
| `npm run build`   | 静的ビルド（`dist/`）                                          |
| `npm run preview` | ビルド結果をローカルで確認                                     |
| `npm run lint`    | Prettier（整形チェック）+ ESLint + `astro check`（型チェック） |
| `npm run format`  | Prettier で整形する（`npm run lint` に怒られたらこれを実行）   |
| `npm test`        | Vitest                                                         |

整形はすべて Prettier に任せている（ESLint 側は `eslint-config-prettier` で整形系ルールを無効化済み）。`npm run lint` は整形の**確認**だけを行い、書き換えはしない。直すときは `npm run format` を使う。

Prettier の対象外にしたいものは `.gitignore` に書けばよい（Prettier 3 は `.gitignore` を尊重するため、無視リストを二重管理しない）。

依存関係を追加・削除したら `npm ci` が通ることを確認してからcommitする（`package.json` と `package-lock.json` の不整合をローカルで検知するため）。

## pre-commitフック

commit前に `npm run lint && npm test` が自動で走り、落ちたらcommitが中止される（[.husky/pre-commit](../.husky/pre-commit)）。Huskyが `npm install` の `prepare` スクリプトで仕掛けるので、セットアップの追加手順は無い。

CIに任せず手元で止めているのは、`main` へのマージが即デプロイだから。壊れたものをpushしてからCIで気づくより、commitの時点で弾いたほうが早い。

一時的に迂回したいときは `HUSKY=0 git commit ...` か `git commit --no-verify`。ただし迂回した分はCIで落ちる。

`npm ci` は `.git` が無い環境（Dockerのdepsステージなど）でも通る。Huskyはその場合 `.git can't be found` と表示して正常終了する。

## PRの運用

レビュアーが常駐しない個人開発なので、マージ前に自分で差分とスクリーンショットを確認する。PRを出すと `claude-review` ワークフロー（[.github/workflows/claude-review.yml](../.github/workflows/claude-review.yml)）がClaude Codeによる自動レビューコメントを付ける。マージは通常のマージコミット（squash・rebaseは使わない）。

## テスト方針

Vitestで自動テストするのは `src/lib/` 配下の純粋関数のみ（`urlUtils`, `analytics` など）。UIの見た目・挙動は自動テストせず、実際にブラウザで動かして確認する。
