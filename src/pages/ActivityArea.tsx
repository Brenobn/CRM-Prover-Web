import { useState, useMemo } from 'react'
import type { ColumnDef, ColumnFiltersState } from '@tanstack/react-table'
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
  TableRow } from "../components/ui/table"
import { Button } from '../components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet'
import { DataTableToolbar } from '../components/DataTableToolbar'
import { DataTablePagination } from '../components/DataTablePagination'
import { AreaDeAruacaoForm } from '../components/ActivityAreaForm'
import type { AreaDeAtuação } from './ActivityAreaColumns'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'

import { data as initialData } from './ActivityAreaColumns'
 
export function ActitvityArea() {
  const [data, setData] = useState<AreaDeAtuação[]>(initialData)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingArea, setEditingArea] = useState<AreaDeAtuação | null>(null)

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
          return(
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className='h-8 w-8 p-0'>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
               <DropdownMenuItem
                onClick={() => {
                  setEditingArea(area)
                  setIsSheetOpen(true)
                }}
               >
                Editar
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
  });

  function handleFormSubmit(values: { descrição: string; ativo: boolean }) {
    if(editingArea) {
      setData(currentData => 
        currentData.map(item => 
          item.id === editingArea.id ? { ...item, ...values } : item
        )
      )
      alert(`Área "${values.descrição}" atulizada!`)
    } else {
      const newArea: AreaDeAtuação = {
        id: (data.length + 1).toString(),
        ...values,
      }
      setData(currentData => [...currentData, newArea])
      alert(`Nova área "${values.descrição}" criada!`)
    }

    setIsSheetOpen(false)
    setEditingArea(null)
  }

  return(
    <section className="h-full flex flex-col container gap-4">
      
      <header className="flex items-center justify-between shrink-0">
        <div className='space-y-1.5'>
          <h1 className="text-2xl font-normal text-gray-150 dark:text-gray-75 -tracking-tight">Área de Atuação</h1>
          <div className="text-sm text-muted-foreground">
            <a href="#" className="text-blue-500 font-light">Home</a>
            <span className="text-gray-90">/ Área de Atuação</span>
          </div>
        </div>

          <Sheet open={isSheetOpen} onOpenChange={(isOpen) => {
            setIsSheetOpen(isOpen)
            if(!isOpen) {
              setEditingArea(null)
            }
          }}>
            <SheetTrigger asChild>
              <Button onClick={() => setEditingArea(null)}>Adicionar Nova Área</Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col sm:max-w-md p-0 shadow-xl shadow-gray-125'>
              <SheetHeader className='text-left p-6 pb-4 border-b'>
                <SheetTitle>
                  {editingArea ? "Editar Área de Atuação" : "Adicionar Nova Área"}
                </SheetTitle>
                <SheetDescription>
                  {editingArea ? "Altere os dados abixo." : "Preencha os dados para cadastrar."}
                </SheetDescription>
              </SheetHeader>
              <div className='flex-1 overflow-auto p-6'>
                <AreaDeAruacaoForm 
                  onSubmit={handleFormSubmit}
                  initialData={editingArea ?? undefined}  
                />
              </div>
            </SheetContent>
          </Sheet>
      </header>

      <div className='shrink-0'>
        <DataTableToolbar table={table} />
      </div>

      <div className="flex-1 rounded-md border overflow-y-auto">
        <Table>
          <TableHeader>
            {table.getLeftHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    }
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
      <DataTablePagination table={table} />
    </section>
  );
}