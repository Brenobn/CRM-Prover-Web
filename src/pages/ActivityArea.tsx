import { useState } from 'react'
import type { ColumnFiltersState } from '@tanstack/react-table'
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

import { DataTableToolbar } from '../components/DataTableToolbar'
import { DataTablePagination } from '../components/DataTablePagination'

import { columns, data } from './ActivityAreaColumns'
import { Button } from '../components/ui/button'
 
export function ActitvityArea() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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

  return(
    <section className="flex flex-col h-full container gap-4 py-4">
      
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-normal text-gray-150 dark:text-gray-75 -tracking-tight">Área de Atuação</h1>
        <div className="inline-flex text-center gap-1">
          <a href="#" className="text-blue-500 font-light">Home <span className="text-gray-90">/ Área de Atuação</span></a>
        </div>
        <Button>Adicionar Nova Área</Button>
      </div>

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