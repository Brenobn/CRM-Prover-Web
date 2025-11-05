import { toast } from 'sonner'
import { useState, useMemo, useEffect } from 'react'
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

function parseBRDateToDate(value: string): Date | null {
  if (!value) return null
  const [dd, mm, yyyy] = value.split('/')
  const iso = `${yyyy}-${mm}-${dd}T00:00:00`
  const date = new Date(iso)
  return isNaN(date.getTime()) ? null : date
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sortBRDate(rowA: any, rowB: any, columnId: string) {
  const a = parseBRDateToDate(rowA.getValue(columnId))
  const b = parseBRDateToDate(rowB.getValue(columnId))
  const at = a?.getTime() ?? -Infinity
  const bt = b?.getTime() ?? -Infinity
  return at === bt ? 0 : at > bt ? 1 : -1
}

export function Holidays() {
  const [data, setData] = useState<Feriado[]>(initialData)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingHoliday, setEditingHoliday] = useState<Feriado | null>(null)
  const [deletingHoliday, setDeletingHoliday] = useState<Feriado | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])
  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')

  const columns = useMemo<ColumnDef<Feriado>[]>(
    () => [
      { 
        accessorKey: "dataDoFeriado", 
        header: "Data do Feriado", 
        sortingFn: sortBRDate,
        filterFn: (row, columnId, value: {from?: string | null; to?: string | null}) => {
          const rowDate = parseBRDateToDate(row.getValue(columnId) as string)
          if (!rowDate) return false
          const fromOk = value?.from ? rowDate >= new Date(`${value.from}T00:00:00`) : true
          const toOk = value?.to ? rowDate <=new Date(`${value.to}T23:59:59`) : true
          return fromOk && toOk
        },
      },
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

  useEffect(() => {
    table.getColumn('dataDoFeriado')?.setFilterValue({
      from: dateFrom || null,
      to: dateTo || null, 
    })
  }, [table, dateFrom, dateTo])

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

      <div className='flex items-center justify-between gap-4 flex-wrap w-full max-w-xl mx-auto'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2'>
            <label className='text-sm text-muted-foreground'>De</label>
            <input 
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className='h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/50' 
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='text-sm text-muted-foreground'>Até</label>
            <input 
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className='h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/50' 
            />
          </div>
          {(dateFrom || dateTo) && (
            <Button variant="outline" onClick={() => { setDateFrom(''); setDateTo('') }}>
              Limpar
            </Button>
          )}
        </div>
      </div>

      <div>
        <DataTableToolbar 
          table={table} 
          filterColumnId='descrição'
          filterPlaceholder='Buscar por descrição...'
          reportName='Relatório de feriados'
          sheetName='Feriados'
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