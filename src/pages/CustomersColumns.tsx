import type { ColumnDef } from "@tanstack/react-table"

export type Cliente = {
  id: string;
  empresa: string;
  cnpj: string | null;
  nomeDoVendedor: string;
  faseAtual: string | null;
  ativo: boolean;
  statusDoCliente: string;
}

export const data : Cliente[] = [
  { id: "1", empresa: "A caso de testes 2 Cliente", cnpj: null, nomeDoVendedor: "Diego da Costa Afonso", faseAtual: "Conclusão", ativo: true, statusDoCliente: "Cliente" },
  { id: "2", empresa: "AKNOR", cnpj: null, nomeDoVendedor: "Wladmir Soares Silveira", faseAtual: "Negociação", ativo: true, statusDoCliente: "Cliente" },
  { id: "3", empresa: "APICETECH", cnpj: "22.222.222/2222-22", nomeDoVendedor: "Wladmir Soares Silveira", faseAtual: null, ativo: true, statusDoCliente: "Cliente" },
  { id: "4", empresa: "BASF", cnpj: "56.995.624/0001-40", nomeDoVendedor: "Diego Vendedor", faseAtual: null, ativo: true, statusDoCliente: "Cliente" },
  { id: "5", empresa: "BMI", cnpj: "00.000.000/0000-00", nomeDoVendedor: "Wladmir Soares Silveira", faseAtual: null, ativo: true, statusDoCliente: "Cliente" },
  { id: "6", empresa: "Brainz Group", cnpj: "42.945.645/0001-47", nomeDoVendedor: "Julia Mendes", faseAtual: "Negociação", ativo: true, statusDoCliente: "Cliente" },
  { id: "7", empresa: "BUREAU VERITAS DO BRASIL INSPEÇÕES LTDA", cnpj: "02.861.221/0030-14", nomeDoVendedor: "Diego da Costa Afonso", faseAtual: "Conclusão", ativo: true, statusDoCliente: "Cliente" },
  { id: "8", empresa: "CCAB", cnpj: "62.659.784/0001-11", nomeDoVendedor: "Wladmir Soares Silveira", faseAtual: "Conclusão", ativo: true, statusDoCliente: "Cliente" },
  { id: "9", empresa: "Cepel", cnpj: "42.288.886/0001.60", nomeDoVendedor: "Marcelle Santos", faseAtual: "Conclusão", ativo: true, statusDoCliente: "Cliente" },
  { id: "10", empresa: "CHMASTER", cnpj: "88.888.888/8888.88", nomeDoVendedor: "Diego da Costa Afonso", faseAtual: "Conclusão", ativo: true, statusDoCliente: "Cliente" },
];

export const columns: ColumnDef<Cliente>[] = [
  {
    accessorKey: "empresa",
    header: "Empresa",
  },
  {
    accessorKey: "cnpj",
    header: "CNPJ",
  },
  {
    accessorKey: "faseAtual",
    header: "Fase atual",
  },
  {
    accessorKey: "ativo",
    header: "Ativo",
    cell: ({ row }) => {
      return row.getValue("ativo") ? "Sim" : "Não"
    },
  },
  {
    accessorKey: "statusDoCliente",
    header: "Status do cliente",
  },
]