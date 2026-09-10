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

commit前に `lint` と `test` を通すこと。

## `npm ci` を使わない理由

`sharp`（画像処理）のプラットフォーム別 optional dependency が、生成環境によって `package-lock.json` に一貫して記録されない。そのため `npm ci` が「ロックファイルと不一致」と誤検知して失敗することがある（CI・Dockerビルドいずれでも発生済み）。`npm install` は同じロックファイルから素直にインストールし、この誤検知を起こさない。

## ブランチ・PRの運用

- 1つの変更 = 1PR。大きな変更は「土台の入れ替え」「デザイン刷新」のように意味のある単位で分割する
- `main` へのマージは通常のマージコミット（squash・rebaseは使わない）
- `main` へのpushで CI とデプロイが両方走る。CIの完了を待たずデプロイが走る点に注意（[docs/DEPLOY.md](DEPLOY.md)参照）
- レビュアーは常駐しない個人開発なので、マージ前に自分でスクリーンショットとdiffを確認する

## 見た目・挙動を変えたときの確認

Astroコンポーネントはユニットテストの対象にしにくい（Reactコンポーネントと違い、テスティングライブラリで浅くマウントする方法が定まっていない）。そのため見た目・挙動の変更は次の方法で確認する。

1. `npm run build && npm run preview`
2. ブラウザ（またはheadlessブラウザ + puppeteer）で以下を確認:
   - デスクトップ・タブレット・モバイルの3幅
   - light / dark 両方の配色（`prefers-color-scheme` を切り替えて確認）
   - キーボードのみでの操作（Tabでのフォーカス順序、フォーカスリングの視認性）

`puppeteer` は devDependencies に入っているので、その場でスクリーンショット確認スクリプトを書いて使ってよい。

## テスト方針

Vitestで自動テストするのは `src/lib/` 配下の純粋関数のみ（`urlUtils`, `analytics` など）。UIコンポーネントの見た目・挙動は自動テストの対象にせず、上記の目視確認に委ねる。
