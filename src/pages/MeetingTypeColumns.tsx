import type { ColumnDef } from '@tanstack/react-table'

export type TipoReunião = {
  id: string;
  descrição: string;
  ativo: boolean;
}

export const data : TipoReunião[] = [
  { id: "1", descrição: "Primeira reunião", ativo: true },
  { id: "2", descrição: "Reunião tecnica", ativo: true },
  { id: "3", descrição: "Reunião de Apresentação", ativo: true },
  { id: "4", descrição: "Reunião de Proposta", ativo: true },
  { id: "5", descrição: "Reunião Técnica", ativo: true },

];

export const columns: ColumnDef<TipoReunião>[] = [
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