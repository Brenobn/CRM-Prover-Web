import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

export type LeadDetailProps = {
  leadId: string | null
  onBack: () => void
}

type LeadLoaded = {
  empresa: string
  cnpj: string
  razaoSocial: string
  vendedor: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AbaDetalhes(_props : { defaults?: Partial<LeadLoaded> }) {
  return(
    <CardContent className="space-y-6 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="empresa">Empresa</Label>
          <Input id="empresa" placeholder="Nome da empresa" defaultValue="Empresa Exemplo S/A" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cnpj">Vendedor</Label>
          <Input id="cnpj" placeholder="00.000.000/0001-00" defaultValue="01.234.567/0001-09" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="razaoSocial">Razão social da empresa</Label>
        <Input id="razaoSocial" placeholder="Razão social da empresa" defaultValue="EMPRESA EXEMPLO LTDA" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="vendedor">Vendedor</Label>
        <Select defaultValue="Fernando">
          <SelectTrigger>
            <SelectValue placeholder="Selecione um vendedor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Camilla">Camilla</SelectItem>
            <SelectItem value="Felipe">Felipe de oliveira</SelectItem>
            <SelectItem value="Elisa">Elisa Xavier</SelectItem>
            <SelectItem value="Fernando">Fernando</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  )
}

function AbaEndereco() {
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

function AbaDadosTecnicos() {
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
        <Label htmlFor="comentarios">Comentários</Label>
        <Input id="comentarios" placeholder="Outras informações técnicas..." />
      </div>
    </CardContent>
  )
}

function AbaDocumentos() {
  return(
    <CardContent className="space-y-4 pt-6">
      <div className="flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Documento
        </Button>
      </div>

      <div className="rounded-md border overflow-hidden">
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
                <div className="flex justify-end">
                  <Button variant="outline" size="icon" className="h-8 w-8" title="Editar">
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CardContent>
  )
}

/**
 * Componente Principal (Página Nível 3)
 */
export function LeadDetail({ leadId, onBack }: LeadDetailProps) {
  const isCreateMode = !leadId

  // estado de carregamento e dados apenas para EDIÇÃO
  const [loading, setLoading] = useState<boolean>(!isCreateMode)
  const [loaded, setLoaded] = useState<LeadLoaded | null>(null)

  useEffect(() => {
    if (isCreateMode) {
      setLoading(false)
      setLoaded(null)
      return
    }

    setLoading(true)
    ;(async () => {
      try {
        // Exemplo: buscar dados do lead pelo ID
        // const res = await api.get(`/leads/${leadId}`)
        // setLoaded(res.data)
        // demo local:
        const fake: LeadLoaded = {
          empresa: "Empresa Exemplo S/A",
          cnpj: "01.234.567/0001-09",
          razaoSocial: "EMPRESA EXEMPLO LTDA",
          vendedor: "Fernando",
        }
        setLoaded(fake)
      } finally {
        setLoading(false)
      }
    })()
  }, [leadId, isCreateMode])

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Carregando dados do lead...</p>
      </div>
    )
  }

  const headerTitle = isCreateMode
    ? "Novo Lead"
    : `Lead #${leadId}: ${loaded?.empresa ?? "—"}`

  const primaryCta = isCreateMode ? "Criar Lead" : "Salvar Alterações"

  // key força remontagem dos campos quando alterna entre criar/editar
  const formKey = isCreateMode ? "create" : `edit-${leadId}`

  return (
    <div className="space-y-4" key={formKey}>
      <header className="flex items-start justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-normal text-gray-150 dark:text-gray-75 -tracking-tight">
            {headerTitle}
          </h1>
          <div className="text-sm text-muted-foreground">
            <a href="#" className="text-blue-500 hover:underline">Home</a>
            <span>/</span>
            <a href="#" className="text-blue-500 hover:underline">Leads</a>
            <span>{isCreateMode ? "/ Criar" : "/ Detalhes"}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onBack}>Voltar</Button>
          <Button size="lg">{primaryCta}</Button>
        </div>
      </header>

      <Card>
        <Tabs defaultValue="detalhes">
          <CardHeader className="border-b px-6 py-4">
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
              <p>WIP: Componente de Tarefas aqui.</p>
            </CardContent>
          </TabsContent>

          <TabsContent value="detalhes">
            <AbaDetalhes defaults={isCreateMode ? undefined : loaded ?? undefined} />
          </TabsContent>

          <TabsContent value="contato">
            <CardContent className="pt-6">
              <p>WIP: Formulário de Contato aqui.</p>
            </CardContent>
          </TabsContent>

          <TabsContent value="endereco">
            <AbaEndereco />
          </TabsContent>

          <TabsContent value="dadosTecnicos">
            <AbaDadosTecnicos />
          </TabsContent>

          <TabsContent value="reuniao">
            <CardContent className="pt-6">
              <p>WIP: Componente de Reuniões aqui.</p>
            </CardContent>
          </TabsContent>

          <TabsContent value="documentos">
            <AbaDocumentos />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}