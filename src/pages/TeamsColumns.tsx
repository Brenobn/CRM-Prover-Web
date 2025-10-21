import type { ColumnDef } from '@tanstack/react-table'

export type Equipe = {
  id: string;
  descrição: string;
  ativo: boolean;
}

export const data : Equipe[] = [
  { id: "1", descrição: "Equipe Marcelle", ativo: true },
  { id: "2", descrição: "Equipe Fernando", ativo: true },
];

export const columns: ColumnDef<Equipe>[] = [
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
  },
];