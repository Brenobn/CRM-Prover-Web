import { toast } from 'sonner'
import { useState, useMemo } from 'react'
import type { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'
import { Button } from '../components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet'
import { DataTableToolbar } from '../components/DataTableToolbar'
import { DataTablePagination } from '../components/DataTablePagination'
import { ProposalRefusalReasonForm } from '../components/ProposalRefusalReasonForm'
import { ArrowUpDown, FilePen, Trash2 } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog'
import { data as initialData, type MotivoRecusaProposta } from './ProposalRefusalReasonColumns'

export function ProposalRefusalReason() {
  const [data, setData] = useState<MotivoRecusaProposta[]>(initialData)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingReason, setEditingReason] = useState<MotivoRecusaProposta | null>(null)
  const [deletingReason, setDeletingReason] = useState<MotivoRecusaProposta | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<MotivoRecusaProposta>[]>(
    () => [
      { accessorKey: "descrição", header: "Descrição" },
      {
        accessorKey: "ativo",
        header: "Ativo",
        cell: ({ row }) => (row.getValue("ativo") ? "Sim" : "Não"),
      },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const reason = row.original
          return (
            <div className='flex items-center gap-2'>
              <Button
                variant="outline"
                size="icon"
                className='h-8 w-8'
                onClick={() => {
                  setEditingReason(reason)
                  setIsSheetOpen(true)
                }}
              >
                <FilePen className='h-4 w-4' />
                <span className='sr-only'>Editar</span>
              </Button>
              <Button
                variant="destructive"
                size="icon"
                className='h-8 w-8'
                onClick={() => setDeletingReason(reason)}
              >
                <Trash2 className='h-4 w-4' />
                <span className='sr-only'>Deletar</span>
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

  function handleFormSubmit(values: { descrição: string; ativo: boolean }) {
    if (editingReason) {
      setData(currentData =>
        currentData.map(item =>
          item.id === editingReason.id ? { ...item, ...values } : item
        )
      )
      toast.success(`Motivo '${values.descrição}' atualizado com sucesso`)
    } else {
      const newReason: MotivoRecusaProposta = {
        id: (data.length + 1).toString(),
        descrição: values.descrição,
        ativo: values.ativo,
      }
      setData(currentData => [...currentData, newReason])
      toast.success(`Novo motivo "${values.descrição}" criado com sucesso!`)
    }
    setIsSheetOpen(false)
    setEditingReason(null)
  }

  function handleDeleteReason() {
    if (!deletingReason) return
    setData(currentData => currentData.filter(item => item.id !== deletingReason.id))
    toast.success(`Motivo '${deletingReason.descrição}' deletado com sucesso`)
    setDeletingReason(null)
  }

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-normal text-gray-150 dark:text-gray-75 -tracking-tight">Motivo da Rescusa de Proposta</h1>
          <div className="text-sm text-muted-foreground">
            <a href="#" className="text-blue-500 hover:underline">Home</a>
            <span> / Motivo da Recusa de Proposta</span>
          </div>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={(isOpen) => { setIsSheetOpen(isOpen); if (!isOpen) { setEditingReason(null) } }}>
          <SheetTrigger asChild>
            <Button onClick={() => setEditingReason(null)}>Adicionar</Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col sm:max-w-md p-0 shadow-xl shadow-gray-125">
            <SheetHeader className="text-left p-6 pb-4 border-b">
              <SheetTitle>{editingReason ? "Editar Motivo" : "Adicionar Novo Motivo"}</SheetTitle>
              <SheetDescription>{editingReason ? "Altere os dados abaixo." : "Preencha os dados para cadastrar."}</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-auto p-6">
              <ProposalRefusalReasonForm onSubmit={handleFormSubmit} initialData={editingReason ?? undefined} />
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
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : (
                          <Button
                            variant="ghost"
                            onClick={header.column.getToggleSortingHandler()}
                            disabled={header.column.id === 'actions'} 
                            className='w-full flex justify-between p-2'
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.id !== 'actions' && (
                              <ArrowUpDown className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                    </TableHead>
                  );
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

      <AlertDialog open={!!deletingReason} onOpenChange={() => setDeletingReason(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso irá deletar permanentemente a área de atuação:
              <br />
              <strong className="font-medium text-foreground">{deletingReason?.descrição}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteReason}>Sim, deletar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}