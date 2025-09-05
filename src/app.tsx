// Em App.tsx

import { Header } from './components/header';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import { Sidebar } from './components/Sidebar';

export function App() {
  return (
    // 1. GRID para a estrutura principal: uma coluna de 250px e o resto (1fr)
    <div className="grid grid-cols-[250px_1fr] h-screen bg-white dark:bg-gray-300 transition-colors duration-300 ease-in-out">
      
      {/* ===== COLUNA DA ESQUERDA (SIDEBAR COMPLETA) ===== */}
      {/* 2. FLEXBOX para organizar a coluna verticalmente */}
      <div className="flex flex-col h-screen bg-white dark:bg-gray-150 transition-colors duration-300 ease-in-out bg-background-900 border-r border-[rgb(229,231,235)] dark:border-r-gray-125">
        
        {/* Seção BRAND (Topo Fixo) */}
        <div className="flex items-center bg-white dark:bg-gray-150 transition-colors duration-300 ease-in-out h-16 px-6 border-b border-solid border-[rgb(229,231,235)] dark:border-gray-125">
          <MdOutlineArrowBackIos size={24} />
          <MdOutlineArrowForwardIos size={24} />
          <div className='ml-3'>
            <h1 className='text-xl font-bold text-gray-300 dark:text-white transition-colors duration-300 ease-in-out'>CRM-PRO</h1>
            <p className='text-xs text-gray-90'>by PROVER</p>
          </div>
        </div>

        {/* Seção MENU (Meio Rolável) */}
        {/* A div pai controla o crescimento e a rolagem */}
        <div className="flex-1 overflow-y-auto py-6">
          <Sidebar />
        </div>

        {/* Seção NEWNOTE (Rodapé Fixo) */}
        <div className="p-4 bg-white dark:bg-gray-150 transition-colors duration-300 ease-in-out border-t border-[rgb(229,231,235)] dark:border-gray-125">
          <div className='flex items-center'>
            <span className='relative flex size-8 shrink-0 overflow-hidden rounded-full h-9 w-9'>
              <div className='bg-blue-400 h-full w-full rounded-full flex items-center justify-center text-white text-sm font-medium'>P</div>
            </span>
            <div className='ml-3'>
              <h4 className='text-sm font-medium text-gray-300 dark:text-white transition-colors duration-300 ease-in-out'>PROVER Team</h4>
              <p className='text-xs text-gray-90'>Soluções em TI</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== COLUNA DA DIREITA (CONTEÚDO PRINCIPAL) ===== */}
      {/* 3. A área principal que terá sua própria rolagem */}
      <main className="overflow-y-auto">
        {/* Você pode ter um grid interno aqui se quiser, ou só empilhar o conteúdo */}
        <Header />

        <div className="px-16">
          {/* Adicione conteúdo aqui para testar o scroll da página */}
        </div>
      </main>
    </div>
  );
}