import type { ReactNode } from 'react'
import { image } from '../assets/icons'
import styles from './FooterMenuComponent.module.css'

type Props = {
  /** 並べる項目 (FooterMenuItemComponent など)。左右均等に配置され、下端から 6px 上に揃えられる */
  children: ReactNode
}

/**
 * フッターメニュー。
 *
 * 画面下端 (bottom: 0) に固定し、横幅は画面いっぱい、高さは 77px。
 *
 * 背景色は背景色 (colors.background)。
 *
 * 最上部の中央に footer-tab.svg を配置する。
 *
 * 項目 (アイコン群) は下端から 6px 上に配置する。
 *
 * 上側に影 (#6C6C6C / 透明度 10%) を付ける。
 *
 * 固定表示のため、ページ側でフッター分の下余白を確保すること。
 *
 * 引数:
 * - children: ReactNode
 *
 * @example
 * <FooterMenuComponent>
 *   <FooterMenuItemComponent src={image.event} label="イベント" selected />
 *   <FooterMenuItemComponent src={image.account} label="マイページ" />
 * </FooterMenuComponent>
 */
export default function FooterMenuComponent({ children }: Props) {
  return (
    <nav className={styles.footer}>
      {/* 最上部中央の装飾 (支援技術からは隠す) */}
      <img className={styles.tab} src={image.footerTab} alt="" aria-hidden="true" />
      {children}
    </nav>
  )
}
