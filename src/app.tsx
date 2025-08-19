import { Header } from './components/header';

import { LuChartColumn, LuUsers, LuFileText } from 'react-icons/lu';
import { PiStarFour } from 'react-icons/pi';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

 
export function App() {
  return(
    <>
    <div className="w-full h-screen grid grid-cols-[250px_auto] grid-rows-[60px_128px_1fr_64px] bg-background-800">
      {/* Brand */}
      <div className="flex items-center h-16 px-6 border-r-[0.8px] border-r-[rgb(229,231,235)] border-b-[0.8px] border-b-solid border-b-[rgb(229,231,235)] col-span-1 row-span-1">
        <MdOutlineArrowBackIos size={24}/>
        <MdOutlineArrowForwardIos size={24}/>
        <div className='ml-3'>
          <h1 className='text-xl font-bold text-gray-300'>CRM-PRO</h1>
          <p className='text-xs text-gray-90'>by PROVER</p>
        </div> 
      </div>
      
      <Header />

      {/* Menu */}
      <div className="flex items-center flex-col bg-background-900 text-center col-span-1 row-span-2 border-r-[0.8px] border-r-[rgb(229,231,235)]">
        <div className='flex items-start flex-col mt-6'>
          <a className='w-full flex items-center px-3 py-2 rounded-lg gap-2 group cursor-pointer mb-2 text-sm font-medium text-gray-100 transition-colors hover:text-gray-200 hover:bg-gray-75'>
            <LuChartColumn size={20} className='text-gray-100 transition-colors group-hover:text-gray-200'/>
            Dashboard
          </a>
          <a className='w-full flex items-center px-3 py-2 rounded-lg gap-2 group cursor-pointer mb-2 text-sm font-medium text-gray-100 transition-colors hover:text-gray-200 hover:bg-gray-75'>
            <LuChartColumn size={20} className='text-gray-100 transition-colors group-hover:text-gray-200'/>
            Dashboard Avançado
          </a>
          <a className='w-full flex items-center px-3 py-2 rounded-lg gap-2 group cursor-pointer mb-2 text-sm font-medium text-gray-100 transition-colors hover:text-gray-200 hover:bg-gray-75'>
            <LuUsers size={20} className='text-gray-100 transition-colors group-hover:text-gray-200'/>
            Leads
          </a>
          <a className='w-full flex items-center px-3 py-2 rounded-lg gap-2 group cursor-pointer mb-2 text-sm font-medium text-gray-100 transition-colors hover:text-gray-200 hover:bg-gray-75'>
            <LuFileText size={20} className='text-gray-100 transition-colors group-hover:text-gray-200'/>
            Dados
          </a>
          <a className='w-full flex items-center px-3 py-2 rounded-lg gap-2 group cursor-pointer mb-2 text-sm font-medium text-gray-100 transition-colors hover:text-gray-200 hover:bg-gray-75'>
            <PiStarFour size={20} className='text-gray-100 transition-colors group-hover:text-gray-200'/>
            Diagnóstico
          </a>
          <a className='w-full flex items-center px-3 py-2 rounded-lg gap-2 group cursor-pointer mb-2 text-sm font-medium text-gray-100 transition-colors hover:text-gray-200 hover:bg-gray-75'>
            <IoSettingsOutline size={20} className='text-gray-100 transition-colors group-hover:text-gray-200'/>
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
      </a>
    </div>

    </>
  );
}
