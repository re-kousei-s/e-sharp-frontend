import type { CSSProperties, MouseEventHandler } from 'react'
import { ICON_COLORS, type IconColor } from './iconColors'
import styles from './IconComponent.module.css'

/** アイコンのサイズ (small: 24px / large: 39px) */
export type IconSize = 'small' | 'large'

const ICON_SIZES: Record<IconSize, number> = {
  small: 24,
  large: 39,
}

type Props = {
  /** svg ファイルの URL (例: `import plusIcon from '../assets/plus.svg'`) */
  src: string
  /** アイコンの色。`'sub'` (サブカラー) / `'gray'` (#A5A5A5) / `'main'` (メインカラー) / `'text'` (文字色)。省略時は `'sub'` */
  color?: IconColor
  /** サイズ。`'small'` (24px) / `'large'` (39px)。省略時は `'large'` */
  size?: IconSize
} & (
  | {
      onClick?: undefined
      'aria-label'?: undefined
    }
  | {
      /** クリックしたときの処理。指定するとアイコンがボタンとして描画される */
      onClick: MouseEventHandler<HTMLButtonElement>
      /** スクリーンリーダー向けのラベル (onClick を指定する場合は必須) */
      'aria-label': string
    }
)

/**
 * svg アイコン。
 *
 * `onClick` を指定する場合は、`aria-label` も必須。
 *
 * 引数:
 * - src: string
 * - color?: 'sub' | 'gray' | 'main' | 'text'
 * - size?: 'small' | 'large'
 * - onClick?: MouseEventHandler<HTMLButtonElement>
 * - aria-label?: string (onClick を指定する場合は必須)
 *
 * @example
 * <IconComponent src={image.アイコン名} color="sub / gray / main / text (デフォルト: sub)" size="small: 24px / large: 39px (デフォルト: large)" />
 * <IconComponent src={image.アイコン名} onClick={クリックイベント} aria-label="概要" />
 */
export default function IconComponent({
  src,
  color = 'sub',
  size = 'large',
  onClick,
  'aria-label': ariaLabel,
}: Props) {
  const style = {
    '--icon-src': `url("${src}")`,
    '--icon-color': ICON_COLORS[color],
    '--icon-size': `${ICON_SIZES[size]}px`,
  } as CSSProperties

  if (onClick) {
    return (
      <button type="button" className={styles.button} onClick={onClick} aria-label={ariaLabel}>
        <span className={styles.icon} style={style} aria-hidden="true" />
      </button>
    )
  }

  return <span className={styles.icon} style={style} aria-hidden="true" />
}
