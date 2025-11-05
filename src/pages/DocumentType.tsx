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
import { DocumentTypeForm } from '../components/DocumentTypeForm'
import { ArrowUpDown, FilePen, Trash2 } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog'
import { data as initialData, type TipoDocumento } from './DocumentTypeColumns'

export function DocumentType() {
  const [data, setData] = useState<TipoDocumento[]>(initialData)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingDocType, setEditingDocType] = useState<TipoDocumento | null>(null)
  const [deletingDocType, setDeletingDocType] = useState<TipoDocumento | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<TipoDocumento>[]>(
    () => [
      { accessorKey: "descrição", header: "Descrição" },
      { accessorKey: "numeroDeDias", header: "Número de dias" },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const docType = row.original
          return (
            <div className='flex items-center gap-2'>
              <Button
                variant="outline"
                size="icon"
                className='h-8 w-8'
                onClick={() => {
                  setEditingDocType(docType)
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
                onClick={() => setDeletingDocType(docType)}
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

  function handleFormSubmit(values: { descrição: string; numeroDeDias: number }) {
    if (editingDocType) {
      setData(currentData =>
        currentData.map(item =>
          item.id === editingDocType.id ? { ...item, ...values } : item
        )
      )
      toast.success(`Tipo de Documento '${values.descrição}' atualizado com sucesso`)
    } else {
      const newDocType: TipoDocumento = {
        id: (data.length + 1).toString(),
        descrição: values.descrição,
        numeroDeDias: values.numeroDeDias,
      }
      setData(currentData => [...currentData, newDocType])
      toast.success(`Novo Tipo de Documento "${values.descrição}" criado com sucesso!`)
    }
    setIsSheetOpen(false)
    setEditingDocType(null)
  }

  function handleDeleteDocType() {
    if (!deletingDocType) return
    setData(currentData => currentData.filter(item => item.id !== deletingDocType.id))
    toast.success(`Tipo de Documento '${deletingDocType.descrição}' deletado com sucesso`)
    setDeletingDocType(null)
  }

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-normal text-gray-150 dark:text-gray-75 -tracking-tight">Tipo Documento</h1>
          <div className="text-sm text-muted-foreground">
            <a href="#" className="text-blue-500 hover:underline">Home</a>
            <span> / Tipo Documento</span>
          </div>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={(isOpen) => { setIsSheetOpen(isOpen); if (!isOpen) { setEditingDocType(null) } }}>
          <SheetTrigger asChild>
            <Button onClick={() => setEditingDocType(null)}>Adicionar</Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col sm:max-w-md p-0 shadow-xl shadow-gray-125">
            <SheetHeader className="text-left p-6 pb-4 border-b">
              <SheetTitle>{editingDocType ? "Editar Cargo" : "Adicionar Novo Status"}</SheetTitle>
              <SheetDescription>{editingDocType ? "Altere os dados abaixo." : "Preencha os dados para cadastrar."}</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-auto p-6">
              <DocumentTypeForm onSubmit={handleFormSubmit} initialData={editingDocType ?? undefined} />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <div>
        <DataTableToolbar 
          table={table} 
          filterColumnId='descrição'
          filterPlaceholder='Buscar por descrição...'
          reportName='Relatório de tipo de documento'
          sheetName='Tipo documento'
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

      <AlertDialog open={!!deletingDocType} onOpenChange={() => setDeletingDocType(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso irá deletar permanentemente o tipo de documento:
              <br />
              <strong className="font-medium text-foreground">{deletingDocType?.descrição}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDocType}>Sim, deletar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}