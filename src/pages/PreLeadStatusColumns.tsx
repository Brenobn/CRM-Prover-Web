import type { ColumnDef } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from '../components/ui/button';

export type StatusPreLead = {
  id: string
  descrição: string
  numeroDias: number
  numeroOrdem: number
  ativo: boolean
}

export const data : StatusPreLead[] = [
  { id: "1", descrição: "Atendeu", numeroDias: 0, numeroOrdem: 1, ativo: true },
  { id: "2", descrição: "Cadastrado", numeroDias: 0, numeroOrdem: 1, ativo: true },
  { id: "3", descrição: "Desativado", numeroDias: 0, numeroOrdem: 1, ativo: false },
  { id: "4", descrição: "Lead", numeroDias: 0, numeroOrdem: 1, ativo: true },
  { id: "5", descrição: "Não atendeu", numeroDias: 0, numeroOrdem: 1, ativo: false },
  { id: "6", descrição: "Pendente", numeroDias: 0, numeroOrdem: 1, ativo: true },
];

interface ColumnHandlers {
  onEdit: (status: StatusPreLead) => void
  onDelete: (status: StatusPreLead) => void
}

export const getColumns = ({ onEdit, onDelete }: ColumnHandlers): ColumnDef<StatusPreLead>[] => [
  {
    accessorKey: "descrição",
    header: "Descrição",
  },
  {
    accessorKey: "numeroDias",
    header: "N° de Dias",
  },
  {
    accessorKey: "numeroOrdem",
    header: "N° de Ordem"
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
            <DropdownMenuItem onClick={() => onEdit(area)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(area)}>
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];