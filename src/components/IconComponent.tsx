import type { CSSProperties, MouseEventHandler } from 'react'
import { colors } from '../styles/colors'
import styles from './IconComponent.module.css'

type Props = {
  /** svg ファイルの URL (例: `import plusIcon from '../assets/plus.svg'`) */
  src: string
  /** アイコンの色 (CSS の色指定: `'#fff'`, `'red'`, `'currentColor'` など)。省略時はサブカラー (colors.sub) */
  color?: string
  /** 縦横サイズ (px)。省略時は 39 */
  size?: number
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

const DEFAULT_SIZE = 39

/**
 * svg アイコン。
 *
 * `onClick` を指定する場合は、`aria-label` も必須。
 *
 * 引数:
 * - src: string
 * - color?: string
 * - size?: number
 * - onClick?: MouseEventHandler<HTMLButtonElement>
 * - aria-label?: string (onClick を指定する場合は必須)
 *
 * @example
 * <IconComponent src={image.アイコン名} color="デフォルト: サブカラー" size={デフォルト: 39px} />
 * <IconComponent src={image.アイコン名} onClick={クリックイベント} aria-label="概要" />
 */
export default function IconComponent({
  src,
  color = colors.sub,
  size = DEFAULT_SIZE,
  onClick,
  'aria-label': ariaLabel,
}: Props) {
  const style = {
    '--icon-src': `url("${src}")`,
    '--icon-color': color,
    '--icon-size': `${size}px`,
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
