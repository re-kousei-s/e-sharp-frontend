import { colors } from '../styles/colors'
import IconComponent from './IconComponent'
import styles from './FooterMenuItemComponent.module.css'

type Props = {
  /** svg ファイルの URL */
  src: string
  /** アイコンの下に表示するガイドテキスト (13px) */
  label: string
  /** 選択中かどうか。true: 選択中 (メインカラー) / false: 未選択 (グレー)。省略時は false */
  selected?: boolean
  /** アイコンの縦横サイズ (px)。省略時は IconComponent の既定値 */
  iconSize?: number
}

/** バリアントごとの色 (アイコンとテキスト共通) */
const VARIANT_COLORS = {
  unselected: '#A5A5A5',
  selected: colors.main,
} as const

/**
 * フッターメニュー用の項目。
 *
 * アイコンの下にガイドテキストを 3px 空けて配置し、左右中央揃えにする。
 *
 * バリアントは未選択 / 選択中の 2 種類で、`selected` で切り替える。
 *
 * FooterMenuComponent の子として並べて使う。
 *
 * 引数:
 * - src: string
 * - label: string
 * - selected?: boolean
 * - iconSize?: number
 *
 * @example
 * <FooterMenuItemComponent src={image.アイコン名} label="アイコン下テキスト" />
 * <FooterMenuItemComponent src={image.アイコン名} label="アイコン下テキスト" selected />
 */
export default function FooterMenuItemComponent({
  src,
  label,
  selected = false,
  iconSize,
}: Props) {
  const color = VARIANT_COLORS[selected ? 'selected' : 'unselected']

  return (
    <div className={styles.item} style={{ color }}>
      <IconComponent src={src} color={color} size={iconSize} />
      <span className={styles.label}>{label}</span>
    </div>
  )
}
