export type PerfilUsuario = "Amnistrador" | "Vendedor"

export type Usuario = {
  id: string
  fotoUrl: string
  nome: string
  cpf: string
  telefone: string
  perfil: PerfilUsuario
  ativo: boolean
  podeVender: boolean
}

export const perfis = ["Amnistrador", "Vendedor"] as const

export const data: Usuario[] = [
  {
    id: "1",
    fotoUrl: "https://placehold.co/40x40/64748b/FFF?text=B",
    nome: "Breno Braga",
    cpf: "058.232.457.26",
    telefone: "(21) 98047-9073",
    perfil: "Amnistrador",
    ativo: true,
    podeVender: false,
  },
  {
    id: "2",
    fotoUrl: "https://placehold.co/40x40/64748b/FFF?text=C",
    nome: "Camilla",
    cpf: "733.442.580-44",
    telefone: "(21) 2787-0800",
    perfil: "Vendedor",
    ativo: true,
    podeVender: true,
  },
  {
    id: "3",
    fotoUrl: "https://placehold.co/40x40/64748b/FFF?text=D",
    nome: "Diego da Costa Afonso",
    cpf: "099.633.767-97",
    telefone: "(21) 9845-86285",
    perfil: "Amnistrador",
    ativo: true,
    podeVender: false,
  },
  {
    id: "4",
    fotoUrl: "https://placehold.co/40x40/64748b/FFF?text=D",
    nome: "Diego Vendedor",
    cpf: "111.111.111-11",
    telefone: "(21) 98458-6285",
    perfil: "Vendedor",
    ativo: true,
    podeVender: true,
  },
  {
    id: "5",
    fotoUrl: "https://placehold.co/40x40/64748b/FFF?text=E",
    nome: "Eduarda Garcia",
    telefone: "(21) 96418-3055",
    cpf: "185.878.427-14",
    perfil: "Vendedor",
    ativo: true,
    podeVender: true,
  },
  {
    id: "6",
    fotoUrl: "https://placehold.co/40x40/64748b/FFF?text=E",
    nome: "Eduardo Romaris",
    telefone: "(21) 33411-1111",
    cpf: "435.426.010-71",
    perfil: "Vendedor",
    ativo: true,
    podeVender: true,
  },
  {
    id: "7",
    fotoUrl: "https://placehold.co/40x40/64748b/FFF?text=E",
    nome: "Elisa Xavier",
    telefone: "(21) 98311-2740",
    cpf: "157.730.937-58",
    perfil: "Vendedor",
    ativo: true,
    podeVender: true,
  },
  {
    id: "8",
    fotoUrl: "https://placehold.co/40x40/64748b/FFF?text=E",
    nome: "Érika Romaris",
    telefone: "(21) 33413-0000",
    cpf: "025.579.390-13",
    perfil: "Vendedor",
    ativo: true,
    podeVender: true,
  },
  {
    id: "9",
    fotoUrl: "https://placehold.co/40x40/64748b/FFF?text=E",
    nome: "Fabio Freitas",
    telefone: "(21) 96781-658",
    cpf: "166.229.897-88",
    perfil: "Amnistrador",
    ativo: true,
    podeVender: true,
  },
  {
    id: "10",
    fotoUrl: "https://placehold.co/40x40/64748b/FFF?text=E",
    nome: "Felipe de oliveira santos",
    telefone: "(21) 97625-5764",
    cpf: "162.876.987-48",
    perfil: "Vendedor",
    ativo: true,
    podeVender: true,
  },
]
