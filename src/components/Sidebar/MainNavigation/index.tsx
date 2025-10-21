import { IoSettingsOutline } from "react-icons/io5";
import { LuChartColumn, LuFileText, LuUsers } from "react-icons/lu";
import { NavItem } from "./NavItem";
import { Sublink } from "./Sublink";

const navigationLinks = [
  {
    title: 'Acesso',
    icon: LuChartColumn,
    sublinks: [
      { title: 'Usuários', href: '#' }
    ],
  },
  {
    title: 'Geral', 
    icon: LuUsers,
    sublinks: [
      { title: 'Vagas em tempo real', href: '#' },
      { title: 'Pré Leads', href: '#' },
      { title: 'Leads', href: '#' },
      { title: 'Clientes', href: '#' },
      { title: 'Atividades diarias', href: '#' },
    ],
  },
  {
    title: 'Gestão',
    icon: LuFileText,
    sublinks: [
      { title: 'Resumo de Atividades', href: '#' },
    ],
  },
  {
    title: 'Configurações',
    icon: IoSettingsOutline,
    sublinks: [
      { title: 'Areas de Atuação', href: '/configuracoes/area-de-atuacao' },
      { title: 'Cargos', href: '/configuracoes/cargos' },
      { title: 'Status Proposta', href: '/configuracoes/status-proposta' },
      { title: 'Tipo Documento', href: '/configuracoes/tipo-documento' },
      { title: 'Fase Venda', href: '/configuracoes/fase-venda' },
      { title: 'Feriados', href: '/configuracoes/feriados' },
      { title: 'Motivo Conclusão Venda', href: '/configuracoes/motivovenda' },
      { title: 'Motivo Recusa Proposta', href: '/configuracoes/motivorecusa' },
      { title: 'Status Pré Lead', href: '/configuracoes/preleadstatus' },
      { title: 'Equipes', href: '/configuracoes/equipes' },
      { title: 'Tipo de Reunião', href: '#' },
      { title: 'Organizações', href: '#' },
      { title: 'Tipo de Tarefa', href: '#' },
    ],
  },
]

interface MainNavigationProps {
  isOpen: boolean
}

export function MainNavigation({ isOpen }: MainNavigationProps) {
  return (
    <nav className="w-full px-2">
      {navigationLinks.map((link) => (
        <NavItem key={link.title} title={link.title} icon={link.icon} isOpen={isOpen}>
          {link.sublinks?.map((sublink) => (
            <Sublink key={sublink.title} href={sublink.href} isActive={false}>
              {sublink.title}
            </Sublink>
          ))} 
        </NavItem>
      ))}
    </nav>
  );
}