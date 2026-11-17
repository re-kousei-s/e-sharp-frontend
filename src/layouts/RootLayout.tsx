import { Outlet } from 'react-router'
import styles from './RootLayout.module.css'

// 全ページ共通のレイアウト。各ページは <Outlet /> の位置に描画される
export default function RootLayout() {
  return (
    <div className={styles.root}>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
