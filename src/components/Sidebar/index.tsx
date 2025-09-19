import { MainNavigation } from "./MainNavigation";

interface SidebarProps {
  isOpen: boolean
}

export function Sidebar({ isOpen } : SidebarProps) {
  return(
    <div className='w-full'>
      <MainNavigation isOpen={isOpen} />
    </div>
  );
}