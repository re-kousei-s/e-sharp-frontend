import styles from './TitleComponent.module.css'

type Props = {
  /** 見出しとして表示するテキスト */
  title: string
}

/**
 * ページ見出し (文字サイズ 24px / bold)。
 *
 * `<h1>` として描画する。
 *
 * 引数:
 * - title: string
 *
 * @example
 * <TitleComponent title="ホーム" />
 */
export default function TitleComponent({ title }: Props) {
  return <h1 className={styles.heading}>{title}</h1>
}
