import type { ReactNode } from 'react'
import styles from './FooterMenuComponent.module.css'

type Props = {
  /** 並べる項目 (FooterMenuItemComponent など)。左右均等・上下中央に配置される */
  children: ReactNode
}

/**
 * フッターメニュー。
 *
 * 画面下端 (bottom: 0) に固定し、横幅は画面いっぱい、高さは 77px。
 *
 * 固定表示のため、ページ側でフッター分の下余白を確保すること。
 *
 * 引数:
 * - children: ReactNode
 *
 * @example
 * <FooterMenuComponent>
 *   <FooterMenuItemComponent src={homeIcon} label="ホーム" color="#333" />
 *   <FooterMenuItemComponent src={userIcon} label="マイページ" color="#333" />
 * </FooterMenuComponent>
 */
export default function FooterMenuComponent({ children }: Props) {
  return <nav className={styles.footer}>{children}</nav>
}
