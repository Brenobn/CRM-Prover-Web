import type { ColumnDef } from "@tanstack/react-table"

export type MotivoConclusãoVenda = {
  id: string;
  descrição: string;
  ativo: boolean;
}

export const data: MotivoConclusãoVenda[] = [
  { id: "1", descrição: "Aguardando resposta das duas propostas (esperando liberação orçamento)", ativo: true },
  { id: "2", descrição: "Alinhamento Contratual", ativo: true },
  { id: "3", descrição: "Contra as políticas da empresa", ativo: true },
  { id: "4", descrição: "Contrato Assinado", ativo: true },
  { id: "5", descrição: "Empresa contratou internamente mas vão nos manter no radar para projetos futuros.", ativo: true },
  { id: "6", descrição: "Empresa desistiu do projeto.", ativo: true },
  { id: "7", descrição: "Falta de orçamento", ativo: true },
  { id: "8", descrição: "Fechou com outra empresa, mas dará oportunidades para projetos futuros", ativo: true },
  { id: "9", descrição: "Fechou com outra orçamento mais barato", ativo: true },
  { id: "10", descrição: "Prover ia quartetizar o profissional, mas a empresa que eles iriam pestar o serviço desistiu.", ativo: true },
]

export const columns: ColumnDef<MotivoConclusãoVenda>[] = [
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