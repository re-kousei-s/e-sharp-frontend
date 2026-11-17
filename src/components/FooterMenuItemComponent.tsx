import IconComponent from './IconComponent'
import styles from './FooterMenuItemComponent.module.css'

type Props = {
  /** svg ファイルの URL */
  src: string
  /** アイコンの下に表示するガイドテキスト (13px) */
  label: string
  /** アイコンとテキスト共通の色 */
  color: string
  /** アイコンの縦横サイズ (px)。省略時は IconComponent の既定値 */
  iconSize?: number
}

/**
 * フッターメニュー用の項目。
 *
 * アイコンの下にガイドテキストを間隔なしで配置し、左右中央揃えにする。
 *
 * FooterMenuComponent の子として並べて使う。
 *
 * 引数:
 * - src: string
 * - label: string
 * - color: string
 * - iconSize?: number
 *
 * @example
 * <FooterMenuItemComponent src={homeIcon} label="ホーム" color="#333" />
 */
export default function FooterMenuItemComponent({ src, label, color, iconSize }: Props) {
  return (
    <div className={styles.item} style={{ color }}>
      <IconComponent src={src} color={color} size={iconSize} />
      <span className={styles.label}>{label}</span>
    </div>
  )
}
