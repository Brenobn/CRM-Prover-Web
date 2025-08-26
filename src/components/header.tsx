import { PiSparkle, PiSun, PiBell } from 'react-icons/pi';

export function Header() {
  return (
    <header className="h-16 w-full shadow-sm border-b-background-700 border-b-[0.8px] border-b-[rgb(229,231,235)] flex justify-between items-center px-[4%]">
      
      <div className="flex items-center ">
        <h2 className="text-lg font-semibold text-gray-300">
          Sistema de Gestão - PROVER
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        
        <span className="flex items-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 border-transparent bg-gray-75">
          <PiSparkle />
          IA Ativa
        </span>

        <PiSun />

        <PiBell />

      </div>

    </header>
  );
}
