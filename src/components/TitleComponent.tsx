import type { ReactNode } from 'react'
import styles from './TitleComponent.module.css'

type Props = {
  children: ReactNode
}

// ページ見出し (24px / bold)
export default function TitleComponent({ children }: Props) {
  return <h1 className={styles.heading}>{children}</h1>
}
