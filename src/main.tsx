import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import { App } from './app'
import { SiginIn } from './pages/SiginIn'
import { SiginUp } from './pages/SiginUp'
import { ActitvityArea } from './pages/ActivityArea'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AuthProvider } from './hooks/auth'

const router = createBrowserRouter([
  {
    path: '/siginin',
    element: <SiginIn />,
  },
  {
    path: '/siginup',
    element: <SiginUp />
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'configuracoes/area-de-atuacao',
        element: <ActitvityArea />,
      },
    ],
  },
  
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
