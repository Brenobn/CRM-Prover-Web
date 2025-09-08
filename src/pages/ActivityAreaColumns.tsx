import type { ColumnDef } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from '../components/ui/button';
import type { AreaDeAtuação } from './ActivityArea';

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