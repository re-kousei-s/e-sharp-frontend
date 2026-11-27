import IconComponent, { type IconSize } from './IconComponent'
import { ICON_COLORS } from './iconColors'
import styles from './FooterMenuItemComponent.module.css'

type Props = {
  /** svg ファイルの URL */
  src: string
  /** アイコンの下に表示するガイドテキスト (13px) */
  label: string
  /** 選択中かどうか。true: 選択中 (メインカラー) / false: 未選択 (グレー)。省略時は false */
  selected?: boolean
  /** アイコンのサイズ。`'small'` (24px) / `'large'` (39px)。省略時は `'large'` */
  iconSize?: IconSize
}

/** バリアントごとの色 (アイコンとテキスト共通) */
const VARIANT_COLORS = {
  unselected: 'gray',
  selected: 'main',
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
 * - iconSize?: 'small' | 'large'
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
    <div className={styles.item} style={{ color: ICON_COLORS[color] }}>
      <IconComponent src={src} color={color} size={iconSize} />
      <span className={styles.label}>{label}</span>
    </div>
  )
}
