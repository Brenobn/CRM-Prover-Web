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
      { title: 'Cargos', href: '#' },
      { title: 'Status Proposta', href: '#' },
      { title: 'Tipo Documento', href: '#' },
      { title: 'Fase Venda', href: '#' },
      { title: 'Feriados', href: '#' },
    ],
  },
];

export function MainNavigation() {
  return (
    <nav className="w-full px-2">
      {navigationLinks.map((link) => (
        <NavItem key={link.title} title={link.title} icon={link.icon}>
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