# リバースプロキシ (nginx) 。自己証明書を作るために openssl を追加する
FROM nginx:stable-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

# 設定ファイル (nginx.dev.conf / nginx.prod.conf) は compose 側でマウントする

# nginx 起動前に自動実行されるスクリプト (/docker-entrypoint.d/ 内は起動時に順に実行される)
COPY gen-cert.sh /docker-entrypoint.d/40-gen-cert.sh
RUN chmod +x /docker-entrypoint.d/40-gen-cert.sh
