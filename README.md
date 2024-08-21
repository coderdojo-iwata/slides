# CoderDojo磐田 スライド

CoderDojo磐田で使用するスライドを公開しています。以下のリンクからスライドの一覧を参照することができます。

https://coderdojo-iwata.github.io/slides/

スライドはMarkdownをinputに作成できる[Marp](https://marp.app/)を使用しています。

各種UMLには[PlantUML](https://plantuml.com/)を使用しています。指定のディレクトリにMarkdownを配置しておき、ビルド時に自動でSVG変換できるようにしています。

## ディレクトリ構成

```
.
├── public     # GitHub Pages成果物
├── plantuml   # PlantUML画像のinputとなるMarkdown
├── scripts    # 各種作業を効率化するためのスクリプト
├── slides     # スライドのinputとなるMarkdown
|   └── assets # アセットファイル（画像など）
└── themes     # スライドのカスタムテーマCSS
```

### カスタムテーマCSS

https://marpit.marp.app/theme-css

## 使い方

### スライドの追加方法

`slides`ディレクトリ配下に必要なファイルを作成します。`start`コマンドでスライドのプレビューができます。
 
 ```sh
 npm run start
 ```

### スライド生成方法

`build`コマンドを実行することで`public`ディレクトリにスライドファイル一式、スライドリンク一覧にしたトップページを出力します。

`plantuml`ディレクトリ内のMarkdownと同名のSVGを`assets`ディレクトリに出力します。（例: `diagram.md` -> `diagram.svg`）

 ```sh
 npm run build
 ```

### トップページのブラウザ表示

`open`コマンドでトップページをブラウザ表示できます。

```sh
npm run open
```

## ライセンス

[WTFPL](/LICENSE)
