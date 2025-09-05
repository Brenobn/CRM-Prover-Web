import type { ReactNode } from "react";

export interface SublinkProps {
  href: string;
  children: ReactNode; 
}

export function Sublink({ href, children }: SublinkProps) {
  return(
    <a href={href} className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75 dark:text-white dark:hover:bg-gray-100 dark:hover:text-white transition-colors duration-300 ease-in-out text-left text-gray-300 text-sm">
      {children}
    </a>
  )
}