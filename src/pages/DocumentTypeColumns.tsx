import type { ColumnDef } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from '../components/ui/button';

export type TipoDocumento = {
  id: string
  descrição: string;
  numeroDeDias: number;
}

export const data : TipoDocumento[] = [
  { id: "1", descrição: "Aguardando", numeroDeDias: 3 },
  { id: "2", descrição: "Assinado", numeroDeDias: 3 },
  { id: "3", descrição: "Enviado", numeroDeDias: 5 },
  { id: "4", descrição: "Recusada(o)", numeroDeDias: 3 },
];

export const columns: ColumnDef<TipoDocumento>[] = [
  {
    accessorKey: "descrição",
    header: "Descrição",
  },
  {
    accessorKey: "numeroDeDias",
    header: "Número de dias",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const docType = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => alert(`Editando: ${docType.descrição}`)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Deletando: ${docType.id}`)}>
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];