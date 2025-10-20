import type { ColumnDef } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from '../components/ui/button';

export type FaseVenda = {
  id: string;
  ordem: number;
  descrição: string;
  ativo: boolean;
}

export const data : FaseVenda[] = [
  { id: "1", ordem: 1, descrição: "Prospecção", ativo: true },
  { id: "2", ordem: 2, descrição: "Primeira Reunião", ativo: true },
  { id: "3", ordem: 6, descrição: "Reunião Técnica", ativo: true },
  { id: "4", ordem: 4, descrição: "Proposta", ativo: true },
  { id: "5", ordem: 6, descrição: "Negociação", ativo: true },
  { id: "6", ordem: 7, descrição: "Conclusão", ativo: true },
];

export const columns: ColumnDef<FaseVenda>[] = [
  {
    accessorKey: "ordem",
    header: "Ordem",
  },
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
      const fase = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => alert(`Editando: ${fase.descrição}`)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Deletando: ${fase.id}`)}>
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];