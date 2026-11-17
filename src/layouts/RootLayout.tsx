import { Outlet } from 'react-router'

// 全ページ共通のレイアウト。各ページは <Outlet /> の位置に描画される
export default function RootLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
