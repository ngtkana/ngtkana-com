# デザインの原則・規約

トークン定義は `src/styles/global.css`。

## カラートークンの階層と使い分け

| トークン                                                                     | 用途                                                                                                  |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `--color-bg-primary` / `-secondary` / `-hover`                               | 背景                                                                                                  |
| `--color-border` / `-light`                                                  | 罫線・区切り                                                                                          |
| `--color-text-primary` / `-secondary` / `-tertiary`                          | 本文の文字色（濃い順）                                                                                |
| `--color-accent`                                                             | **文字用**のアクセント色。リンク・フォーカスリング・強調テキストに使う                                |
| `--color-accent-strong`                                                      | 生のブランドカラー。**文字には使わない**。バッジの塗り・枠線・hover背景など「文字を乗せない」装飾専用 |
| `--color-accent-soft`                                                        | チップ・バッジの薄い背景                                                                              |
| `--color-on-accent-strong`                                                   | `accent-strong` を背景にしたときの文字色                                                              |
| `--social-*`（youtube, twitter, twitch, niconico, hatena, atcoder, discord） | SNSリンクのブランド色。アイコン色とhover時の文字色を兼ねる                                            |

**なぜ `accent` と `accent-strong` を分けているか**: ブランドカラーの原色（`accent-strong`）は明度が高く、背景色に対して文字色として使うとコントラスト比が4.5:1を切る。`accent` はそれを補正した派生色で、実際に計算して4.5:1以上を確保している。新しい配色を追加するときも同じ考え方で、**原色をそのまま文字色に使わない**。

light/darkとも `oklch()` で定義し、`@media (prefers-color-scheme: dark)` で上書きする。新しい色を足すときも生のhexではなく `oklch(L C H)` で書く。

## コントラストの検証

目視ではなく計算で確認する。本文は4.5:1、大きい文字・UI部品は3:1が目安。手元でざっと確認するには `culori` などで相対輝度を計算するスクリプトを一時的に書けばよい（本番の依存には加えない）。

## タイポグラフィ

日本語・英語とも単一フォント `Zen Maru Gothic` に統一している（フォントペアリングはしない）。識別子的な短い値（フレンドコード、日付など）だけ `JetBrains Mono`（`--font-mono`）を使う。本文には使わない。

## モーション

`prefers-reduced-motion: reduce` を尊重し、アニメーションを無効化する。新しいアニメーションを足すときも対応すること（`global.css` の既存のアニメーションクラスを参照）。

## フォーカス・キーボード操作

- `:focus-visible` のスタイルは `global.css` で一括定義済み。要素のhover/active見た目を変えたときは、フォーカスリングも一緒に確認する
- クリックで開閉する要素（ハンバーガーメニュー等）は、閉じている間 `inert` を付与してTabフォーカスが入らないようにする（`MobileNav.astro` 参照）

## コンポーネントの使い分け（SNSリンク）

- `SocialLinkCard.astro`: 説明文付きの詳細カード。最重要チャンネル（YouTube, X）用
- `SocialLinkChip.astro`: アイコン+名前だけの小さいピル。それ以外のSNS・関連リンク用
- `FriendCodeItem.astro`: `.chip` クラス（`global.css`）を使った等幅表示のバッジ。ID・コードの類に使う

9個のリンクを同格で並べるのではなく、この3段階で優先順位を視覚化している。
