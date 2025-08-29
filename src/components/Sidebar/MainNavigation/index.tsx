import { IoSettingsOutline } from "react-icons/io5";
import { LuChartColumn, LuFileText, LuUsers } from "react-icons/lu";
import { PiSparkle } from "react-icons/pi";
import { NavItem } from "./NavItem";

export function MainNavigation() {
  return(
    <nav>
      <NavItem title="Dashboard" icon={LuChartColumn}/>
      <NavItem title="Dashboard Avançado" icon={LuChartColumn}/>
      <NavItem title="Leads" icon={LuUsers}/>
      <NavItem title="Dados" icon={LuFileText}/>
      <NavItem title="Diagnóstico" icon={PiSparkle}/>
      <NavItem title="Configurações" icon={IoSettingsOutline}/>
    </nav>
  );
}