export type FaseVenda = "Prospecção" | "Primeira Reunião" | "Proposta" | "Negociação" | "Fechamento"
export type StatusLead = "Lead" | "Oportunidade" | "Cliente" | "Perdido"

export type Vendedor = {
  nome: string 
  email: string
}

export const vendedores = [
  "Camilla",
  "Felipe de oliveira santos",
  "Elisa Xavier",
  "Priscilla dos santos da Silva",
  "Marcelle Pereira dos Santos",
  "Fernando do Couto Araújo"
]

export type Lead = {
  id: string
  nomeCliente: string
  cnpj: string
  vendedor: string
  faseVenda: FaseVenda
  ativo: boolean
  status: StatusLead
}

export const data: Lead[] = [
  {
    id: "1",
    nomeCliente: "Aegea Saneamento",
    cnpj: "08.827.501/0001-58",
    vendedor: "Camilla",
    faseVenda: "Primeira Reunião",
    ativo: true,
    status: "Lead",
  },
  {
    id: "2",
    nomeCliente: "Algar Telecom",
    cnpj: "71.208.516/0001-74",
    vendedor: "Felipe de oliveira santos",
    faseVenda: "Primeira Reunião",
    ativo: true,
    status: "Lead",
  },
  {
    id: "3",
    nomeCliente: "ALPER CONSULTORIA EM SEGUROS",
    cnpj: "01.234.567/0001-89",
    vendedor: "Camilla",
    faseVenda: "Prospecção",
    ativo: true,
    status: "Lead",
  },
  {
    id: "4",
    nomeCliente: "Alternativa Vidros",
    cnpj: "98.765.432/0001-10",
    vendedor: "Felipe de oliveira santos",
    faseVenda: "Primeira Reunião",
    ativo: true,
    status: "Lead",
  },
  {
    id: "5",
    nomeCliente: "Andorinha Distribuidora Farma",
    cnpj: "46.239.901/0001-31",
    vendedor: "Elisa Xavier",
    faseVenda: "Primeira Reunião",
    ativo: true,
    status: "Lead",
  },
  {
    id: "6",
    nomeCliente: "Andrade Distribuidor LTDA",
    cnpj: "03.753.945/0001-72",
    vendedor: "Felipe de oliveira santos",
    faseVenda: "Primeira Reunião",
    ativo: true,
    status: "Lead",
  },
  {
    id: "7",
    nomeCliente: "Andrade Gutierrez S.A.",
    cnpj: "00.000.000/0000-00",
    vendedor: "Priscila dos santos da Silva",
    faseVenda: "Primeira Reunião",
    ativo: true,
    status: "Lead",
  },
  {
    id: "8",
    nomeCliente: "Aproms",
    cnpj: "04.369.329/0001-85",
    vendedor: "Marcelle Pereira dos Santos",
    faseVenda: "Primeira Reunião",
    ativo: true,
    status: "Lead",
  },
  {
    id: "9",
    nomeCliente: "Arai Energy",
    cnpj: "00.000.000/0000-11",
    vendedor: "Elisa Xavier",
    faseVenda: "Prospecção",
    ativo: true,
    status: "Lead",
  },
  {
    id: "10",
    nomeCliente: "ArcelorMittal Pecém",
    cnpj: "09.509.535/0001-67",
    vendedor: "Marcelle Pereira dos Santos",
    faseVenda: "Prospecção",
    ativo: true,
    status: "Lead",
  },
]
