# CoderDojo磐田 スライド

CoderDojo磐田で使用するスライドを公開しています。以下のリンクからスライドの一覧を参照することができます。

https://coderdojo-iwata.github.io/slides/

スライドはMarkdownをinputに作成できる[Marp](https://marp.app/)を使用しています。

## ディレクトリ構成

```
.
├── public     # GitHub Pages公開ファイル出力用（Repository管理対象外）
├── plantuml   # PlantUML画像のinputとなるMarkdown
├── scripts    # 各種作業を効率化するためのスクリプト
├── slides     # スライドのinputとなるMarkdown
|   └── assets # スライド用画像
└── themes     # スライドのinputとなるMarkdown
```

## 使い方

### スライドの追加方法

`slides`ディレクトリ配下に必要なファイルを作成します。`start`コマンドでスライドのプレビューができます。
 
 ```sh
 npm run start
 ```

### スライド生成方法

`build`コマンドを実行することで`public`ディレクトリにスライドファイル一式を出力します。`plantuml`ディレクトリにMarkdownを配置しておくと、Markdownと同名のSVGを`assets`ディレクトリに出力します。

 ```sh
 npm run build
 ```

### トップページのブラウザ表示

`open`コマンドでスライドリンクの一覧を記載したトップページをブラウザ表示できます。

```sh
npm run open
```

## ライセンス

[WTFPL](/LICENSE)
