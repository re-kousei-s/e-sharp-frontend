import type { CSSProperties } from 'react'
import { colors } from '../styles/colors'
import styles from './IconComponent.module.css'

type Props = {
  /** svg ファイルの URL (例: `import plusIcon from '../assets/plus.svg'`) */
  src: string
  /** アイコンの色 (CSS の色指定: `'#fff'`, `'red'`, `'currentColor'` など)。省略時はサブカラー (colors.sub) */
  color?: string
  /** 縦横サイズ (px)。省略時は 39 */
  size?: number
}

const DEFAULT_SIZE = 39

/**
 * svg アイコン。
 *
 * 引数:
 * - src: string
 * - color?: string
 * - size?: number
 *
 * @example
 * <IconComponent src={image.アイコン名} color="デフォルト: サブカラー" size={デフォルト: 39px} />
 */
export default function IconComponent({ src, color = colors.sub, size = DEFAULT_SIZE }: Props) {
  const style = {
    '--icon-src': `url("${src}")`,
    '--icon-color': color,
    '--icon-size': `${size}px`,
  } as CSSProperties

  return <span className={styles.icon} style={style} aria-hidden="true" />
}
