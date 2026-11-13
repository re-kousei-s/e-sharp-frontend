# 開発用イメージ (Vite 開発サーバーを動かす)
FROM node:26-bookworm-slim

WORKDIR /app

# 依存関係のインストール (package.json が変わらない限りキャッシュされる)
COPY src/package.json src/package-lock.json* ./
RUN npm install

# ソース(src/)は compose.yaml でボリュームマウントされるためここでは不要
EXPOSE 5173

# 0.0.0.0 で待ち受けないとコンテナ外から繋がらない
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
