import { MainNavigation } from "./MainNavigation";

export function Sidebar() {
  return(
    <aside className="flex items-center flex-col bg-background-900 text-center col-span-1 row-span-2 border-r-[0.8px] border-r-[rgb(229,231,235)]">
        <div className='flex items-start flex-col mt-6'>
          <MainNavigation />
        </div>
      </aside>
  );
}