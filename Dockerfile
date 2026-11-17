# マルチステージビルド
#   dev   : 開発用 (Vite 開発サーバー / ホットリロード)  ← compose.yaml が使用
#   build : リリースビルド (npm run build で dist を作る)
#   prod  : 本番用 (static-web-server で dist を配信)    ← compose-prod.yaml が使用
#
# 例) docker build --target prod -t e-sharp-frontend .

# ---------- dev: 開発用 ----------
FROM node:26-bookworm-slim AS dev

WORKDIR /app

# 依存関係のインストール (package.json が変わらない限りキャッシュされる)
COPY src/package.json src/package-lock.json* ./
RUN npm install

# ソース(src/)は compose.yaml でボリュームマウントされるためここでは不要
EXPOSE 5173

# 0.0.0.0 で待ち受けないとコンテナ外から繋がらない
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ---------- build: リリースビルド ----------
# 成果物は静的ファイルでCPUに依存しないため、ビルドは実行環境のCPUで行う
# (マルチアーキテクチャのイメージ作成時に QEMU でのエミュレーションを避けられる)
FROM --platform=$BUILDPLATFORM node:26-bookworm-slim AS build

WORKDIR /app

# package-lock.json の内容どおりに依存関係をインストール (再現性のため npm ci)
COPY src/package.json src/package-lock.json ./
RUN npm ci

# ソース全体をコピーしてビルド (成果物は /app/dist)
COPY src/ ./
RUN npm run build

# ---------- prod: 本番用 ----------
# static-web-server (https://static-web-server.net/) の Debian 版
FROM joseluisq/static-web-server:2-debian AS prod

# ビルド済みの静的ファイルだけをコピー (Node.js は最終イメージに含まれない)
COPY --from=build /app/dist /public

# 配信設定 (環境変数で指定できる)
ENV SERVER_PORT=80 \
    SERVER_ROOT=/public \
    # 存在しないパスは index.html を返す (React の SPA ルーティング用)
    SERVER_FALLBACK_PAGE=/public/index.html \
    # gzip / brotli などで圧縮して配信
    SERVER_COMPRESSION=true \
    # 死活監視用の /health を有効にする
    SERVER_HEALTH=true

EXPOSE 80
