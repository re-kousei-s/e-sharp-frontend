import { createBrowserRouter } from 'react-router'
import RootLayout from '../layouts/RootLayout'
import HomePage from '../pages/HomePage'

// アプリ全体のルート定義
// ページを追加するときは children に { path: 'xxx', element: <XxxPage /> } を追加する
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
    ],
  },
])
