import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import { App } from './app'
import { SiginIn } from './pages/SiginIn/SiginIn'
import { SiginUp } from './pages/SiginUp'
import { ActivityArea } from './pages/ActivityArea'
import { Holidays } from './pages/Holidays'
import { Positions } from './pages/Positions'
import { SaleConclusionReason } from './pages/SaleConclusionReason'
import { ProposalRefusalReason } from './pages/ProposalRefusalReason'
import { PreLeadStatus } from './pages/PreLeadStatus'
import { Teams } from './pages/Teams'
import { Organizations } from './pages/Organizations'
import { MeetingType } from './pages/MeetingType'
import { SalesPhase } from './pages/SalesPhase'
import { ProposalStatus } from './pages/ProposalStatus'
import { DocumentType } from './pages/DocumentType'
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
      },
      {
        path: 'configuracoes/status-proposta',
        element: <ProposalStatus />,
      },
      {
        path: 'configuracoes/tipo-documento',
        element: <DocumentType />
      },
      {
        path: 'configuracoes/fase-venda',
        element: <SalesPhase />
      },
      {
        path: 'configuracoes/feriados',
        element: <Holidays />
      },
      {
        path: 'configuracoes/motivovenda',
        element: <SaleConclusionReason />
      },
      {
        path: 'configuracoes/motivorecusa',
        element: <ProposalRefusalReason />
      },
      {
        path: 'configuracoes/preleadstatus',
        element: <PreLeadStatus />
      },
      {
        path: 'configuracoes/equipes',
        element: <Teams />
      },
      {
        path: 'configuracoes/tipodereuniao',
        element: <MeetingType />
      },
      {
        path: 'configuracoes/organizacoes',
        element: <Organizations />
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
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
