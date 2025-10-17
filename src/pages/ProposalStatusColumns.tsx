import type { ColumnDef } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from '../components/ui/button';

export type StatusProposta = {
  id: string
  descrição: string;
  ativo: boolean;
}

export const data : StatusProposta[] = [
  { id: "1", descrição: "Aguardando", ativo: true },
  { id: "2", descrição: "Assinado", ativo: true },
  { id: "3", descrição: "Enviado", ativo: true },
  { id: "4", descrição: "Recusada(o)", ativo: true },
  { id: "5", descrição: "teste", ativo: true },
];

export const columns: ColumnDef<StatusProposta>[] = [
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
      const status = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => alert(`Editando: ${status.descrição}`)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Deletando: ${status.id}`)}>
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];