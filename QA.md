# Q&A

開発環境でよくある変更のやり方をまとめています。
変更後の反映は、基本的に `task up` を実行すれば OK です (必要なコンテナだけ作り直されます)。

---

## Q. 起動コマンド (Vite の起動方法) を変えたい

起動コマンドは [Dockerfile](Dockerfile) の `CMD` に書いてあります。

```dockerfile
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

**変え方は 2 通り**

1. **Dockerfile の `CMD` を書き換える** (イメージ自体を変えたいとき)
2. **[compose.yaml](compose.yaml) の `app` に `command:` を足す** (Dockerfile を触らず上書きしたいとき)

   ```yaml
   app:
     command: ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--debug"]
   ```

**反映:** `task up` (Dockerfile を変えた場合も `--build` 付きで実行されます)

**注意**
- `--host 0.0.0.0` は消さないでください。無いとプロキシ(nginx)から繋がらなくなります。
- npm スクリプト自体を変えたい場合は [src/package.json](src/package.json) の `scripts` を編集します。

---

## Q. 環境変数を追加・変更したい

環境変数は `config/` 配下の `.env` ファイルに書きます。
[compose.yaml](compose.yaml) の `app` が `env_file` で読み込んでいます。

```yaml
app:
  env_file:
    - ./config/sample.env
```

`config/sample.env` の例:

```
TestKey=HelloWorld
```

**手順**
1. `config/sample.env` に `KEY=値` の形式で 1 行ずつ追加・編集する
2. `task up` を実行する (env が変わったコンテナは自動で作り直されます)

**反映されたか確認する**
```sh
task sh        # app コンテナに入る
echo $TestKey  # 値が表示されれば OK
```

> ホットリロードでは環境変数は反映されません。
> コンテナ起動時に読み込まれるため、必ず `task up` (または `task restart`) が必要です。

**別ファイルに分けたい / 複数使いたい場合**

`config/` にファイルを追加して `env_file` に並べます。後ろに書いたものが優先されます。

```yaml
env_file:
  - ./config/sample.env
  - ./config/local.env
```

---

## Q. React (ブラウザ側のコード) から環境変数を使いたい

Vite の仕様で、**`VITE_` で始まる変数だけ**がブラウザ側に公開されます。

`config/sample.env`
```
VITE_API_URL=https://example.com/api
```

React のコード (例: `src/App.tsx`)
```tsx
const apiUrl = import.meta.env.VITE_API_URL
```

TypeScript で型補完したい場合は `src/vite-env.d.ts` に追記します。

```ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}
```

**反映:** `.env` を編集して `task up`。画面は再読み込みされます。

**注意**
- `VITE_` 付きの値はブラウザから丸見えになります。**パスワードやトークンなどの秘密情報は入れないでください。**
- `VITE_` が付いていない変数 (例: `TestKey`) は、ブラウザ側では `import.meta.env` から読めません。
  `vite.config.ts` の中では `process.env.TestKey` で読めます。

---

## Q. 環境変数を変えたのに反映されない

次を順に確認してください。

1. `task up` (または `task restart`) を実行したか
   → ファイルを保存しただけでは反映されません。
2. `compose.yaml` の `env_file` に、そのファイルが書かれているか
3. ブラウザで使う変数が `VITE_` で始まっているか
4. `KEY=値` の `=` の前後にスペースが無いか
5. `task sh` で入って `echo $KEY` し、コンテナ内に値が入っているか確認する
   → コンテナ内に入っていて画面に出ないなら、`VITE_` 付きかを確認します。

---

## Q. 秘密情報 (API キーなど) はどこに置く?

`.gitignore` で `config/*.env` は Git 管理から除外され、`config/sample.env` だけが管理対象です。
**`sample.env` には秘密情報を書かないでください (コミットされます)。**

- 個人用・秘密の値は `config/local.env` のような別ファイルに書きます (`config/*.env` なので自動で無視されます)。
- そのうえで `compose.yaml` の `env_file` に並べます (上記「複数使いたい場合」参照)。
- そもそも `VITE_` 付きの値はブラウザに公開されるため、本当の秘密情報はフロントエンドでは扱えません。

---

## Q. npm パッケージを追加したい

ホストに Node.js は不要です。コンテナ内で実行します。

```sh
task npm -- install axios           # 通常の依存
task npm -- install -D @types/foo   # 開発用の依存
```

`src/package.json` と `src/package-lock.json` が更新されます。
先に `task up` で起動している必要があります。

---

## Q. 待受ポート (5173) や HTTPS の設定を変えたい

| 変えたいもの | 編集するファイル |
| --- | --- |
| ホスト側の公開ポート | [compose.yaml](compose.yaml) の `proxy.ports` (`"5173:443"` の左側) |
| HMR (ホットリロード) のポート | [src/vite.config.ts](src/vite.config.ts) の `hmr.clientPort` を **同じ値に** 揃える |
| ホスト名 | [proxy/nginx.conf](proxy/nginx.conf) の `server_name`、`vite.config.ts` の `allowedHosts`、[proxy/gen-cert.sh](proxy/gen-cert.sh) の証明書の名前 |

ポートを変えたら `task up` で反映します。

---

## Q. 自己証明書を作り直したい

証明書は `certs` ボリュームに保存されています。消すと次回起動時に自動で作り直されます。

```sh
task clean   # コンテナとボリューム(証明書含む)を削除
task up
```
