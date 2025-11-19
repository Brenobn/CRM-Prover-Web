import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { FilePen, Trash2 } from "lucide-react"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "../components/ui/dialog"
import { Textarea } from "../components/ui/textarea"
import type { Lead } from "../pages/LeadsColumns"
import { data as initialData, vendedores as listaVendedores } from "./LeadsColumns"
import { toast } from "sonner"
import { Switch } from "../components/ui/switch"

export type LeadDetailProps = {
  leadId: string | null
  onBack: () => void
}

type LeadFormData = Omit<Lead, "id"> & {
  razaoSocial: string
  produtivo: boolean
  favorito: boolean
}

type TableDetalhesProps = {
  lead: LeadFormData
  setLead: Dispatch<SetStateAction<LeadFormData>>
}

const defaultVendedor = listaVendedores[0] ?? ""

const createLeadFormData = (lead?: Partial<LeadFormData>): LeadFormData => ({
  nomeCliente: lead?.nomeCliente ?? "",
  cnpj: lead?.cnpj ?? "",
  razaoSocial: lead?.razaoSocial ?? "",
  vendedor: lead?.vendedor ?? defaultVendedor,
  faseVenda: lead?.faseVenda ?? ("Prospecção" as Lead["faseVenda"]),
  ativo: lead?.ativo ?? true,
  produtivo: lead?.produtivo ?? true,
  favorito: lead?.favorito ?? false,
  status: lead?.status ?? "Lead",
})

const emptyLead = createLeadFormData()

function TabReuniao() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const reunioes = [
    { 
      id: "1", 
      data: "14/11/2025", 
      hora: "10:30", 
      email: "contato@empresa.com", 
      tipo: "Alinhamento",
      titulo: "Demostração", 
      status: "Agendada", 
      desc: "Primeira demo" 
    }
  ]

  return (
    <CardContent className="space-y-4 pt-1">
      <div className="rounded-md border overflow-auto">
        <Table className="w-full min-w-[900px] table-auto">
          <TableHeader className="sticky top-0 z-10 bg-muted/50 backdrop-blur supports-backdrop-filter:bg-muted/60">
            <TableRow className="[&_th]:h-10">
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Data</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Hora</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Email</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Título</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Tipo Reunião</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Status</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Descrição</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reunioes.map((reuniao) => (
              <TableRow key={reuniao.id}>
                <TableCell>{reuniao.data}</TableCell>
                <TableCell>{reuniao.hora}</TableCell>
                <TableCell>{reuniao.email}</TableCell>
                <TableCell>{reuniao.titulo}</TableCell>
                <TableCell>{reuniao.tipo}</TableCell>
                <TableCell>{reuniao.status}</TableCell>
                <TableCell>{reuniao.desc}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" title="Editar Reunião">
                      <FilePen className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8" title="Deletar Reunião">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Deletar</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {reunioes.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">Nenhuma reunião encontrada.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">Adicionar</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Adicionar Reunião</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reuniao-data">Data *</Label>
                <Input id="reuniao-data" type="date" className="dark:[color-scheme-dark]"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reuniao-hora">Hora *</Label>
                <Input id="reuniao-hora" type="time" className="dark:[color-scheme-dark]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reuniao-email">Email *</Label>
                <Input id="reuniao-email" type="email" placeholder="exemplo@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reuniao-titulo">Titulo *</Label>
                <Input id="reuniao-titulo" placeholder="Título da runião" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reuniao-tipo">Tipo de Reunião</Label>
                <Select>
                  <SelectTrigger id="reuniao-tipo">
                    <SelectValue placeholder="-- Selecione --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="demo">Demonstração</SelectItem>
                    <SelectItem value="alinhamento">Alinhamento</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => {
                toast.success("Reunião adicionada!")
                setIsDialogOpen(false)
              }}>
                Salvar Reunião
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </CardContent>
  )
}


