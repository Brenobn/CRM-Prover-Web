import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { Link } from "react-router-dom";

const sublinkStyles = tv({
  base: 'px-3 py-2 rounded-lg cursor-pointer transition-colors duration-300 ease-in-out text-left text-gray-300 text-sm hover:text-gray-200 hover:bg-gray-75 dark:text-white dark:hover:bg-gray-100 dark:hover:text-white whitespace-nowrap truncate',
  variants: {
    isActive: {
      true: 'bg-gray-75 dark:bg-gray-100 font-semibold',
      false: '',
    }
  },
  defaultVariants: {
    isActive: false,
  }
});

export interface SublinkProps {
  href: string;
  children: ReactNode; 
  isActive: boolean;
}

export function Sublink({ href, children, isActive }: SublinkProps) {
  return(
    <Link to={href} className={sublinkStyles({ isActive })}>
      {children}
    </Link>
  )
}