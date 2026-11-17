import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './RoundButtonComponent.module.css'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  // 中央に表示するアイコン (svg 要素など)
  icon: ReactNode
  // アイコンのみで文字がないため、スクリーンリーダー向けのラベルを必須にする
  'aria-label': string
}

// 丸ボタン (38px × 38px / 中央にアイコン)
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