function TabDetalhes({ lead, setLead }: TableDetalhesProps) {
  return(
    <CardContent className="space-y-6 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="statusClienteDetalhe">Status do cliente</Label>
          <Select
            value={lead.status}
            onValueChange={(value) => setLead(prev => ({ ...prev, status: value as Lead["status"] }))}
          >
            <SelectTrigger id="statusClienteDetalhe" className="w-full">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Lead">Lead</SelectItem>
              <SelectItem value="Oportunidade">Oportunidade</SelectItem>
              <SelectItem value="Cliente">Cliente</SelectItem>
              <SelectItem value="Perdido">Perdido</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="areaAtuacao">Área de atuação</Label>
          <Select>
            <SelectTrigger id="areaAtuacao" className="w-full">
              <SelectValue placeholder="--Selecione a Área de Atuação--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="energia">Energia</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="comercio">Comércio</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="canalContato">Canal de Contato</Label>
          <Select>
            <SelectTrigger id="canalContato" className="w-full">
              <SelectValue placeholder="--Selecione o canal de contato--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="telefone">Telefone</SelectItem>
              <SelectItem value="email">E-mail</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="quemIndicou">Quem Indicou?</Label>
          <Input
            id="quemIndicou"
            placeholder="Preencha no módulo de contatos"
            className="bg-muted/40"
            readOnly
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="faseAtual">Fase atual</Label>
          <Select
            value={lead.faseVenda}
            onValueChange={(value) => setLead(prev => ({ ...prev, faseVenda: value as Lead["faseVenda"] }))}
          >
            <SelectTrigger id="faseAtual" className="w-full">
              <SelectValue placeholder="Selecione a fase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Prospecção">Prospecção</SelectItem>
              <SelectItem value="Primeira Reunião">Primeira Reunião</SelectItem>
              <SelectItem value="Proposta">Proposta</SelectItem>
              <SelectItem value="Negociação">Negociação</SelectItem>
              <SelectItem value="Fechamento">Fechamento</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="proposta">Proposta</Label>
          <Input
            id="proposta"
            placeholder="Sem proposta vinculada"
            className="bg-muted/40"
            readOnly
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="motivoConclusao">Motivo de conclusão</Label>
          <Select>
            <SelectTrigger id="motivoConclusao" className="w-full">
              <SelectValue placeholder="--Selecione o motivo--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="preco">Preço</SelectItem>
              <SelectItem value="tempo">Tempo</SelectItem>
              <SelectItem value="escopo">Escopo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="detalhesConclusao">Detalhes da conclusão</Label>
          <Input id="detalhesConclusao" placeholder="Insira detalhes adicionais" />
        </div>
      </div>
    </CardContent>
  )
}

function TabEndereco() {
  return(
    <CardContent className="space-y-6 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="cep">CEP</Label>
          <Input id="cep" placeholder="00000-000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cidade">Cidade</Label>
          <Input id="cidade" placeholder="Rio de Janeiro" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="logradouro">Logradouro</Label>
          <Input id="logradouro" placeholder="Av. Exemplo, 123" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="estado">Estado</Label>
          <Input id="estado" placeholder="RJ" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="complemento">Complemento</Label>
          <Input id="complemento" placeholder="Sala 101" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pais">País</Label>
          <Input id="pais" placeholder="Brasil" defaultValue="Brasil" />
        </div>
      </div>
      <div className="space-y-2 md:w-1/2 pr-3">
        <Label htmlFor="bairro">Bairro</Label>
        <Input id="bairro" placeholder="Centro" />
      </div>
    </CardContent>
  )
}

function TabDadosTecnicos() {
  return(
    <CardContent className="space-y-6 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="erp">ERP</Label>
          <Input id="erp" placeholder="Ex: SAP, Totvs" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="arquivos">Arquivos</Label>
          <Input id="arquivos" placeholder="Local de armazenamento" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="integracoes">Integrações</Label>
          <Input id="integracoes" placeholder="Sistemas integrados" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="backup">Backup</Label>
          <Input id="backup" placeholder="Tipo de backup" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="desenvolvimento">Desenvolvimento</Label>
          <Input id="desenvolvimento" placeholder="Linguagens, frameworks" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="banco">Banco</Label>
          <Input id="banco" placeholder="Ex: SQL Server, Oracle" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="infraestrutura">Infraestura</Label>
          <Input id="infraestrutura" placeholder="Ex: AWS, Azure" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bi">BI</Label>
          <Input id="bi" placeholder="Ex: Power BI, Tableau" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="comentarios">Comentários Gerais</Label>
        <Textarea id="comentarios" placeholder="Outras informações técnicas..." />
      </div>
    </CardContent>
  )
}

