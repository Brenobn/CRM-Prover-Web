import { Toaster } from 'sonner'
import { Header } from './components/header'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'
import { Sidebar } from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Menu } from 'lucide-react'

export function App() {
  const [isSidebarPinned, setIsSidebarPinned] = useState(true)
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)
  const isSidebarOpen = isSidebarPinned || isSidebarHovered

 
  return (
    <div className="min-h-screen bg-white dark:bg-gray-300" >
      
      <div className={`fixed top-0 bottom-0 left-0 flex flex-col h-screen bg-white dark:bg-gray-150 transition-colors duration-300 ease-in-out bg-background-900 border-r border-[rgb(229,231,235)] dark:border-r-gray-125 
      ${isSidebarOpen ? 'w-[250px]' : 'w-[72px]'}`}
        onMouseEnter={() => {if (!isSidebarPinned) setIsSidebarHovered(true) }}
        onMouseLeave={() => { if (!isSidebarPinned) setIsSidebarHovered(false) }}
      >
      
        <div className="flex items-center bg-white dark:bg-gray-150 transition-colors duration-300 ease-in-out h-16 px-6 border-b border-solid border-[rgb(229,231,235)] dark:border-gray-125">
          {isSidebarOpen ? (
          <> 
            <MdOutlineArrowBackIos size={24} />
            <MdOutlineArrowForwardIos size={24} />
            <div className='ml-3'>
              <a href='/' className='text-xl font-bold text-gray-300 dark:text-white transition-colors duration-300 ease-in-out cursor-pointer'>
                CRM-PRO
              </a>
              <p className='text-xs text-gray-90'>by PROVER</p>
            </div>
          </>  
          ) : (
            <div className="flex justify-center w-full">
              <MdOutlineArrowBackIos size={24} className='shrink-0' />
              <MdOutlineArrowForwardIos size={24} className='shrink-0' />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-6 sidebar-scroll">
          <Sidebar isOpen={isSidebarOpen} />
        </div>

        <div className="p-4 bg-white dark:bg-gray-150 transition-colors duration-300 ease-in-out border-t border-[rgb(229,231,235)] dark:border-gray-125">
          <div className='flex items-center'>
            <span className='relative flex size-8 shrink-0 overflow-hidden rounded-full h-9 w-9'>
              <div className='bg-blue-400 h-full w-full rounded-full flex items-center justify-center text-white text-sm font-medium'>P</div>
            </span>
            {isSidebarOpen && (
              <div className='ml-3'>
                <h4 className='text-sm font-medium text-gray-300 dark:text-white transition-colors duration-300 ease-in-out'>PROVER Team</h4>
                <p className='text-xs text-gray-90'>Soluções em TI</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`fixed top-0 right-0 z-10 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'left-[250px]' : 'left-[72px]'}`}>
        <Header>
          <button
            onClick={() => setIsSidebarPinned(!isSidebarPinned)}
            className='rounded-md hover:bg-muted'  
          >
            <Menu size={20} className='dark:text-white' />
          </button>
        </Header>
      </div>
      <main className={`pt-16 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'pl-[250px]' : 'pl-[72px]'}`}>
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
      <Toaster richColors />
    </div>
  );
}