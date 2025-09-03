import { IoSettingsOutline } from "react-icons/io5";
import { LuChartColumn, LuFileText, LuUsers } from "react-icons/lu";
import { NavItem } from "./NavItem";
import type { ReactNode } from "react";

interface SublinkProps {
  href: string;
  children: ReactNode; // Usar ReactNode é mais flexível que string
  className?: string; // O '?' torna a prop opcional, o que é ideal aqui
}

function Sublink({ href, children, className }: SublinkProps) {
  const finalClassName = `text-left text-gray-300 text-sm hover:text-gray-100 ${className || ''}`;

  return(
    <a href={href} className={finalClassName}>
      {children}
    </a>
  )
}

export function MainNavigation() {
  return (
    <nav className="w-full px-2">
      {/* Dashboard com sub-itens */}
      <NavItem title="Acesso" icon={LuChartColumn}>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Usuários</Sublink>
      </NavItem>

      {/* Leads com sub-itens */}
      <NavItem title="Geral" icon={LuUsers}>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Vagas em tempo real</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Pré Leads</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Leads</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Clientes</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Atividades diarias</Sublink>
      </NavItem>

      {/* Itens sem sub-itens */}
      <NavItem title="Gestão" icon={LuFileText}>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Resumo de Atividades</Sublink>
      </NavItem>

      {/* Configurações com sub-itens */}
      <NavItem title="Configurações" icon={IoSettingsOutline}>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Areas de Atuação</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Cargos</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Status Proposta</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Tipo Documento</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Fase Venda</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Feriados</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Motivo Conclusão Venda</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Motivo Recusa Proposta</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Status Pré Lead</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Equipes</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Tipo de Reunião</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Organizações</Sublink>
        <Sublink href="#" className="px-3 py-2 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-75">Tipo de Tarefa</Sublink>
      </NavItem>
    </nav>
  );
}