function TabTarefa() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // TODO: Carregar dados mockados/reais da tabela de tarefas
  const tarefas = [
    { id: "1", data: "12/11/2025", responsavel: "Breno Braga", delegado: "Camilla", tipo: "Reunião", dataRetorno: "15/11/2025", link: "http://meet.google.com", desc: "Reunião de Alinhamento" }
  ]

  return (
    <CardContent>
      <div className="rounded-md border overflow-auto">
        <Table className="w-full table-auto">
          <TableHeader className="sticky top-0 z-10 bg-muted/50 backdrop-blur supports-backdrop-filter:bg-muted/60">
            <TableRow className="[&_th]:h-10">
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Data</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Responsável</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Delegado Para</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Tipo Tarefa</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Data Retorno</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Link Reunião</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Descrição</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tarefas.map((tarefa) => (
              <TableRow key={tarefa.id}>
                <TableCell>{tarefa.data}</TableCell>
                <TableCell>{tarefa.responsavel}</TableCell>
                <TableCell>{tarefa.delegado}</TableCell>
                <TableCell>{tarefa.tipo}</TableCell>
                <TableCell>{tarefa.dataRetorno}</TableCell>
                <TableCell>
                  <a href={tarefa.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Link
                  </a>
                </TableCell>
                <TableCell>{tarefa.desc}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-blue-500" title="Editar Tarefa">
                    <FilePen className="h-4 w-4"/>
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" title="Excluir">
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {tarefas.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">Nenhuma tarefa encontrada.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end items-center mt-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">Adicionar</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Tarefa</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tarefa-data">Data</Label>
                <Input 
                  id="tarefa-data" 
                  type="date" 
                  defaultValue={
                    new Date().toISOString().split('T')[0]
                  } 
                  className="dark:[color-scheme-dark]" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tarefa-usuario">Usuário *</Label>
                <Select defaultValue="bbraga@provertec.com.br">
                  <SelectTrigger id="tarefa-usuario">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bbraga@provertec.com.br">bbraga@provertec.com.br</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tarefa-delegado">Delegado para</Label>
                <Select>
                  <SelectTrigger id="tarefa-delegado">
                    <SelectValue placeholder="Selecione o delegado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="camilla">Camilla</SelectItem>
                    <SelectItem value="felipe">Felipe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tarefa-tipo">Tipo de Tarefa *</Label>
                <Select>
                  <SelectTrigger id="tarefa-tipo">
                    <SelectValue placeholder="Selecione o tipo"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reuniao">Reunião</SelectItem>
                    <SelectItem value="ligacao">Ligação</SelectItem>
                    <SelectItem value="email">E-mail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="tarefa-desc">Descrição *</Label>
                <Textarea id="tarefa-desc" placeholder="Descreva a tarefa..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tarefa-data-retorno">Data Retorno *</Label>
                <Input id="tarefa-data-retorno" type="date" className="dark:scheme-dark" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tarefa-link">Link Reunião</Label>
                <Input id="tarefa-link" placeholder="http://..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => {
                // TODO: Adcionar lógica de salvar
                toast.success("Tarefa adicionada!")
                setIsDialogOpen(false)
              }}
              >
                Salvar Tarefa
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </CardContent>
  )
}

function TabContato() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const contatos = [
    { 
      id: "1", 
      nome: "Fulano de Tal", 
      email: "fulano@empresa.com", 
      telefone: "(21) 99999-8888", 
      cargo: "Gerente de TI", 
      dataNasc: "10/10/1980", 
      tags: "Decisor" 
    }
  ]

  return (
    <CardContent>
      <div className="rounded-md border overflow-auto">
        <Table className="w-full table-auto">
          <TableHeader className="sticky top-0 z-10 bg-muted/50 backdrop-blur supports-backdrop-filter:bg-muted/60">
            <TableRow className="[&_th]:h-10">
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Nome</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">E-mail</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Telefone</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Cargo</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Data Nasc.</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Tags</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contatos.map((contato) => (
              <TableRow key={contato.id}>
                <TableCell>{contato.nome}</TableCell>
                <TableCell>{contato.email}</TableCell>
                <TableCell>{contato.telefone}</TableCell>
                <TableCell>{contato.cargo}</TableCell>
                <TableCell>{contato.dataNasc}</TableCell>
                <TableCell>{contato.tags}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" className="text-blue-500" title="Editar Contato">
                    <FilePen className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" title="Excluir">
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
              {contatos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-cemter">Nenhum contato encontrado.</TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end items-center mt-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">Adicionar</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Contato</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="contato-nome">Nome *</Label>
                <Input id="contato-nome" placeholder="Nome completo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contato-email">E-mail</Label>
                <Input id="contato-email" type="email" placeholder="email@dominio.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contato-telefone">Telefone</Label>
                <Input id="contato-telefone" placeholder="(21) 99999-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contato-cargo">Cargo</Label>
                <Input id="contato-cargo" placeholder="Ex: Gerente de TI" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contato-linkedin">Linkedin</Label>
                <Input id="contato-linkedin" placeholder="linkedin.com/in/..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contato-data-nasc">Data de nascimento</Label>
                <Input id="contato-data-nasc" type="date" className="dark:[color-scheme-dark]"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contato-tags">Tags</Label>
                <Input id="contato-tags" placeholder="Decisor, TI, etc." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => {
                toast.success("Contato adicionado!")
                setIsDialogOpen(false)
              }}>
                Salvar Contato
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </CardContent>
  )
}

