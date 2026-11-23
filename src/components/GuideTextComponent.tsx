import styles from './GuideTextComponent.module.css'

type Props = {
  /** 表示するガイドテキスト */
  text: string
}

/**
 * ガイドテキスト (文字サイズ 13px / bold / 文字色 #69655F)。
 *
 * 画面の見出しの下などに置く、操作や内容を案内する短い説明文。
 *
 * `<p>` として描画する。
 *
 * 引数:
 * - text: string
 *
 * @example
 * <GuideTextComponent text="ここに表示文字列" />
 */
export default function GuideTextComponent({ text }: Props) {
  return <p className={styles.text}>{text}</p>
}
