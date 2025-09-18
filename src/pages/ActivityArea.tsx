import { toast } from 'sonner'
import { useState, useMemo } from 'react'
import type { ColumnDef, ColumnFiltersState, } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
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
import { AreaDeAruacaoForm } from '../components/ActivityAreaForm'
import type { AreaDeAtuação } from './ActivityAreaColumns'
import { MoreHorizontal } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog'
import { data as initialData } from './ActivityAreaColumns'

export function ActivityArea() {
  const [data, setData] = useState<AreaDeAtuação[]>(initialData)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingArea, setEditingArea] = useState<AreaDeAtuação | null>(null)
  const [deletingArea, setDeletingArea] = useState<AreaDeAtuação | null>(null)

  const columns = useMemo<ColumnDef<AreaDeAtuação>[]>(
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
          const area = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { setEditingArea(area); setIsSheetOpen(true) }}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDeletingArea(area)}>
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
    state: {
      columnFilters,
    },
  })

  function handleFormSubmit(values: { descrição: string; ativo: boolean }) {
    if (editingArea) {
      setData(currentData =>
        currentData.map(item =>
          item.id === editingArea.id ? { ...item, ...values } : item
        )
      )
      toast.success(`Área '${values.descrição}' atualizada com sucesso`)
    } else {
      const newArea: AreaDeAtuação = {
        id: (data.length + 1).toString(),
        ...values,
        descrição: ''
      }
      setData(currentData => [...currentData, newArea])
      toast.success(`Nova área "${values.descrição}" criada com sucesso!`)
    }
    setIsSheetOpen(false)
    setEditingArea(null)
  }

  function handleDeleteArea() {
    if (!deletingArea) return
    setData(currentData => currentData.filter(item => item.id !== deletingArea.id))
    toast.success(`Área '${deletingArea.descrição}' deletada com sucesso`)
    setDeletingArea(null)
  }

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-normal text-gray-150 dark:text-gray-75 -tracking-tight">Áreas de Atuação</h1>
          <div className="text-sm text-muted-foreground">
            <a href="#" className="text-blue-500 hover:underline">Home</a>
            <span> / Área de Atuação</span>
          </div>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={(isOpen) => { setIsSheetOpen(isOpen); if (!isOpen) { setEditingArea(null) } }}>
          <SheetTrigger asChild>
            <Button onClick={() => setEditingArea(null)}>Adicionar</Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col sm:max-w-md p-0 shadow-xl shadow-gray-125">
            <SheetHeader className="text-left p-6 pb-4 border-b">
              <SheetTitle>{editingArea ? "Editar Área de Atuação" : "Adicionar Nova Área"}</SheetTitle>
              <SheetDescription>{editingArea ? "Altere os dados abaixo." : "Preencha os dados para cadastrar."}</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-auto p-6">
              <AreaDeAruacaoForm onSubmit={handleFormSubmit} initialData={editingArea ?? undefined} />
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
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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

      <AlertDialog open={!!deletingArea} onOpenChange={() => setDeletingArea(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso irá deletar permanentemente a área de atuação:
              <br />
              <strong className="font-medium text-foreground">{deletingArea?.descrição}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteArea}>Sim, deletar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}