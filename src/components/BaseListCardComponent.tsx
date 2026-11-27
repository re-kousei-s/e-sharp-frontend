import type { ReactNode } from 'react'
import styles from './BaseListCardComponent.module.css'

type Props = {
  /** 背景色。`'sub'` (サブカラー) / `'white'` (#fff・枠線あり)。省略時は `'white'` */
  color?: 'sub' | 'white'
  /** カード内に表示する内容 */
  children?: ReactNode
}

/**
 * 一覧表示用の土台となるカード (幅 359px / 高さ 84px / 角の半径 10px)。
 *
 * ドロップシャドウを付ける。
 *
 * 中身は上下中央に配置する (複数の要素は縦に積む)。
 *
 * 背景色はサブカラー / 白の 2 種類で、`color` で切り替える。
 *
 * 白の場合のみ、内側に枠線 (#C4D4FF / 0.5px) を付ける。
 *
 * 引数:
 * - color?: 'sub' | 'white'
 * - children?: ReactNode
 *
 * @example
 * <BaseListCardComponent color="sub">カードの内容</BaseListCardComponent>
 */
export default function BaseListCardComponent({ color = 'white', children }: Props) {
  return <div className={`${styles.card} ${styles[color]}`}>{children}</div>
}
