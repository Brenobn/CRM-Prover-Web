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
import { HolidayForm } from '../components/HolidayForm'
import { ArrowUpDown, FilePen, Trash2 } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog'
import { data as initialData, type Feriado } from './HolidaysColumns'

export function Holidays() {
  const [data, setData] = useState<Feriado[]>(initialData)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingHoliday, setEditingHoliday] = useState<Feriado | null>(null)
  const [deletingHoliday, setDeletingHoliday] = useState<Feriado | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<Feriado>[]>(
    () => [
      { accessorKey: "dataDoFeriado", header: "Data do Feriado" },
      { accessorKey: "descrição", header: "Descrição" },
      { accessorKey: "tipoDoFeriado", header: "Tipo do Feriado" },
      {
        accessorKey: "estado",
        header: "Estado",
        cell: ({ row }) => row.getValue("estado") || "N/A",
      },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const holiday = row.original
          return (
            <div className='flex items-center gap-2'>
              <Button
                variant="outline"
                size="icon"
                className='h-8 w-8'
                onClick={() => {
                  setEditingHoliday(holiday)
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
                onClick={() => setDeletingHoliday(holiday)}
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

  function handleFormSubmit(values: { dataDoFeriado: Date; descrição: string; tipoDoFeriado: "Nacional" | "Local" | "Facultativo"; estado: string | null }) {
    if (editingHoliday) {
      setData(currentData =>
        currentData.map(item =>
          item.id === editingHoliday.id ? { ...item, ...values, dataDoFeriado: values.dataDoFeriado.toLocaleDateString('pt-BR') } : item
        )
      )
      toast.success(`Feriado '${values.descrição}' atualizado com sucesso`)
    } else {
      const newHoliday: Feriado = {
        id: (data.length + 1).toString(),
        descrição: values.descrição,
        dataDoFeriado: values.dataDoFeriado.toLocaleDateString('pt-BR'),
        tipoDoFeriado: values.tipoDoFeriado,
        estado: values.estado,
      }
      setData(currentData => [...currentData, newHoliday])
      toast.success(`Nova feriado "${values.descrição}" criado com sucesso!`)
    }
    setIsSheetOpen(false)
    setEditingHoliday(null)
  }

  function handleDeleteHoliday() {
    if (!deletingHoliday) return
    setData(currentData => currentData.filter(item => item.id !== deletingHoliday.id))
    toast.success(`Feriado '${deletingHoliday.descrição}' deletado com sucesso`)
    setDeletingHoliday(null)
  }

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-normal text-gray-150 dark:text-gray-75 -tracking-tight">Feriados</h1>
          <div className="text-sm text-muted-foreground">
            <a href="#" className="text-blue-500 hover:underline">Home</a>
            <span> / Feriados</span>
          </div>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={(isOpen) => { setIsSheetOpen(isOpen); if (!isOpen) { setEditingHoliday(null) } }}>
          <SheetTrigger asChild>
            <Button onClick={() => setEditingHoliday(null)}>Adicionar</Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col sm:max-w-md p-0 shadow-xl shadow-gray-125">
            <SheetHeader className="text-left p-6 pb-4 border-b">
              <SheetTitle>{editingHoliday ? "Editar Feriado" : "Adicionar Novo Feriado"}</SheetTitle>
              <SheetDescription>{editingHoliday ? "Altere os dados abaixo." : "Preencha os dados para cadastrar."}</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-auto p-6">
              <HolidayForm onSubmit={handleFormSubmit} initialData={editingHoliday ? {...editingHoliday, dataDoFeriado: new Date(editingHoliday.dataDoFeriado.split('/').reverse().join('-')) } : undefined } />
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
                        header.column.id === 'ativo' ? 'w-[180px]' : 
                        header.column.id === 'actions' ? 'w-[100px]' : 
                        ''
                      }  
                    >
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
                          <ArrowUpDown className='h-4 w-4' />
                        )}
                      </Button>
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

      <AlertDialog open={!!deletingHoliday} onOpenChange={() => setDeletingHoliday(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso irá deletar permanentemente a área de atuação:
              <br />
              <strong className="font-medium text-foreground">{deletingHoliday?.descrição}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteHoliday}>Sim, deletar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}