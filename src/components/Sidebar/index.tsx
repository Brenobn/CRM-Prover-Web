import { IoSettingsOutline } from "react-icons/io5";
import { LuChartColumn, LuFileText, LuUsers } from "react-icons/lu";
import { PiSparkle } from "react-icons/pi";

export function Sidebar() {
  return(
    <aside className="flex items-center flex-col bg-background-900 text-center col-span-1 row-span-2 border-r-[0.8px] border-r-[rgb(229,231,235)]">
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
            <PiSparkle size={20} className='text-gray-100 transition-colors group-hover:text-gray-200'/>
            Diagnóstico
          </a>
          <a className='w-full flex items-center px-3 py-2 rounded-lg gap-2 group cursor-pointer mb-2 text-sm font-medium text-gray-100 transition-colors hover:text-gray-200 hover:bg-gray-75'>
            <IoSettingsOutline size={20} className='text-gray-100 transition-colors group-hover:text-gray-200'/>
            Configurações
          </a>
        </div>
      </aside>
  );
}