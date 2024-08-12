# CoderDojo磐田 スライド

CoderDojo磐田で使用するスライドを公開しています。以下のリンクからスライドの一覧を参照することができます。

https://coderdojo-iwata.github.io/slides/public/

Markdownからスライドを作成できる[Marp](https://marp.app/)を使用しています。

## スライドの追加方法

1. `slides`ディレクトリ配下に必要なファイルを作成、配置します。  
    ```sh
    /project-root
    ├── slides/    # スライドの元となるMarkdownファイル
    │   └── assets # 画像ファイル
    ```
    `start`コマンドでスライドのプレビューができます。
    ```sh
    npm run start
    ```
1. スライド生成コマンドを実行します。
    ```sh
    npm run build
    ```
1. 上記で生成したファイルをpushします。

## ライセンス

[WTFPL](/LICENSE)
