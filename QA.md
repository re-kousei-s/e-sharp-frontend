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

---

## Q. 本番(リリース)用の構成はどうなっている?

[Dockerfile](Dockerfile) がマルチステージで、3 つのステージがあります。

| ステージ | 用途 | 使う場所 |
| --- | --- | --- |
| `dev` | Vite 開発サーバー (ホットリロード) | [compose.yaml](compose.yaml) |
| `build` | `npm ci` → `npm run build` で静的ファイルを作る | `prod` の中間ステージ |
| `prod` | [static-web-server](https://static-web-server.net/) で静的ファイルを配信 | [compose-prod.yaml](compose-prod.yaml)、リリース |

本番イメージには Node.js が含まれず、ビルド済みのファイルだけが入ります。
HTTPS の終端は開発と同じ nginx イメージ (`proxy/`) が行い、設定ファイルだけを分けています
(開発: [proxy/nginx.dev.conf](proxy/nginx.dev.conf) → `app:5173` / 本番: [proxy/nginx.prod.conf](proxy/nginx.prod.conf) → `app:80`)。

```sh
task prod:up      # 本番構成を起動 → https://localhost:5174 (イメージはローカルでビルドされる)
task prod:down    # 停止
task prod:logs    # ログ
task prod:build   # 本番イメージだけビルド
```

> 開発 (`task up`、ポート 5173) と本番 (`task prod:up`、ポート 5174) は別のプロジェクトとして動くので、同時に起動できます。

---

## Q. 本番の static-web-server の設定を変えたい

設定は [Dockerfile](Dockerfile) の `prod` ステージの `ENV` に環境変数で書いてあります。
変えたい値を書き換えて `task prod:up` で反映します。

| 環境変数 | 意味 |
| --- | --- |
| `SERVER_PORT` | 待受ポート (変えたら compose-prod.yaml の `expose` と nginx.prod.conf の転送先も合わせる) |
| `SERVER_FALLBACK_PAGE` | 存在しないパスで返すファイル (React の SPA ルーティング用) |
| `SERVER_COMPRESSION` | 圧縮配信 |
| `SERVER_HEALTH` | `/health` エンドポイント (compose-prod.yaml のヘルスチェックが使用) |

そのほかの設定項目は [static-web-server のドキュメント](https://static-web-server.net/configuration/environment-variables/) を参照してください。

---

## Q. CI (GitHub Actions) では何が動く?

| ファイル | タイミング | 内容 |
| --- | --- | --- |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | プルリクエスト、`develop` / `main` への push | `npm ci` → `npm run lint` (ESLint) |
| [.github/workflows/release.yml](.github/workflows/release.yml) | `main` への push (= マージ時) | 本番イメージをビルドして ghcr に push |

ローカルで CI と同じチェックをするには、開発環境を起動して次を実行します。

```sh
task lint
```

---

## Q. CI の内容を変えたい

### リンターのルールを変えたい
[src/eslint.config.js](src/eslint.config.js) の `rules` を編集します。
例えば `any` の使用を許可したい場合:

```js
rules: {
  ...reactHooks.configs.recommended.rules,
  '@typescript-eslint/no-explicit-any': 'off',
}
```

### CI で動かすチェックを増やしたい (型チェック・テスト・ビルドなど)
[ci.yml](.github/workflows/ci.yml) の `steps` の末尾に足します。

```yaml
      - run: npm run lint
      - run: npx tsc --noEmit   # 型チェックを追加
      - run: npm run build      # ビルドできるかの確認を追加
```

テストなど別ジョブにしたい場合は、`jobs:` に `lint:` と同じ階層で新しいジョブを追加します。

### CI を動かすブランチを変えたい
[ci.yml](.github/workflows/ci.yml) の `on:` を編集します。

```yaml
on:
  pull_request:
  push:
    branches: [develop, main]   # ← ここ
```

### Node.js のバージョンを変えたい
Dockerfile のベースイメージ (`node:26-...`) と [ci.yml](.github/workflows/ci.yml) の `node-version` の **両方** を揃えて変えてください。

### CI が落ちたとき
- 手元で `task lint` を実行して、同じエラーが出るか確認します。
- `npm ci` が失敗する場合は、`package.json` と `package-lock.json` がずれています。
  `task npm -- install` を実行して、更新された `src/package-lock.json` もコミットしてください。

---

## Q. リリース (ghcr へのイメージ push) について

[release.yml](.github/workflows/release.yml) が、`main` にマージされたときに実行されます。

- **イメージ名**: `ghcr.io/re-kousei-s/e-sharp-frontend`
- **タグ**: `latest` (常に最新の main) と `sha-xxxxxxx` (コミットごと。ロールバック用)
- **対応 CPU**: `linux/amd64` と `linux/arm64`
- **認証**: GitHub が自動で用意する `GITHUB_TOKEN` を使うので、シークレットの登録は不要です。

### 初回だけ必要な設定
- リポジトリの **Settings → Actions → General → Workflow permissions** が、パッケージの書き込みを許可していること
  (`release.yml` 側で `packages: write` を指定済みですが、組織の設定で制限されている場合があります)。
- 初回の push 後、ghcr のパッケージは **非公開** になります。
  サーバーから pull できるようにするには、パッケージの設定で公開するか、`docker login ghcr.io` で認証してください。

### 作られたイメージで起動する
[compose-prod.yaml](compose-prod.yaml) は ghcr のイメージを使います。

```sh
docker login ghcr.io                                   # 非公開の場合のみ
docker compose -f compose-prod.yaml pull app
docker compose -f compose-prod.yaml up -d
IMAGE_TAG=sha-abc1234 docker compose -f compose-prod.yaml up -d   # 版を指定
```

> `task prod:up` / `task prod:build` はローカルでビルドして、同じイメージ名 (`...:latest`) を上書きします。
> ghcr の最新を使いたいときは、上の `pull` を実行してください。

### リリースの内容を変えたい
- **リリースするタイミング**: `release.yml` の `on.push.branches` を変えます。
  タグ (`v1.0.0` など) でリリースしたい場合は `on.push.tags: ['v*']` に変え、`metadata-action` の `tags` に `type=semver,pattern={{version}}` を追加します。
- **タグの付け方**: `docker/metadata-action` の `tags:` を編集します。
- **対応 CPU を減らしたい**: `platforms:` から不要なものを消します (例: `linux/amd64` のみ)。

> このリポジトリの既定ブランチは `develop` です。`main` ブランチが無い場合は、先に作成してください。
