import type { ColumnDef } from "@tanstack/react-table"

export type MotivoRecusaProposta = {
  id: string;
  descrição: string;
  ativo: boolean;
}

export const data: MotivoRecusaProposta[] = [
  { id: "1", descrição: "Recusado", ativo: true },
  { id: "2", descrição: "Teste", ativo: true },
]

export const columns: ColumnDef<MotivoRecusaProposta>[] = [
  {
    accessorKey: "descrição",
    header: "Descrição",
  },
  {
    accessorKey: "ativo",
    header: "Ativo",
  },
  {
    id: "actions",
    header: "Ações",
  }
]