function TabDocumentos() {
  return(
    <CardContent className="space-y-4 pt-6">
      <div className="rounded-md border overflow-auto">
        <Table className="w-full table-auto">
          <TableHeader className="sticky top-0 z-10 bg-muted/50 backdrop-blur supports-backdrop-filter:bg-muted/60">
            <TableRow className="[&_th]:h-10">
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Tipo Documento</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Status</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Data Assinatura</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Valor da Proposta</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">PDF</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Observação</TableHead>
              <TableHead className="px-4 py-3 text-left align-middle font-medium text-[12px] uppercase tracking-wide text-muted-foreground">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="[&_td]:h-12">
              <TableCell className="px-4 py-3 align-middle">Proposta Comercial</TableCell>
              <TableCell className="px-4 py-3 align-middle">Enviada</TableCell>
              <TableCell className="px-4 py-3 align-middle">10/11/2025</TableCell>
              <TableCell className="px-4 py-3 align-middle">R$ 15.000,00</TableCell>
              <TableCell>
                <a href="#" className="text-blue-500 hover:underline">proposta_v1.pdf</a>
              </TableCell>
              <TableCell className="px-4 py-3 align-middle">Versão inicial</TableCell>
              <TableCell className="px-4 py-3 align-middle">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" title="Editar documento">
                    <FilePen className="h-4 w-4"/>
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button variant="destructive" size="icon" className="h-8 w-8" title="Excluir documento">
                    <Trash2 className="h-4 w-4"/>
                    <span className="sr-only">Excluir</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <Button size="sm">Adicionar</Button>
      </div>
    </CardContent>
  )
}

/**
 * Componente Principal (Página Nível 3)
 */
