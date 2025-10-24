import type { ColumnDef } from '@tanstack/react-table'

export type TipoTarefa = {
  id: string;
  descrição: string;
  ativo: boolean;
}

export const data : TipoTarefa[] = [
  { id: "1", descrição: "Enviar Email", ativo: true },
  { id: "2", descrição: "Envio de proposta", ativo: true },
  { id: "3", descrição: "Evento", ativo: true },
  { id: "4", descrição: "Fazer ligação (Telefone)", ativo: true },
  { id: "5", descrição: "Feedback", ativo: true },
  { id: "6", descrição: "Primeira reunião", ativo: true },
  { id: "7", descrição: "Reunião de proposta", ativo: true },
  { id: "8", descrição: "Reunião técnica", ativo: true },
  { id: "9", descrição: "WhatsApp", ativo: true },
];

export const columns: ColumnDef<TipoTarefa>[] = [
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