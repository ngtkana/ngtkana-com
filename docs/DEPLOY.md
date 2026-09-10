# デプロイ

## 仕組み

`main` への push で `.github/workflows/` の2つのワークフローが**それぞれ独立に**トリガーされる。

- **CI**（`ci.yml`）: `npm run lint` / `npm test`
- **Deploy to Google Cloud Run**（`deploy.yml`）: `npm run build` → Dockerイメージをビルドして Artifact Registry に push → Cloud Run にデプロイ

CIの成功をDeployが待つ設定にはなっていない。CIが落ちていてもデプロイは進む点に注意（`deploy.yml` のコメントは紛らわしいが、`needs` 等の依存関係は実際には無い）。

対象パスは `src/**` `public/**` `*.astro` `*.css` `package.json` など。`Dockerfile` と `astro.config.mjs` は `deploy.yml` の対象パスにのみ含まれ、`ci.yml` には含まれない（正確な一覧は各YAML先頭の `paths` を参照）。ドキュメントのみの変更ではどちらも起動しない。

## 手動での再実行

pushイベントが何らかの理由で拾われなかった場合や、コード変更なしに再デプロイしたい場合:

```sh
gh workflow run "Deploy to Google Cloud Run" --ref main
```

## Cloud Run

- サービス名: `ngtkana-com`
- リージョン: `asia-northeast1`
- コンテナはCloud Runが渡す `$PORT` をリッスンする（`Dockerfile` 参照。固定値ではない）

## Secrets

GitHub Actions側に以下が必要（リポジトリのSecretsに設定済み）:

- `GCP_PROJECT_ID`
- `GCP_SA_KEY`

## 環境変数（アプリ側）

`PUBLIC_` プレフィックス（Astro/Viteの規約でクライアントに露出する変数）:

- `PUBLIC_GA_MEASUREMENT_ID`
- `PUBLIC_ADSENSE_PUBLISHER_ID`

未設定でも `src/lib/analyticsConfig.ts` にフォールバック値があるため動作する。値を変える場合のみ `.env` かデプロイ環境の環境変数で上書きする。
