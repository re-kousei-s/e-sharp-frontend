import type { ButtonHTMLAttributes } from 'react'
import IconComponent from './IconComponent'
import { colors } from '../styles/colors'
import styles from './RoundButtonComponent.module.css'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** 中央に表示するアイコンの svg (例: `image.add`) */
  src: string
  /** アイコンの縦横サイズ (px)。省略時は 24 */
  iconSize?: number
  /** スクリーンリーダー向けのラベル (アイコンのみで文字がないため必須) */
  'aria-label': string
}

const DEFAULT_ICON_SIZE = 24

/**
 * 丸ボタン (縦横 38px / 背景色はサブカラー)。
 *
 * 中央に `src` で指定したアイコンを配置する (内部で IconComponent を使用)。
 *
 * アイコンの色は文字色 (colors.text) / 既定サイズは 24px (`iconSize` で変更可能)。
 *
 * `onClick` など通常の button 属性もそのまま指定できる。
 *
 * `type` の既定値は `button`。
 *
 * 引数:
 * - src: string
 * - iconSize?: number
 * - aria-label(概要): string
 * - その他の button 属性: ButtonHTMLAttributes<HTMLButtonElement> (children を除く)
 *
 * @example
 * <RoundButtonComponent
 *   src={image.アイコン名}
 *   aria-label="追加"
 *   onClick={クリックイベント}
 * />
 */
export default function RoundButtonComponent({
  src,
  iconSize = DEFAULT_ICON_SIZE,
  className,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      {...rest}
      className={className ? `${styles.button} ${className}` : styles.button}
    >
      <IconComponent src={src} color={colors.text} size={iconSize} />
    </button>
  )
}
