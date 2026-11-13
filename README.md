# e-sharp-frontend
混雑管理システム『E#』のフロントエンド(Web)

## 開発環境 (Docker)
React + TypeScript (Vite) を Docker 上で動かします。ホストに Node.js は不要です。
nginx がリバースプロキシとして HTTPS(自己署名証明書を自動生成。ブラウザの警告は無視して進んでください)で終端します。

```sh
task up      # 起動 → https://localhost:5173
task --list  # 他のタスク一覧
```

## コマンド一覧 (Taskfile)
[Task](https://taskfile.dev) が必要です (`brew install go-task`)。

| コマンド | 内容 |
| --- | --- |
| `task up` | 開発環境を起動 (https://localhost:5173) |
| `task down` | 開発環境を停止 |
| `task restart` | 再起動 (down → up) |
| `task logs` | ログを表示 (Ctrl+C で終了) |
| `| `task clean` | コンテナとボリューム(証明書含む)を全て削除 |
| `task npm -- <引数>` | コンテナ内で npm を実行 (例: `task npm -- install axios`) |
| `task sh` | app コンテナ内のシェルに入る |
| `task typecheck` | TypeScript の型チェック |
| `task build` | 本番ビルド (成果物は `src/dist`) |

※ `npm` / `sh` / `typecheck` は起動中のコンテナで実行するため、先に `task up` が必要です。

起動コマンドや環境変数の変更方法など、よくある疑問は [QA.md](QA.md) を参照してください。

## ディレクトリ構成
```
Dockerfile / compose.yaml / Taskfile.yml / README.md
config/  環境変数ファイル (*.env)。compose.yaml の env_file から読み込まれる
proxy/   nginx (リバースプロキシ) の設定と証明書生成スクリプト
src/     アプリ本体 (package.json, vite.config.ts, tsconfig.json, *.tsx など)
```
ソースを編集・保存するとブラウザが自動で更新されます (ホットリロード)。
