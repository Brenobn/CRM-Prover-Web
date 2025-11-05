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
import { SalesPhaseForm } from '../components/SalesPhaseForm'
import { ArrowUpDown, FilePen, Trash2 } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog'
import { data as initialData, type FaseVenda } from './SalesPhaseColumns'

export function SalesPhase() {
  const [data, setData] = useState<FaseVenda[]>(initialData)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingPhase, setEditingPhase] = useState<FaseVenda | null>(null)
  const [deletingPhase, setDeletingPhase] = useState<FaseVenda | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<FaseVenda>[]>(
    () => [
      { accessorKey: "ordem", header: "Ordem" },
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
          const phase = row.original
          return (
            <div className='flex items-center gap-2'>
              <Button
                variant="outline"
                size="icon"
                className='h-8 w-8'
                onClick={() => {
                  setEditingPhase(phase)
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
                onClick={() => setDeletingPhase(phase)}
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

  function handleFormSubmit(values: { ordem: number; descrição: string; ativo: boolean }) {
    if (editingPhase) {
      setData(currentData =>
        currentData.map(item =>
          item.id === editingPhase.id ? { ...item, ...values } : item
        )
      )
      toast.success(`Fase de Venda '${values.descrição}' atualizada com sucesso`)
    } else {
      const newPhase: FaseVenda = {
        id: (data.length + 1).toString(),
        ordem: values.ordem,
        descrição: values.descrição,
        ativo: values.ativo,
      }
      setData(currentData => [...currentData, newPhase])
      toast.success(`Nova Fase "${values.descrição}" criada com sucesso!`)
    }
    setIsSheetOpen(false)
    setEditingPhase(null)
  }

  function handleDeletePhase() {
    if (!deletingPhase) return
    setData(currentData => currentData.filter(item => item.id !== deletingPhase.id))
    toast.success(`Fase de Venda'${deletingPhase.descrição}' deletada com sucesso`)
    setDeletingPhase(null)
  }

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-normal text-gray-150 dark:text-gray-75 -tracking-tight">Fase Venda</h1>
          <div className="text-sm text-muted-foreground">
            <a href="#" className="text-blue-500 hover:underline">Home</a>
            <span> / Fase Venda</span>
          </div>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={(isOpen) => { setIsSheetOpen(isOpen); if (!isOpen) { setEditingPhase(null) } }}>
          <SheetTrigger asChild>
            <Button onClick={() => setEditingPhase(null)}>Adicionar</Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col sm:max-w-md p-0 shadow-xl shadow-gray-125">
            <SheetHeader className="text-left p-6 pb-4 border-b">
              <SheetTitle>{editingPhase? "Editar Fase de Venda" : "Adicionar Nova Fase de Venda"}</SheetTitle>
              <SheetDescription>{editingPhase ? "Altere os dados abaixo." : "Preencha os dados para cadastrar."}</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-auto p-6">
              <SalesPhaseForm onSubmit={handleFormSubmit} initialData={editingPhase ?? undefined} />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <div>
        <DataTableToolbar 
          table={table} 
          filterColumnId='descrição'
          filterPlaceholder='Buscar por descrição...'
          reportName='Relatório de fase de venda'
          sheetName='Fase venda'
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
                        header.column.id === 'ativo' ? 'w-[180px]' : 
                        header.column.id === 'actions' ? 'w-[100px]' : 
                        ''
                      }
                    >
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

      <AlertDialog open={!!deletingPhase} onOpenChange={() => setDeletingPhase(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso irá deletar permanentemente a área de atuação:
              <br />
              <strong className="font-medium text-foreground">{deletingPhase?.descrição}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePhase}>Sim, deletar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}