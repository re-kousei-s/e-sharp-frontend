/**
 * 共通色 (テーマカラー)。
 *
 * 色の値は colors.css の CSS 変数で定義していて、ここでは変数への参照 (`var(--color-main)` など) を返す。
 *
 * `color={colors.main}` のように指定して使う。
 *
 * CSS ファイルでは `var(--color-main)` のように CSS 変数で指定する。
 *
 * 色一覧:
 * - main: メインカラー
 * - sub: サブカラー
 * - text: 文字色
 * - background: 背景色
 * - title: タイトル色
 *
 * @example
 * <IconComponent src={image.account} color={colors.main} />
 */
export const colors = {
  main: 'var(--color-main)',
  sub: 'var(--color-sub)',
  text: 'var(--color-text)',
  background: 'var(--color-background)',
  title: 'var(--color-title)',
} as const
