import type { ColumnDef } from '@tanstack/react-table'

export type Organização = {
  id: string;
  descrição: string;
  ativo: boolean;
}

export const data : Organização[] = [
  { id: "1", descrição: "Musstins", ativo: true },
  { id: "2", descrição: "Prover", ativo: true },
];

export const columns: ColumnDef<Organização>[] = [
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