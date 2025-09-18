import { useState, useEffect } from 'react';
import { PiSun, PiBell, PiMoon } from 'react-icons/pi';

export function Header() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = window.document.documentElement;
    if(theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    } 
  }, [theme]);

  function handleThemeToggle() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <header className="h-16 w-full shadow-sm border-b-background-700 bg-white dark:bg-gray-150 border-b-[0.8px] border-b-[rgb(229,231,235)] dark:border-b-gray-125 flex justify-between items-center px-[4%] transition-colors duration-300 ease-in-out">
      
      <div className="flex items-center ">
      </div>
      <div className="flex items-center space-x-4">

        <button type='button' onClick={handleThemeToggle} className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] cursor-pointer'>
          {theme === 'light' ? (
            <PiSun size={20} className='text-sm font-medium text-gray-150'/>
          ) : (
            <PiMoon size={20} className='text-sm font-medium dark:text-white' />
          )}
        </button>

        <PiBell size={18} className='text-sm font-medium text-gray-150 dark:text-white'/>

      </div>

    </header>
  );
}
