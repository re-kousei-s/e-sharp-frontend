import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  // このファイルを編集して保存すると、ブラウザが自動で更新されます (ホットリロード)
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>React + TypeScript + Docker 🚀</h1>
      <button onClick={() => setCount((c) => c + 1)}>count: {count}</button>
    </main>
  )
}
