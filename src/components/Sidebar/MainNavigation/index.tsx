import { IoSettingsOutline } from "react-icons/io5";
import { LuChartColumn, LuFileText, LuUsers } from "react-icons/lu";
import { NavItem } from "./NavItem";
import { Sublink } from "./Sublink";

export function MainNavigation() {
  return (
    <nav className="w-full px-2">
      <NavItem title="Acesso" icon={LuChartColumn}>
        <Sublink href="#">Usuários</Sublink>
      </NavItem>

      <NavItem title="Geral" icon={LuUsers}>
        <Sublink href="#" >Vagas em tempo real</Sublink>
        <Sublink href="#" >Pré Leads</Sublink>
        <Sublink href="#" >Leads</Sublink>
        <Sublink href="#" >Clientes</Sublink>
        <Sublink href="#" >Atividades diarias</Sublink>
      </NavItem>

      <NavItem title="Gestão" icon={LuFileText}>
        <Sublink href="#" >Resumo de Atividades</Sublink>
      </NavItem>

      <NavItem title="Configurações" icon={IoSettingsOutline}>
        <Sublink href="#" >Areas de Atuação</Sublink>
        <Sublink href="#" >Cargos</Sublink>
        <Sublink href="#" >Status Proposta</Sublink>
        <Sublink href="#" >Tipo Documento</Sublink>
        <Sublink href="#" >Fase Venda</Sublink>
        <Sublink href="#" >Feriados</Sublink>
        <Sublink href="#" >Motivo Conclusão Venda</Sublink>
        <Sublink href="#" >Motivo Recusa Proposta</Sublink>
        <Sublink href="#" >Status Pré Lead</Sublink>
        <Sublink href="#" >Equipes</Sublink>
        <Sublink href="#" >Tipo de Reunião</Sublink>
        <Sublink href="#" >Organizações</Sublink>
        <Sublink href="#" >Tipo de Tarefa</Sublink>
      </NavItem>
    </nav>
  );
}