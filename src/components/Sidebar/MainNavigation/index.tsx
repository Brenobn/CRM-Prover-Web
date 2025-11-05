import { IoSettingsOutline } from "react-icons/io5";
import { LuChartColumn, LuFileText, LuUsers } from "react-icons/lu";
import { NavItem } from "./NavItem";
import { Sublink } from "./Sublink";
import { useLocation } from "react-router-dom";

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
      { title: 'Clientes', href: '/geral/clientes' },
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
      { title: 'Tipo de Reunião', href: '/configuracoes/tipodereuniao' },
      { title: 'Organizações', href: '/configuracoes/organizacoes' },
      { title: 'Tipo de Tarefa', href: '/configuracoes/tipotarefa' },
    ],
  },
]

interface MainNavigationProps {
  isOpen: boolean
}

export function MainNavigation({ isOpen }: MainNavigationProps) {
  const location = useLocation();
  const pathname = location.pathname

  return (
    <nav className="w-full px-2">
      {navigationLinks.map((link) => {
        const isConfigSection = link.title === "Configurações";
        const shouldBeOpen = isConfigSection && pathname.startsWith("/configuracoes");

        return (
          <NavItem 
            key={link.title}
            title={link.title}
            icon={link.icon}
            isOpen={isOpen}
            defaultopen={shouldBeOpen}
          >
            {link.sublinks?.map((sublink) => (
              <Sublink
                key={sublink.title}
                href={sublink.href}
                isActive={pathname === sublink.href}
              >
                {sublink.title}
              </Sublink>
            ))}
          </NavItem>
        )
      })}
    </nav>
  );
}