import IconComponent from './IconComponent'
import styles from './FooterMenuItemComponent.module.css'

type Props = {
  // svg ファイルの URL
  src: string
  // アイコンの下に表示するガイドテキスト
  label: string
  // アイコンとテキスト共通の色
  color: string
  // アイコンの縦横サイズ (px)。省略時は IconComponent の既定値
  iconSize?: number
}

// フッターメニュー用の項目 (アイコン + 下にガイドテキスト / 左右中央揃え)
export default function FooterMenuItemComponent({ src, label, color, iconSize }: Props) {
  return (
    <div className={styles.item} style={{ color }}>
      <IconComponent src={src} color={color} size={iconSize} />
      <span className={styles.label}>{label}</span>
    </div>
  )
}
