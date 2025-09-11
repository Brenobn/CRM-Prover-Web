import { useState } from 'react'
import type { ColumnFiltersState } from '@tanstack/react-table'
import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable, 
  getPaginationRowModel, 
  getFilteredRowModel 
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

import { columns, data as initialData } from './ActivityAreaColumns'
 
export function ActitvityArea() {
  const [data, setData] = useState<AreaDeAtuação[]>(initialData)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)

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

  function handleFormSubmit(values: { descricao: string; ativo: boolean }) {
    console.log("Adicionando nova área:", values)

    const newArea: AreaDeAtuação = {
      id: (data.length + 1).toString(),
      descrição: values.descricao,
      ativo: values.ativo,
    }

    setData(currentData => [...currentData, newArea])

    setIsSheetOpen(false)
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

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button>Adicionar Nova Área</Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col sm:max-w-md p-0 shadow-xl shadow-gray-125'>
              <SheetHeader className='text-left p-6 pb-4 border-b'>
                <SheetTitle>Adicionar Nova Área de Atução</SheetTitle>
                <SheetDescription>
                  Preencha os dados abaixo para cadastrar uma nova área.
                </SheetDescription>
              </SheetHeader>
              <div className='flex-1 overflow-auto p-6'>
                <AreaDeAruacaoForm onSubmit={handleFormSubmit}/>
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