# svwb-dic

Shadowverse: Worlds Beyond のカード名・キーワード能力・タイプ名・カードパック名を、各種 IME に取り込めるユーザー辞書として生成します。

単語データは `data/*.json` に置かれた「単語と読み」の一覧で、公式サイトに掲載されている情報を元に別途整備したものです。ビルドはこのデータだけを読み、ネットワークにはアクセスしません。

## 使い方

辞書ファイルだけが必要な場合は、[Releases](https://github.com/sunya9/svwb-dic/releases/latest) から取得してください。`data/` の更新時に自動で生成・添付されます。

自分でビルドする場合は次の通りです。

```sh
pnpm install
pnpm build   # out/ に辞書ファイルを生成します
pnpm test
```

## 生成されるファイル

| ファイル                          | 取り込み先                                                                                          |
| --------------------------------- | --------------------------------------------------------------------------------------------------- |
| `out/svwb-google-ime.txt`         | Google 日本語入力 / Mozc: 辞書ツール → 管理 → 新規辞書にインポート                                  |
| `out/svwb-ms-ime.txt`             | Microsoft IME: ユーザー辞書ツール → ツール → テキストファイルからの登録                             |
| `out/svwb-macos-additional.txt`   | macOS 日本語入力: 設定 → キーボード → 入力ソース → 日本語 → 追加辞書 にドラッグ                     |
| `out/svwb-text-replacement.plist` | macOS/iOS ユーザ辞書: 設定 → キーボード → ユーザ辞書 にドラッグ(iCloud 経由で iOS にも同期されます) |

## データ

| ファイル              | 内容           |
| --------------------- | -------------- |
| `data/cards.json`     | カード名       |
| `data/keywords.json`  | キーワード能力 |
| `data/tribes.json`    | タイプ         |
| `data/card-sets.json` | カードパック   |

各ファイルは `[{ "word": "...", "reading": "..." }]` の配列です。読みはひらがなと長音のみで、ビルド時に検証されます。読みの誤りは Issue で報告してください。

## 権利について

本リポジトリは非公式のファン制作物であり、Cygames, Inc. とは一切関係ありません。収録している名称は Shadowverse: Worlds Beyond に由来し、その権利は Cygames, Inc. に帰属します。
