import { useState, type ElementType, type ReactNode } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { tv } from 'tailwind-variants';

const navItem = tv({
  slots: {
    trigger:
      'w-full flex items-center px-3 py-2 rounded-lg gap-2 group cursor-pointer mb-1 transition-colors duration-300 ease-in-out hover:text-gray-200 hover:bg-gray-75 dark:text-gray-75 dark:hover:bg-gray-100',
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
  title: string;
  icon: ElementType;
  children?: ReactNode;
}

export function NavItem({ title, icon: Icon, children }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = children != null;

  const { trigger, mainIcon } = navItem({ hasChildren });

  if (!hasChildren) {
    return (
      <a href="#" className={trigger()}>
        <Icon className={mainIcon()} />
        <span>{title}</span>
      </a>
    );
  }

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className={trigger()}>
        <span className="flex items-center gap-2">
          <Icon className={mainIcon()} />
          <span className='text-sm font-medium text-gray-100 dark:text-white'>{title}</span>
        </span>

        <IoChevronBack size={16} className={`
            text-gray-100 dark:text-gray-75
            transition-transform duration-400 ease-in-out
            ${isOpen ? '-rotate-90' : 'rotate-0'}
          `} />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 flex flex-col pl-10 space-y-1 ${
          isOpen ? 'max-h-60' : 'max-h-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}