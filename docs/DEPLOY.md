# デプロイ

## 仕組み

`main` への push で `.github/workflows/pipeline.yml` がトリガーされ、2つのジョブが順に走る。

1. **test**: `npm run lint` / `npm test`
2. **deploy**: `test` が成功した場合のみ（`needs: test`）実行。`npm run build` → Dockerイメージをビルドして Artifact Registry に push → Cloud Run にデプロイ

`deploy` は `main` への push イベントのときだけ実行され、Pull Requestでは `test` のみ走る。

対象パスは `src/**` `public/**` `*.astro` `*.css` `package.json` `Dockerfile` `astro.config.mjs` など（正確な一覧はYAML先頭の `paths` を参照）。ドキュメントのみの変更では起動しない。

## 手動での再実行

pushイベントが何らかの理由で拾われなかった場合や、コード変更なしに再デプロイしたい場合:

```sh
gh workflow run "CI/CD" --ref main
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
