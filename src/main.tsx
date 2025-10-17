import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import { App } from './app'
import { SiginIn } from './pages/SiginIn'
import { SiginUp } from './pages/SiginUp'
import { ActivityArea } from './pages/ActivityArea'
import { Positions } from './pages/Positions'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AuthProvider } from './hooks/auth'
import { ThemeProvider } from './hooks/theme'

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
        element: <ActivityArea />,
      },
      {
        path: 'configuracoes/cargos',
        element: <Positions />,
      }
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
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
