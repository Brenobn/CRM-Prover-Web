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
import { Button } from "../components/ui/button"
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
import { CustomersForm } from "../components/CustomersForm"
import type { Cliente } from "./CustomersColumns"
import { data as initialData } from "./CustomersColumns"
import { ArrowUpDown, FilePen, Trash2 } from "lucide-react"
import { DataTableToolbar } from "../components/DataTableToolbar"

export function Customers() {
  const [data, setData] = useState<Cliente[]>(initialData)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null)
  const [deletingCliente, setDeletingCliente] = useState<Cliente | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<Cliente>[]>(
    () => [
      { accessorKey: "empresa", header: "Empresa" },
      { accessorKey: "cnpj", header: "CNPJ" },
      { accessorKey: "nomeDoVendedor", header: "Nome do Vendedor" },
      { accessorKey: "faseAtual", header: "Fase atual" },
      {
        accessorKey: "ativo",
        header: "Ativo",
        cell: ({ row }) => (row.getValue("ativo") ? "Sim" : "Não"),
      },
      { accessorKey: "statusDoCliente", header: "Status do cliente" },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const cliente = row.original
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-blue-400 hover:text-blue-500 hover:border-blue-500"
                onClick={() => {
                  setEditingCliente(cliente)
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
                onClick={() => setDeletingCliente(cliente)}
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

  function handleFormSubmit(values: Omit<Cliente, 'id'>) {
    if (editingCliente) {
      setData(currentData => 
        currentData.map(item => 
          item.id === editingCliente.id ? { ...item, ...values } : item
        )
      )
      toast.success(`Cliente '${values.empresa}' atualizado com sucesso`)
    } else {
      const newCliente: Cliente = {
        id: (data.length + 1).toString(),
        ...values,
      }
      setData(currentData => [...currentData, newCliente])
      toast.success(`Novo cliente "${values.empresa}" criado com sucesso!`)
    }
    setIsSheetOpen(false)
    setEditingCliente(null)
  }

  function handleDeleteCliente() {
    if (!deletingCliente) return
    setData(currentData => currentData.filter(item => item.id !== deletingCliente.id))
    toast.success(`Cliente '${deletingCliente.empresa}' deletado com sucesso`)
    setDeletingCliente(null)
  }

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-normal text-gray-150 dark:text-gray-75 -tracking-tight">Clientes</h1>
          <div className="text-sm text-muted-foreground">
            <a href="#" className="text-blue-500 hover:underline">Home</a>
            <span> / Clientes</span>
          </div>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={(isOpen) => { setIsSheetOpen(isOpen); if (!isOpen) { setEditingCliente(null) }}}>
          <SheetTrigger asChild>
            <Button onClick={() => setEditingCliente(null)}>Adicionar</Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col sm:max-w-md p-0 shadow-xl shadow-gray-125">
            <SheetHeader className="text-left p-6 pb-4 border-b">
              <SheetTitle>{editingCliente ? "Editar Cliente" : "Adicionar Novo Cliente"}</SheetTitle>
              <SheetDescription>{editingCliente ? "Altere os dados abaixo." : "Preencha os dados para cadastrar"}
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-auto">
              <CustomersForm onSubmit={handleFormSubmit} initialData={editingCliente ?? undefined}/>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <div>
        <DataTableToolbar table={table} />
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
                        header.column.id === 'empresa' ? 'w-[250px]' : 
                        header.column.id === 'cnpj' ? 'w-[180px]' : 
                        header.column.id === 'nomeDoVendedor' ? 'w-[200px]' : 
                        header.column.id === 'faseAtual' ? 'w-[150px]' : 
                        header.column.id === 'ativo' ? 'w-[100px]' : 
                        header.column.id === 'statusDoCliente' ? 'w-[150px]' : 
                        header.column.id === 'actions' ? 'w-[100px]' : 
                        ''
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : (
                          header.column.id === 'actions' ? (
                            <div className="p-2">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          ) : (
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
                              <ArrowUpDown className="h-4 w-4"/>
                            </Button>
                          )
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
                        cell.column.id === 'empresa' ? 'w-[250px]' : 
                        cell.column.id === 'cnpj' ? 'w-[180px]' : 
                        cell.column.id === 'nomeDoVendedor' ? 'w-[200px]' : 
                        cell.column.id === 'faseAtual' ? 'w-[150px]' : 
                        cell.column.id === 'ativo' ? 'w-[100px]' : 
                        cell.column.id === 'statusDoCliente' ? 'w-[150px]' : 
                        cell.column.id === 'actions' ? 'w-[100px]' : 
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

      <AlertDialog open={!!deletingCliente} onOpenChange={() => setDeletingCliente(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso irá deletar permanentemente o cliente: 
              <br />
              <strong className="font-medium text-foreground">{deletingCliente?.empresa}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCliente}>Sim, deletar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}