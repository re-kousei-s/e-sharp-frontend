import { colors } from '../styles/colors'

/** アイコンに指定できる色の名前 */
export type IconColor = 'sub' | 'gray' | 'main' | 'text'

/** 色の名前と実際の色の対応 */
export const ICON_COLORS: Record<IconColor, string> = {
  sub: colors.sub,
  gray: '#A5A5A5',
  main: colors.main,
  text: colors.text,
}
