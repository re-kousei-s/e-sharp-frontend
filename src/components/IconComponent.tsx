import type { CSSProperties } from 'react'
import styles from './IconComponent.module.css'

type Props = {
  // svg ファイルの URL (例: import plusIcon from '../assets/plus.svg')
  src: string
  // アイコンの色 (CSS の色指定: '#fff', 'red', 'currentColor' など)
  color: string
  // 縦横サイズ (px)。省略時は 24
  size?: number
}

const DEFAULT_SIZE = 24

// svg アイコン。svg を形のマスクとして使い、color で塗りつぶす
export default function IconComponent({ src, color, size = DEFAULT_SIZE }: Props) {
  const style = {
    '--icon-src': `url("${src}")`,
    '--icon-color': color,
    '--icon-size': `${size}px`,
  } as CSSProperties

  // 装飾用のため支援技術からは隠す (意味は親要素の aria-label などで伝える)
  return <span className={styles.icon} style={style} aria-hidden="true" />
}
