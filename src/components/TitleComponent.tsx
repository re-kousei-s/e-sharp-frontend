import styles from './TitleComponent.module.css'

type Props = {
  /** 見出しとして表示するテキスト */
  title: string
  /** 文字色。`'title'` (タイトルカラー) / `'white'` (#FFF)。省略時は `'title'` */
  color?: 'title' | 'white'
}

/**
 * ページ見出し (文字サイズ 24px / bold)。
 *
 * `<h1>` として描画する。
 *
 * 文字色はタイトルカラー / 白の 2 種類で、`color` で切り替える。
 *
 * 引数:
 * - title: string
 * - color?: 'title' | 'white'
 *
 * @example
 * <TitleComponent title="ホーム" />
 * <TitleComponent title="ホーム" color="white" />
 */
export default function TitleComponent({ title, color = 'title' }: Props) {
  return <h1 className={`${styles.heading} ${styles[color]}`}>{title}</h1>
}
