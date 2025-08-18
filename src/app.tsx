import { Header } from './components/header';

import { LuChartColumn, LuUsers, LuFileText } from 'react-icons/lu';
import { PiStarFour } from 'react-icons/pi';
import { IoSettingsOutline } from 'react-icons/io5';

 
export function App() {
  return(
    <>
    <div className="w-full h-screen grid grid-cols-[250px_auto] grid-rows-[70px_128px_1fr_64px] bg-background-800">
      {/* Brand */}
      <div className="flex justify-center items-center h-[10vh] border-r-[0.8px] border-r-[rgb(229,231,235)] border-b-[0.8px] border-b-solid border-b-[rgb(229,231,235)] col-span-1 row-span-1"> 
      </div>
      
      <Header />

      {/* Menu */}
      <div className="flex items-center flex-col bg-background-900 text-center col-span-1 row-span-2 border-r-[0.8px] border-r-[rgb(229,231,235)]">
        <div className='flex items-start flex-col mt-10'>
          <a className='flex justify-center gap-2 group cursor-pointer mb-4 text-sm font-medium text-gray-100 transition-colors hover:text-gray-200'>
            <LuChartColumn size={18} className='text-gray-100 transition-colors group-hover:text-gray-200'/>
            Dashboard
          </a>
          <a className='flex justify-center gap-2 group cursor-pointer mb-4 text-sm font-medium text-gray-100 transition-colors hover:text-gray-200'>
            <LuChartColumn size={18} className='text-gray-100 transition-colors group-hover:text-gray-200'/>
            Dashboard Avançado
          </a>
          <a className='flex justify-center gap-2 group cursor-pointer mb-4 text-sm font-medium text-gray-100 transition-colors hover:text-gray-200'>
            <LuUsers size={18} className='text-gray-100 transition-colors group-hover:text-gray-200'/>
            Leads
          </a>
          <a className='flex justify-center gap-2 group cursor-pointer mb-4 text-sm font-medium text-gray-100 transition-colors hover:text-gray-200'>
            <LuFileText size={18} className='text-gray-100 transition-colors group-hover:text-gray-200'/>
            Dados
          </a>
          <a className='flex justify-center gap-2 group cursor-pointer mb-4 text-sm font-medium text-gray-100 transition-colors hover:text-gray-200'>
            <PiStarFour size={18} className='text-gray-100 transition-colors group-hover:text-gray-200'/>
            Diagnóstico
          </a>
          <a className='flex justify-center gap-2 group cursor-pointer mb-4 text-sm font-medium text-gray-100 transition-colors hover:text-gray-200'>
            <IoSettingsOutline size={18} className='text-gray-100 transition-colors group-hover:text-gray-200'/>
            Configurações
          </a>
        </div>
      </div>

      {/* Search */}
      <div className="pt-16 px-16 col-span-1 row-span-1">
        <input type="text" />
      </div>

      {/* Content */}
      <div className="px-16 overflow-y-auto col-span-1 row-span-2">
        <h1></h1>
      </div>

      {/* NewNote */}
      <a
        href="#"
        className="flex items-center justify-center border-t-[0.8px] border-t-[rgb(229,231,235)] border-r-[0.8px] border-r-[rgb(229,231,235)] col-span-1 row-span-1"
      >
        Criar nota
      </a>
    </div>

    </>
  );
}
