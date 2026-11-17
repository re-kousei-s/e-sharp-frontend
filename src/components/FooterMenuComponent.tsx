import type { ReactNode } from 'react'
import styles from './FooterMenuComponent.module.css'

type Props = {
  // 並べる項目 (FooterMenuItemComponent など)
  children: ReactNode
}

// フッターメニュー (画面下に固定 / 横幅いっぱい / 高さ 77px)
export default function FooterMenuComponent({ children }: Props) {
  return <nav className={styles.footer}>{children}</nav>
}
