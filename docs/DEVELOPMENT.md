# 開発フロー

## セットアップ

```sh
npm install
npm run dev       # http://localhost:4321
```

Node.js 22 系を使う。`npm ci` ではなく `npm install` を使うこと（後述）。

## 主なコマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー |
| `npm run build` | 静的ビルド（`dist/`） |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run lint` | ESLint + `astro check`（型チェック） |
| `npm test` | Vitest |

## `npm ci` を使わない理由

`sharp`（画像処理）のプラットフォーム別 optional dependency が、生成環境によって `package-lock.json` に一貫して記録されない。そのため `npm ci` が「ロックファイルと不一致」と誤検知して失敗することがある（CI・Dockerビルドいずれでも発生済み）。`npm install` は同じロックファイルから素直にインストールし、この誤検知を起こさない。

## PRの運用

レビュアーが常駐しない個人開発なので、マージ前に自分で差分とスクリーンショットを確認する。マージは通常のマージコミット（squash・rebaseは使わない）。

## テスト方針

Vitestで自動テストするのは `src/lib/` 配下の純粋関数のみ（`urlUtils`, `analytics` など）。UIの見た目・挙動は自動テストせず、実際にブラウザで動かして確認する。
