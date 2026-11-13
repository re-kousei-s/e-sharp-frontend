import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Docker 上のファイル変更を検知するためポーリングを使用 (ホットリロード用)
    watch: { usePolling: true },
    // プロキシ経由 (https://localhost:5173) で HMR の WebSocket を繋ぐ設定
    hmr: { protocol: 'wss', clientPort: 5173 },
    // プロキシ経由のホスト名を許可
    allowedHosts: ['localhost'],
  },
})
