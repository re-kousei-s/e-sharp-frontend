import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './RoundButtonComponent.module.css'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** 中央に表示するアイコン (IconComponent や svg 要素など) */
  icon: ReactNode
  /** スクリーンリーダー向けのラベル (アイコンのみで文字がないため必須) */
  'aria-label': string
}

/**
 * 丸ボタン (縦横 38px)。
 *
 * 中央に `icon` で渡したアイコンを配置する。
 *
 * `onClick` など通常の button 属性もそのまま指定できる。
 *
 * `type` の既定値は `button`。
 *
 * 引数:
 * - icon: ReactNode
 * - aria-label: string
 * - その他の button 属性: ButtonHTMLAttributes<HTMLButtonElement> (children を除く)
 *
 * @example
 * <RoundButtonComponent
 *   aria-label="追加"
 *   onClick={handleAdd}
 *   icon={<IconComponent src={plusIcon} color="#fff" />}
 * />
 */
export default function RoundButtonComponent({ icon, className, ...rest }: Props) {
  return (
    <button
      type="button"
      {...rest}
      className={className ? `${styles.button} ${className}` : styles.button}
    >
      {icon}
    </button>
  )
}
