import { toast } from "sonner"
import { useState, useMemo } from "react"
import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet"
import { DataTablePagination } from "../components/DataTablePagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, 
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../components/ui/alert-dialog'
import { 
  type AtividadeDiaria, 
  data as initialData, 
  vendedores as listaVendedores, 
  equipes as listaEquipes
} from "./DailyActivitiesColumn"
import { DailyActivitiesForm, type AtividadeDiariaFormValues } from "../components/DailyActivitiesForm"
import { ArrowUpDown, FilePen, Trash2 } from "lucide-react"
import { DataTableToolbar } from "../components/DataTableToolbar"

function formatarData(dataString: string) {
  try {
    const data = new Date(dataString + "T00:00:00")
    return data.toLocaleDateString("pt-BR")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return dataString
  }
}

export function DailyActivities() {
  const [data, setData] = useState<AtividadeDiaria[]>(initialData)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingAtividade, setEditingAtividade] = useState<AtividadeDiaria | null>(null)
  const [deletingAtividade, setDeletingAtividade] = useState<AtividadeDiaria | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])

  const equipes = useMemo(() => ["Todos", ...listaEquipes], [])
  const vendedores = useMemo(() => ["Todos", ...listaVendedores], [])

  const columns = useMemo<ColumnDef<AtividadeDiaria>[]>(
    () => [
      { 
        accessorKey: "nomeVendedor",
        header: "Vendedor",
        cell: ({ row }) => {
          const nome = row.getValue("nomeVendedor") as string
          return (
            <div 
              className="truncate max-w-[220px]"
              title={nome}
            >
              {nome}
            </div>
          )
        } 
      },
      { 
        accessorKey: "dataCadastro", 
        header: "Cadastro",
        cell: ({ row }) => formatarData(row.getValue("dataCadastro")) 
      },
      { accessorKey: "linkedin", header: "LinkedIn" },
      { accessorKey: "indicações", header: "Indicações" },
      { accessorKey: "whatsEnviado", header: "Whats" },
      { accessorKey: "interaçõesMensagem", header: "Interações" },
      { accessorKey: "reuniõesAgendadas", header: "Agendadas" },
      { accessorKey: "reuniõesExecutadas", header: "Executadas" },
      { accessorKey: "propostasEnviadas", header: "Propostas" },
      { accessorKey: "quantidadeLigações", header: "Ligações" },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const atividade = row.original
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-blue-400 hover:text-blue-500 hover:border-blue-500"
                onClick={() => {
                  setEditingAtividade(atividade)
                  setIsSheetOpen(true)
                }}
              >
                <FilePen className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8"
                onClick={() => setDeletingAtividade(atividade)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Deletar</span>
              </Button>
            </div>
          )
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting
    },
  })

  function handleFilterChange(columnId: string, value: string) {
    const filterValue = value === "Todos" ? "" : value
    table.getColumn(columnId)?.setFilterValue(filterValue)
  }

  function handleFormSubmit(values: AtividadeDiariaFormValues) {
    if (editingAtividade) {
      setData(currentData => 
        currentData.map(item => 
          item.id === editingAtividade.id 
            ? { ...item, ...values, id: editingAtividade.id, dataCadastro: editingAtividade.dataCadastro } 
            : item
        )
      )
      toast.success(`Atividade de '${values.nomeVendedor}' atualizada com sucesso`)
    } else {
      const newAtividade: AtividadeDiaria = {
        id: (data.length + 1).toString(),
        ...values,
        dataCadastro: new Date().toISOString().split('T')[0],
      }
      setData(currentData => [newAtividade, ...currentData])
      toast.success(`Novo atividade para "${values.nomeVendedor}" criada com sucesso!`)
    }
    setIsSheetOpen(false)
    setEditingAtividade(null)
  }

  function handleDeleteAtividade() {
    if (!deletingAtividade) return
    setData(currentData => currentData.filter(item => item.id !== deletingAtividade.id))
    toast.success(`Atividade de '${deletingAtividade.nomeVendedor}' deletada com sucesso`)
    setDeletingAtividade(null)
  }

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-normal text-gray-150 dark:text-gray-75 -tracking-tight">Atividades Diárias</h1>
          <div className="text-sm text-muted-foreground">
            <a href="#" className="text-blue-500 hover:underline">Home</a>
            <span> / Atividades Diárias</span>
          </div>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={(isOpen) => { setIsSheetOpen(isOpen); if (!isOpen) { setEditingAtividade(null) }}}>
          <SheetTrigger asChild>
            <Button onClick={() => setEditingAtividade(null)}>Adicionar</Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col sm:max-w-md p-0 shadow-xl shadow-gray-125">
            <SheetHeader className="text-left p-6 pb-4 border-b">
              <SheetTitle>{editingAtividade ? "Editar Atividade" : "Adicionar Nova atividade"}</SheetTitle>
              <SheetDescription>{editingAtividade ? "Altere os dados abaixo." : "Preencha os dados para cadastrar"}
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-auto p-6">
              <DailyActivitiesForm onSubmit={handleFormSubmit} initialData={editingAtividade ?? undefined}/>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <div className="rounded-md border text-card-foreground p-4">
        <h3 className="text-sm font-medium mb-2">Filtrar por Atividades</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="equipe-filter" className="text-sm font-medium">Equipe:</Label>
              <Select onValueChange={(value) => handleFilterChange("equipe", value)} defaultValue="Todos">
                <SelectTrigger id="equipe-filter" className="h-8">
                  <SelectValue placeholder="Selecione a equipe" />
                </SelectTrigger>
                <SelectContent>
                  {equipes.map(equipe => (
                    <SelectItem key={equipe} value={equipe}>{equipe}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="felx flex-col gap-2">
              <Label htmlFor="vendedor-filter" className="text-sm font-medium">Vendedor:</Label>
              <Select onValueChange={(value) => handleFilterChange("nomeVendedor", value)} defaultValue="Todos">
                <SelectTrigger id="vendedor-filter" className="h-8">
                  <SelectValue placeholder="Selecione o vendedor" />
                </SelectTrigger>
                <SelectContent>
                  {vendedores.map(vendedor => (
                    <SelectItem key={vendedor} value={vendedor}>{vendedor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="felx flex-col gap-2">
              <Label htmlFor="data-inicial-filter" className="text-sm font-medium">Data Inicial:</Label>
              <Input 
                id="data-inicial-filter"
                type="date"
                className="h-8 dark:scheme-dark"
                onChange={(e) => console.log("Data Inicial:", e.target.value)}
              />
            </div>

            <div className="felx flex-col gap-2">
              <Label htmlFor="data-final-filter" className="text-sm font-medium">Data Inicial:</Label>
              <Input 
                id="data-final-filter"
                type="date"
                className=" h-8 dark:scheme-dark"
                onChange={(e) => console.log("Data Final:", e.target.value)}
              />
            </div>
          </div>
      </div>


      <div>
        <DataTableToolbar 
          table={table} 
          filterColumnId="nomeCliente"
          filterPlaceholder="Buscar por nome do cliente..."
          reportName="Relatório de Leads"
          sheetName="Leads"
        />
      </div>

      <div className="rounded-md border">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : (
                            <Button
                              variant="ghost"
                              onClick={header.column.getToggleSortingHandler()}
                              disabled={!header.column.getCanSort()}
                              className="w-full flex justify-between p-2"
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {header.column.getCanSort() && <ArrowUpDown className="h-4 w-4"/>}
                            </Button>
                          )
                      }
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <DataTablePagination table={table} />
      </div>

      <AlertDialog open={!!deletingAtividade} onOpenChange={() => setDeletingAtividade(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso irá deletar permanentemente a atividade: 
              <br />
              <strong className="font-medium text-foreground">{deletingAtividade?.nomeVendedor}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAtividade}>Sim, deletar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}