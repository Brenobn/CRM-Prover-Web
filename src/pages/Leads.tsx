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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../components/ui/sheet"
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
import { LeadsForm, type LeadFormValues } from "../components/LeadsForm"
import type { Lead } from "./LeadsColumns"
import { data as initialData } from "./LeadsColumns"
import { ArrowUpDown, FilePen, Trash2 } from "lucide-react"
import { DataTableToolbar } from "../components/DataTableToolbar"
import { LeadDetail } from "./LeadDetail"

type ViewState = {
  page: "list" | "detail"
  leadId: string | null
}

export function Leads() {
  const [data, setData] = useState<Lead[]>(initialData)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])
  const [view, setView] = useState<ViewState>({ page: "list", leadId: null })

  const vendedores = useMemo(() => {
    const allVendedores = data.map(lead => lead.vendedor)
    return ["Todos", ...Array.from(new Set(allVendedores))]
  }, [data])

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      { 
        accessorKey: "nomeCliente",
        header: "Nome do Cliente",
        cell: ({ row }) => {
          const nome = row.getValue("nomeCliente") as string
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
      { accessorKey: "cnpj", header: "CNPJ" },
      { 
        accessorKey: "vendedor", 
        header: "Vendedor",
        cell: ({ row }) => {
          const vendedor = row.getValue("vendedor") as string
          return (
            <div 
              className="truncate max-w-[220px]"
              title={vendedor}
            >
              {vendedor}
            </div>
          )
        } 
      },
      { accessorKey: "faseVenda", header: "Fase Venda" },
      {
        accessorKey: "ativo",
        header: "Ativo",
        cell: ({ row }) => (row.getValue("ativo") ? "Sim" : "Não"),
      },
      { accessorKey: "status", header: "Status" },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const lead = row.original
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-blue-400 hover:text-blue-500 hover:border-blue-500"
                onClick={() => {
                  setEditingLead(lead)
                  setIsSheetOpen(true)
                }}
                title="Editar (Detalhes)"
              >
                <FilePen className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8"
                onClick={() => setDeletingLead(lead)}
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

  function handleVendedorFilterChange(vendedor: string) {
    const value = vendedor === "Todos" ? "" : vendedor
    table.getColumn("vendedor")?.setFilterValue(value)
  }

  function handleFormSubmit(values: LeadFormValues) {
    if (editingLead) {
      setData(currentData => 
        currentData.map(item => 
          item.id === editingLead.id ? { ...item, ...values, id: editingLead.id } : item
        )
      )
      toast.success(`Lead '${values.nomeCliente}' atualizado com sucesso`)
    } 

    setIsSheetOpen(false)
    setEditingLead(null)
  }

  function handleDeleteLead() {
    if (!deletingLead) return
    setData(currentData => currentData.filter(item => item.id !== deletingLead.id))
    toast.success(`Lead '${deletingLead.nomeCliente}' deletado com sucesso`)
    setDeletingLead(null)
  }

  switch (view.page) {
    case "detail":
      return (
        <LeadDetail 
          leadId={view.leadId}
          onBack={() => setView({ page: "list", leadId: null })}
        />
      )

    case "list" :
    default:   
      return (
        <div className="space-y-4">
          <header className="flex items-start justify-between">
            <div className="space-y-1.5">
              <h1 className="text-2xl font-normal text-gray-150 dark:text-gray-75 -tracking-tight">Leads</h1>
              <div className="text-sm text-muted-foreground">
                <a href="#" className="text-blue-500 hover:underline">Home</a>
                <span> / Leads</span>
              </div>
            </div>

            <Button onClick={() => setView({ page: 'detail', leadId: null })}>
              Adicionar
            </Button>
            
            <Sheet open={isSheetOpen} onOpenChange={(isOpen) => { setIsSheetOpen(isOpen); if (!isOpen) { setEditingLead(null) }}}>
              <SheetContent className="flex flex-col sm:max-w-md p-0 shadow-xl shadow-gray-125">
                <SheetHeader className="text-left p-6 pb-4 border-b">
                  <SheetTitle>{editingLead ? "Editar Lead" : "Adicionar Novo Lead"}</SheetTitle>
                  <SheetDescription>{editingLead ? "Altere os dados abaixo." : "Preencha os dados para cadastrar"}
                  </SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-auto p-6">
                  <LeadsForm onSubmit={handleFormSubmit} initialData={editingLead ?? undefined}/>
                </div>
              </SheetContent>
            </Sheet>
          </header>
    
          <div className="rounded-md border text-card-foreground p-4">
            <h3 className="text-sm font-medium mb-2">Filtrar por Vendedor</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Select onValueChange={handleVendedorFilterChange} defaultValue="Todos">
                    <SelectTrigger id="vendedor-filter" className="h-8 w-48">
                      <SelectValue placeholder="Selecione o vendedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendedores.map(vendedor => (
                        <SelectItem key={vendedor} value={vendedor}>{vendedor}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead 
                          key={header.id}
                          className={
                            header.column.id === 'nomeCliente' ? 'w-[25%]' : 
                            header.column.id === 'cnpj' ? 'w-[15%]' :
                            header.column.id === 'vendedor' ? 'w-[18%]' :
                            header.column.id === 'faseVenda' ? 'w-[15%]' :
                            header.column.id === 'ativo' ? 'w-[10%]' : 
                            header.column.id === 'status' ? 'w-[8%]' :  
                            header.column.id === 'actions' ? 'w-[9%]' :
                            ''   
                          }
                        >
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
                        <TableCell 
                          key={cell.id}
                          className={
                            cell.column.id === 'nomeCliente' ? 'w-[25%]' : 
                            cell.column.id === 'cnpj' ? 'w-[15%]' :
                            cell.column.id === 'vendedor' ? 'w-[18%]' :
                            cell.column.id === 'faseVenda' ? 'w-[15%]' : 
                            cell.column.id === 'ativo' ? 'w-[10%]' : 
                            cell.column.id === 'status' ? 'w-[8%]' :
                            cell.column.id === 'actions' ? 'w-[9%]' : 
                            ''
                          }
                        >
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
    
          <AlertDialog open={!!deletingLead} onOpenChange={() => setDeletingLead(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. Isso irá deletar permanentemente o lead: 
                  <br />
                  <strong className="font-medium text-foreground">{deletingLead?.nomeCliente}</strong>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteLead}>Sim, deletar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
  }
}