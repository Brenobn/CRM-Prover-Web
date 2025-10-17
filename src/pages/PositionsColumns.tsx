import type { ColumnDef } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from '../components/ui/button';

export type Cargo = {
  id: string;
  cargo: string;
  descrição: string;
  ativo: boolean;
}

export const data : Cargo[] = [
  { id: "1", cargo: "Diretor", descrição: "Cargo de direção", ativo: true },
  { id: "2", cargo: "Vendedor", descrição: "Vendedor", ativo: true },
];

export const columns: ColumnDef<Cargo>[] = [
  {
    accessorKey: "cargo",
    header: "Cargo",
  },
  {
    accessorKey: "descrição",
    header: "Descrição do Cargo",
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
      const cargo = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => alert(`Editando: ${cargo.descrição}`)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Deletando: ${cargo.id}`)}>
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];