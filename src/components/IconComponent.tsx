import type { CSSProperties } from 'react'
import styles from './IconComponent.module.css'

type Props = {
  /** svg ファイルの URL (例: `import plusIcon from '../assets/plus.svg'`) */
  src: string
  /** アイコンの色 (CSS の色指定: `'#fff'`, `'red'`, `'currentColor'` など) */
  color: string
  /** 縦横サイズ (px)。省略時は 39 */
  size?: number
}

const DEFAULT_SIZE = 39

/**
 * svg アイコン。
 *
 * svg を形のマスクとして使い、`color` で塗りつぶす。
 *
 * 単色表示のみ対応で、svg 内の複数色やグラデーションは 1 色になる。
 *
 * 装飾用として支援技術からは隠す。
 *
 * 引数:
 * - src: string
 * - color: string
 * - size?: number
 *
 * @example
 * <IconComponent src={plusIcon} color="#fff" size={32} />
 */
export default function IconComponent({ src, color, size = DEFAULT_SIZE }: Props) {
  const style = {
    '--icon-src': `url("${src}")`,
    '--icon-color': color,
    '--icon-size': `${size}px`,
  } as CSSProperties

  return <span className={styles.icon} style={style} aria-hidden="true" />
}
