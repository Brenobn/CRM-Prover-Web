import { useState, type ElementType, type ReactNode } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { tv } from 'tailwind-variants';

// 1. Definimos todas as variantes de estilo do nosso componente aqui
const navItem = tv({
  // 'slots' nos permite definir classes para diferentes partes do componente
  slots: {
    trigger: // O elemento principal clicável (<a> ou <button>)
      'w-full flex items-center px-3 py-2 rounded-lg gap-2 group cursor-pointer mb-1 transition-colors hover:text-gray-200 hover:bg-gray-75',
    icon: // O ícone de chevron
      'text-gray-100 transition-transform duration-300',
  },
  // 'variants' define as classes condicionais
  variants: {
    hasChildren: {
      true: {
        // Se hasChildren for true, o trigger recebe 'justify-between'
        trigger: 'justify-between',
      },
    },
    isOpen: {
      true: {
        // Se isOpen for true, o ícone de chevron gira
        icon: 'rotate-90',
      },
    },
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

  // 2. Chamamos a função com as props/estado atuais para obter as classes corretas
  const { trigger, icon } = navItem({ hasChildren, isOpen });

  if (!hasChildren) {
    return (
      // 3. Aplicamos a classe do slot 'trigger'
      <a href="#" className={trigger()}>
        <Icon className="h-5 w-5 text-gray-100" />
        <span className='text-sm font-medium text-gray-100'>{title}</span>
      </a>
    );
  }

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className={trigger()}>
        <span className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-gray-100" />
          <span className='text-sm font-medium text-gray-100'>{title}</span>
        </span>
        {/* 3. Aplicamos a classe do slot 'icon' */}
        <IoChevronDown size={16} className={icon()} />
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