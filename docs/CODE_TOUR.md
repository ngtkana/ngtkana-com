# コードツアー

## `src/` の責務

| ディレクトリ      | 役割                                                                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/pages/`      | ルーティング。1ファイル = 1ページ（`index.astro`, `404.astro`）                                                                                     |
| `src/layouts/`    | ページ共通の骨格（`<head>`、メタタグ、GA/AdSense、footer）。`Layout.astro` 1つのみ                                                                  |
| `src/components/` | 見た目を持つ部品。1コンポーネント1ファイル、スタイルはコンポーネントスコープ`<style>`に閉じる（他コンポーネントのCSSに影響を与えない）              |
| `src/lib/`        | Astro/DOMに依存しない純粋なTS。データ定義（`navigation.ts`, `seo.ts`）と純粋関数（`urlUtils.ts`, `analytics.ts`）。`*.test.ts` はここにだけ存在する |
| `src/styles/`     | `global.css`。デザイントークンとリセットのみ。ページ固有のスタイルはここに置かない                                                                  |
| `src/assets/`     | ビルド時に `astro:assets` で最適化される画像（`hero.jpg` など）。`public/` とは違い、ここに置いた画像はビルド時にリサイズ・変換される               |

## ナビゲーションの構造

ページ内ナビの項目は `src/lib/navigation.ts` の `navSections` 1箇所で定義し、`Sidebar.astro`（デスクトップ）と `MobileNav.astro`（モバイル/タブレット）の両方がそこから読む。ナビ項目を増減したら、対応する `<Section id="...">` を `index.astro` にも追加/削除すること（`id` が一致していないとスクロール連動が効かない）。

## よくある変更

すべて `src/pages/index.astro` 内、ファイル先頭の配列を編集する。

| やりたいこと                       | 編集箇所                                                                                                                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 活動履歴(History)を追加            | `timelineEntries` 配列                                                                                                                                                                           |
| SNSリンクを追加・変更              | `primarySocialLinks` / `communitySocialLinks` / `competitiveSocialLinks`（優先度に応じてどの配列に入れるかは [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) 参照）                                         |
| フレンドコードを追加・変更         | Friend Codes セクション内の `<FriendCodeItem>`                                                                                                                                                   |
| プロフィール(dl)の項目を追加・変更 | Profile セクション内の `<ProfileItem>`                                                                                                                                                           |
| サイトの説明文・OGP情報を変更      | `src/lib/seo.ts` の `siteConfig`                                                                                                                                                                 |
| 新しいアイコンを使う               | `src/components/Icon.astro` の `iconifyName` に追加（利用可能なセットは `fa6-solid` / `fa6-brands` / `simple-icons` / `feather`。他のセットを使うなら `@iconify-json/*` を追加インストールする） |
| ナビのセクションを追加             | `src/lib/navigation.ts` に追加 **かつ** `index.astro` に同じ `id` の `<Section>` を追加                                                                                                          |
