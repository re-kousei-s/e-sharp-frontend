import type { ReactNode } from 'react'
import styles from './TitleComponent.module.css'

type Props = {
  /** 見出しとして表示するテキスト */
  children: ReactNode
}

/**
 * ページ見出し (文字サイズ 24px / bold)。
 *
 * `<h1>` として描画する。
 *
 * 引数:
 * - children: ReactNode
 *
 * @example
 * <TitleComponent>ホーム</TitleComponent>
 */
export default function TitleComponent({ children }: Props) {
  return <h1 className={styles.heading}>{children}</h1>
}
