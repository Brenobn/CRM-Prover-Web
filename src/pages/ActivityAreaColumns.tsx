import type { ColumnDef } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from '../components/ui/button';

export type AreaDeAtuação = {
  id: string;
  descrição: string;
  ativo: boolean;
}

export const data : AreaDeAtuação[] = [
  { id: "1", descrição: "Administração pública, defesa e seguridade social.", ativo: true },
  { id: "2", descrição: "Advocacia", ativo: true },
  { id: "3", descrição: "Agronegócio", ativo: false },
  { id: "4", descrição: "Água e esgoto", ativo: true },
  { id: "5", descrição: "Alimentação e bebidas", ativo: true },
  { id: "6", descrição: "Alimentos", ativo: true },
  { id: "7", descrição: "Alimentos e bebidas", ativo: true },
  { id: "8", descrição: "Armazenamento e atividades auxiliares dos transportes", ativo: true },
  { id: "9", descrição: "Artes, cultutra, esporte e recreação", ativo: true },
  { id: "10", descrição: "Atividades de bem-estar e condicionamento físico", ativo: true },
  { id: "11", descrição: "Atividades de consultoria em gestão empresarial", ativo: true },
  { id: "12", descrição: "Atividades de contabilidade", ativo: true },
  { id: "13", descrição: "Atividades de serviços Financeiros", ativo: true },
  { id: "14", descrição: "Atividades de vigilância e segurança", ativo: true },
  { id: "15", descrição: "Atividades esportivas para audiências", ativo: true },
  { id: "16", descrição: "Atividades ligadas ao patrimônio cultural e ambiental", ativo: true },
  { id: "17", descrição: "Atividades veterinárias", ativo: true },
  { id: "18", descrição: "Automação Industrial", ativo: true},
  { id: "19", descrição: "AUTOMOTIVO", ativo: true },
];

export const columns: ColumnDef<AreaDeAtuação>[] = [
  {
    accessorKey: "descrição",
    header: "Descrição",
  },
  {
    accessorKey: "ativo",
    header: "Ativo",
    cell: ({ row }) => {
      return row.getValue("ativo") ? "Sim" : "Não";
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const area = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => alert(`Editando: ${area.descrição}`)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Deletando: ${area.id}`)}>
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];