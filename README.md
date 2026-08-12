# テニススクール体験検索 — UIプロトタイプ

tennis365 のテニススクール検索サービスの画面プロトタイプ。
`tennis_school_compare` / `tennis-articles-project` と同じ「React + Babel standalone を
CDN 読み込みし、`frames/*.jsx` を1枚のキャンバスに並べて表示する」方式。

## 画面（テニススクール体験検索）

| # | 画面 | 状態 | ファイル |
|---|------|------|----------|
| 01 | TOP | 次回対象（骨子のみ） | `frames/Stubs.jsx` |
| 02 | 一覧 | **今回対象** | `frames/List.jsx` |
| 03 | 詳細 | **今回対象** | `frames/Detail.jsx` |
| 04 | 一覧比較 | 次回対象（骨子のみ） | `frames/Stubs.jsx` |
| 05 | おすすめ一覧 | 次回対象（骨子のみ） | `frames/Stubs.jsx` |

- 共通パーツ（ヘッダー・見出し・評価・スマホ枠・ダミーデータ）: `frames/Shared.jsx`
- デザイントークン・コンポーネントCSS: `styles.css`
- キャンバス（各フレームの配置）: `index.html`

## デザインシステム（要件で確定した内容を踏襲）

- 配色: **emerald-600** 基調
- 角丸: 四角寄り（カード `6px` / チップ・ボタン `3px`）
- 本文 16px / 補足・ラベル 14px
- セクション見出し: グレー帯 + 和文タイトル + 英字ラベル（emerald）
- カード画像アスペクト比 **3:2**、無い情報はエリアごと非表示
- 有料/無料会員で表示情報を出し分け（タグ・説明文・画像は有料限定、口コミは無料でも表示）

参照した要件:
- `../tennis365_school/tennis365_ui_requirements_list_page.txt`（一覧）
- `../tennis365_school/tennis365_ui_requirements_detail_page.txt`（詳細）

## 表示方法

Babel が `.jsx` を XHR で読むため `file://` では動きません。静的サーバ経由で開きます。

```bash
cd /Users/irieisamu/Desktop/tennis365/tennis_school_taiken
python3 -m http.server 8130
```

→ ブラウザで http://localhost:8130/

`.jsx` / `.css` を編集して見た目が変わらない時は、`index.html` の `?v=1` の数字を上げてキャッシュを回避してください。

## 許可プロンプトについて

このフォルダで `claude` を起動すると `.claude/settings.local.json` が読まれ、
ファイル編集の自動承認（`acceptEdits`）と、静的サーバ起動・`curl`・`node` などの
許可が効くため、確認プロンプトが最小限になります。
