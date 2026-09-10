# 開発フロー

## セットアップ

```sh
npm install
npm run dev       # http://localhost:4321
```

Node.js 22系・npm 11以上を使う（`package.json` の `engines` で強制される。古いnpmだとインストール自体が失敗する）。

## 主なコマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー |
| `npm run build` | 静的ビルド（`dist/`） |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run lint` | ESLint + `astro check`（型チェック） |
| `npm test` | Vitest |

依存関係を追加・削除したら `npm ci` が通ることを確認してからcommitする（`package.json` と `package-lock.json` の不整合をローカルで検知するため）。

## PRの運用

レビュアーが常駐しない個人開発なので、マージ前に自分で差分とスクリーンショットを確認する。マージは通常のマージコミット（squash・rebaseは使わない）。

## テスト方針

Vitestで自動テストするのは `src/lib/` 配下の純粋関数のみ（`urlUtils`, `analytics` など）。UIの見た目・挙動は自動テストせず、実際にブラウザで動かして確認する。
