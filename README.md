# lskenapp-web

Web版サンプルアプリです。

## インストール方法

Node.js がインストールされている必要があります。インストールされていない場合は、Node.jsをインストールしてください。

Node.js をインストールした後は、 `npm install` するだけです。

ダウンロードしたソースがあるディレクトリに移動し、コマンドを実行します。

```
$ cd lskenapp-web
$ npm install
```

## 起動方法

`npm start` と入力すると開発サーバが起動します。

同時に `http://localhost:3000` がブラウザで表示されます。

## 停止方法

`npm start` して起動した開発サーバは、 `Ctrl + C` で終了します。

## API呼び出し先の変更

サンプルアプリが使用するWebAPIはデフォルトでは、ローカル環境の STS環境を参照します。

接続先を変更する場合は、 `src/config.js` で定義されている `contextName` を編集してください。

```
const contextName = "http://localhost:8080/lskenapp";
```

`npm start` している場合は設定がすぐに反映されます。



