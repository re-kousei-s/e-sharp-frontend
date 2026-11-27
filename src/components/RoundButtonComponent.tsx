import type { ButtonHTMLAttributes } from 'react'
import IconComponent, { type IconSize } from './IconComponent'
import styles from './RoundButtonComponent.module.css'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** 中央に表示するアイコンの svg (例: `image.add`) */
  src: string
  /** アイコンのサイズ。`'small'` (24px) / `'large'` (39px)。省略時は `'small'` */
  iconSize?: IconSize
  /** スクリーンリーダー向けのラベル (アイコンのみで文字がないため必須) */
  'aria-label': string
}

/**
 * 丸ボタン (縦横 38px / 背景色はサブカラー)。
 *
 * 中央に `src` で指定したアイコンを配置する (内部で IconComponent を使用)。
 *
 * アイコンの色は文字色 (colors.text) / 既定サイズは small (24px) (`iconSize` で変更可能)。
 *
 * `onClick` など通常の button 属性もそのまま指定できる。
 *
 * `type` の既定値は `button`。
 *
 * 引数:
 * - src: string
 * - iconSize?: 'small' | 'large'
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
  iconSize = 'small',
  className,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      {...rest}
      className={className ? `${styles.button} ${className}` : styles.button}
    >
      <IconComponent src={src} color="text" size={iconSize} />
    </button>
  )
}
