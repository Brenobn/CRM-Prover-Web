import { useState, type ElementType, type ReactNode } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { tv } from 'tailwind-variants';

const navItem = tv({
  slots: {
    trigger:
      'w-full flex items-center px-3 py-2 rounded-lg gap-2 group cursor-pointer mb-1 transition-colors duration-300 ease-in-out hover:text-gray-200 hover:bg-gray-75 dark:hover:text-white dark:text-gray-75 dark:hover:bg-gray-100',
    mainIcon: 'h-5 w-5 text-gray-100 dark:text-gray-75',
  },
  variants: {
    hasChildren: {
      true: {
        trigger: 'justify-between',
      },
    },
    isOpen: {},
  },
});

export interface NavItemProps {
  title: string
  icon: ElementType
  children?: ReactNode
  isOpen: boolean
}

export function NavItem({ title, icon: Icon, children, isOpen: isSidebarOpen }: NavItemProps) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const hasChildren = children != null;

  const { trigger, mainIcon } = navItem({ hasChildren });

  if (!hasChildren) {
    return (
      <a href="#" className={trigger()}>
        <Icon className={mainIcon()} />
        {isSidebarOpen && <span className='text-sm font-medium'>{title}</span>}
      </a>
    );
  }

  return (
    <div>
      <button 
        onClick={() => { if (isSidebarOpen) setIsSubMenuOpen(!isSubMenuOpen); }} 
        className={trigger()}
      >
        <span className="flex items-center gap-3">
          <Icon className={mainIcon()} />
          {isSidebarOpen && <span className="text-sm font-medium">{title}</span>}
        </span>
        {hasChildren && isSidebarOpen && (
          <IoChevronBack size={16} className={`transition-transform duration-300 ${isSubMenuOpen ? '-rotate-90' : 'rotate-0'}`} />
        )}
      </button>

      {isSidebarOpen && (
        <div
          className={`overflow-hidden transition-all duration-300 flex flex-col pl-10 space-y-1 ${
            isSubMenuOpen ? 'max-h-60' : 'max-h-0'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}