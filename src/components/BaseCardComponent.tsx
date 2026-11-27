import type { ReactNode } from 'react'
import styles from './BaseCardComponent.module.css'

type Props = {
  /** 背景色。`'sub'` (サブカラー) / `'white'` (#fff・枠線あり)。省略時は `'white'` */
  color?: 'sub' | 'white'
  /** true にすると高さを 84px に固定する。省略時は false (高さは中身に合わせる) */
  list?: boolean
  /** カード内に表示する内容 */
  children?: ReactNode
}

/**
 * 土台となるカード (幅 359px / 角の半径 10px)。
 *
 * 高さは中身に合わせ、`list` を指定した場合は 84px に固定する。
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
 * - list?: boolean
 * - children?: ReactNode
 *
 * @example
 * <BaseCardComponent color="sub">カードの内容</BaseCardComponent>
 * <BaseCardComponent list>一覧の内容</BaseCardComponent>
 */
export default function BaseCardComponent({
  color = 'white',
  list = false,
  children,
}: Props) {
  const className = [styles.card, styles[color], list && styles.list].filter(Boolean).join(' ')

  return <div className={className}>{children}</div>
}