export function LeadDetail({ leadId, onBack }: LeadDetailProps) {
  const isCreating = leadId === null

  // estado de carregamento e dados apenas para EDIÇÃO
  const [leadData, setLeadData] = useState<LeadFormData>(emptyLead)
  const [isLoading, setIsLoading] = useState<boolean>(!isCreating)

  useEffect(() => {
    if (isCreating) {
      setLeadData(emptyLead)
      setIsLoading(false)
    } else {
      setIsLoading(true)
      const leadParaEditar = initialData.find(lead => lead.id === leadId)
      if (leadParaEditar) {
        setLeadData(createLeadFormData(leadParaEditar))
      } else {
        toast.error("Lead não encontrado.")
        onBack()
      }
      setIsLoading(false)
    }
  }, [leadId, isCreating, onBack])

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Carregando dados do lead...</p>
      </div>
    )
  }

  const headerTitle = isCreating
    ? "Criar Novo Lead"
    : `Lead #${leadId}: ${leadData?.nomeCliente}`
  const primaryCta = isCreating ? "Criar Lead" : "Salvar Alterações"
  const formKey = isCreating ? "create" : `edit-${leadId}`

  return (
    <div className="space-y-4" key={formKey}>
      <header className="flex items-start justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-normal text-gray-150 dark:text-gray-75 -tracking-tight">
            {headerTitle}
          </h1>
          <div className="text-sm text-muted-foreground flex gap-1">
            <a href="#" className="text-blue-500 hover:underline">Home</a>
            <span>/</span>
            <a href="#" className="text-blue-500 hover:underline">Leads</a>
            <span>{isCreating ? "/ Criar" : "/ Detalhes"}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onBack}>Voltar</Button>
          <Button size="lg">{primaryCta}</Button>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Cadastro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa *</Label>
              <Input 
                id="empresa"
                placeholder="Nome da empresa"
                value={leadData.nomeCliente}
                onChange={(e) => setLeadData(prev => ({ ...prev, nomeCliente: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input 
                id="cnpj"
                placeholder="00.000.000/0001-00"
                value={leadData.cnpj}
                onChange={(e) => setLeadData(prev => ({ ...prev, cnpj: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="razaoSocial">Razão social da empresa *</Label>
              <Input 
                id="razaoSocial"
                placeholder="Razão social da empresa"
                value={leadData.razaoSocial}
                onChange={(e) => setLeadData(prev => ({ ...prev, razaoSocial: e.target.value }))}
              />
            </div>
            <div className="flex items-center gap-6">
              <div className="space-y-2">
                <Label htmlFor="vendedor">Vendedor</Label>
                <Select
                  value={leadData.vendedor}
                  onValueChange={(value) => {
                    setLeadData(prev => ({ ...prev, vendedor: value }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {listaVendedores.map(v => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-6 pt-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ativo"
                    checked={leadData.ativo}
                    onCheckedChange={(checked) => setLeadData(prev => ({ ...prev, ativo: checked }))}
                  />
                  <Label htmlFor="ativo">Ativo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="produtivo"
                    checked={leadData.produtivo}
                    onCheckedChange={(checked) => setLeadData(prev => ({ ...prev, produtivo: checked }))}
                  />
                  <Label htmlFor="favorito">Favorito</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      
      

       <Tabs defaultValue="detalhes">
          <CardHeader className="border-t px-12 py-4 mt-8 min-w-full">
            <TabsList>
              <TabsTrigger value="tarefa">Tarefa</TabsTrigger>
              <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
              <TabsTrigger value="contato">Contato</TabsTrigger>
              <TabsTrigger value="endereco">Endereço</TabsTrigger>
              <TabsTrigger value="dadosTecnicos">Dados Técnicos</TabsTrigger>
              <TabsTrigger value="reuniao">Reunião</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
            </TabsList>
          </CardHeader>

          <TabsContent value="tarefa">
            <CardContent className="pt-6">
              <TabTarefa />
            </CardContent>
          </TabsContent>

          <TabsContent value="detalhes">
            <TabDetalhes lead={leadData} setLead={setLeadData}/>
          </TabsContent>

          <TabsContent value="contato">
            <CardContent className="pt-6">
              <TabContato />
            </CardContent>
          </TabsContent>

          <TabsContent value="endereco">
            <TabEndereco />
          </TabsContent>

          <TabsContent value="dadosTecnicos">
            <TabDadosTecnicos />
          </TabsContent>

          <TabsContent value="reuniao">
            <CardContent className="pt-6">
              <TabReuniao />
            </CardContent>
          </TabsContent>

          <TabsContent value="documentos">
            <TabDocumentos />
          </TabsContent>
        </Tabs>             
      </Card>
    </div>
  )
}
