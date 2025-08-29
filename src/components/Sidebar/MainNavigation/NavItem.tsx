import { IoChevronDown } from 'react-icons/io5';
import { type ElementType } from 'react';

export interface NavItemProps {
  title: string
  icon: ElementType
}

export function NavItem({ title, icon: Icon }: NavItemProps) {
  return(
    <a className='w-full flex items-center px-3 py-2 rounded-lg gap-2 group cursor-pointer mb-2  transition-colors hover:text-gray-200 hover:bg-gray-75'>
    <Icon className="h-5 w-5 text-gray-100" />
    <span className='text-sm font-medium text-gray-100'>
      {title}
    </span>
    <IoChevronDown className='ml-auto h-5 w-5 text-gray-100' />
    </a>
  );
}