# PRオープン後の運用ルール

utavideoの同名ルールを踏襲するが、このリポジトリは個人の公開サイトで `main` へのマージ＝即デプロイ（[docs/DEPLOY.md](../../docs/DEPLOY.md)）のため、**マージだけはPRごとにユーザーの確認を待つ**（utavideoのような無指示での自動マージはしない）。

## 1. レビューsubagentの起動

- 独立した視点を得るため、fork（コンテキスト継承）ではなく新規general-purpose agentでレビューさせる
- レビューで見つかった指摘は確認の上で反映する。スコープ外の指摘はissue化する
- CIの `claude-review` ワークフローによる自動レビューコメントも合わせて確認する

## 2. 実機（ブラウザ）での動作確認

- 独立したworktreeで動作確認する。fork ではなく新規general-purpose agentに依頼する
- worktreeの配置はグローバルルール（`~/worktrees/ngtkana-com/<branch>`）に従う。既にあればそのまま使い、無ければ `git worktree add ~/worktrees/ngtkana-com/<branch> <branch>` で作る
- 依頼する内容の定型:
  1. `npm run lint && npm test` を実行する
  2. `npm run build && npm run preview` する
  3. puppeteer（devDependenciesに含まれる）でスクリーンショットを撮り、目視で確認する（CLAUDE.mdの「見た目・挙動の変更確認」と同じ観点）
     - デスクトップ・タブレット・モバイルの3幅
     - light / dark 両方の配色
     - キーボードのみでの操作（Tabでのフォーカス順序、フォーカスリングの視認性）
  4. 設計判断の前提になった実測（配色コントラスト、レイアウト崩れの再現条件など）があれば `docs/verification/YYYYMMDD-*.md` に追記する（既存の記録は書き換えない）
  5. 確認結果を `gh pr comment <番号> --body-file <ファイル>` で日本語で投稿する。OSユーザー名やホームディレクトリの絶対パスは書かない
  6. 不具合があれば、まず `gh issue list --state all` で重複がないか確認してから `gh issue create` で起票する。「PR #<番号> の動作確認中に見つかった」ことを明記する
  7. 使った一時ファイル（`/tmp`配下）だけ削除する。**worktreeはここでは消さない**（マージ前の最終ゲートなので、マージが終わるまで残す。削除は3.のマージ後に1箇所でまとめて行う）
  8. 200〜300字程度で完了報告する（確認内容・問題の有無・issue化した場合は番号）

## 3. マージ

- CIが通り、レビュー指摘の反映と実機での動作確認が終わったら、その旨をユーザーに報告してマージの可否を確認する（`main`＝即デプロイのため、個別指示を待たずに自動マージはしない）
- 承認が得られたら `gh pr merge <番号> --merge --delete-branch=false` を使う（squash・rebaseは使わない）
- マージ後、ローカルのworktreeとブランチを片付ける:
  ```sh
  git worktree remove ~/worktrees/ngtkana-com/<branch>
  git branch -D <branch>
  ```
  worktreeがそのブランチをcheckoutしたままだと `git branch -D` が失敗するので、必ずworktree削除を先に行う

## 4. セッションの終了報告

委任された作業（レビュー・実機確認・マージ・後片付け）がすべて終わり、そのセッションでやることがなくなったら、その旨と「このセッションは削除して構わない」旨を一言添えて報告する。
