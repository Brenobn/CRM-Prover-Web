export type AtividadeDiaria = {
  id: string
  nomeVendedor: string
  dataCadastro: string
  linkedin: number
  indicações: number
  whatsEnviado: number
  interaçõesMensagem: number
  reuniõesAgendadas: number
  reuniõesExecutadas: number
  propostasEnviadas: number
  quantidadeLigações: number
}

export const vendedores = [
  "Fernando do Couto Araújo",
  "Camilla",
  "Felipe de Oliveira Santos",
  "Elisa Xavier",
  "Marcelle Pereira dos Santos",
  "Eduarda Garcia",
]

export const equipes = ["Equipe Alpha", "Equipe Beta", "Equipe Gama"]

export const data: AtividadeDiaria[] = [
 { 
    id: "1",
    nomeVendedor: "Fernando do Couto Araújo",
    dataCadastro: "2025-11-07",
    linkedin: 5,
    indicações: 2,
    whatsEnviado: 10,
    interaçõesMensagem: 8,
    reuniõesAgendadas: 3,
    reuniõesExecutadas: 2,
    propostasEnviadas: 1,
    quantidadeLigações: 15,
  },
  {
    id: "2",
    nomeVendedor: "Camilla",
    dataCadastro: "2025-11-07",
    linkedin: 3,
    indicações: 1,
    whatsEnviado: 12,
    interaçõesMensagem: 10,
    reuniõesAgendadas: 4,
    reuniõesExecutadas: 4,
    propostasEnviadas: 2,
    quantidadeLigações: 20,
  },
  {
    id: "3",
    nomeVendedor: "Felipe de Oliveira Santos",
    dataCadastro: "2025-11-06",
    linkedin: 8,
    indicações: 0,
    whatsEnviado: 7,
    interaçõesMensagem: 5,
    reuniõesAgendadas: 1,
    reuniõesExecutadas: 1,
    propostasEnviadas: 0,
    quantidadeLigações: 10,
  },
  {
    id: "4",
    nomeVendedor: "Elisa Xavier",
    dataCadastro: "2025-11-06",
    linkedin: 10,
    indicações: 3,
    whatsEnviado: 15,
    interaçõesMensagem: 12,
    reuniõesAgendadas: 5,
    reuniõesExecutadas: 3,
    propostasEnviadas: 3,
    quantidadeLigações: 25,
  },
  {
    id: "5",
    nomeVendedor: "Marcelle Pereira dos Santos",
    dataCadastro: "2025-11-05",
    linkedin: 2,
    indicações: 1,
    whatsEnviado: 8,
    interaçõesMensagem: 7,
    reuniõesAgendadas: 2,
    reuniõesExecutadas: 2,
    propostasEnviadas: 1,
    quantidadeLigações: 12,
  },
]