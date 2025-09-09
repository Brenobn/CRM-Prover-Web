import type { Table } from "@tanstack/react-table"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuTrigger, DropdownMenuContent } from "./ui/dropdown-menu"
import { SlidersHorizontal } from "lucide-react"

import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const handleExportPDF = () => {
    const doc = new jsPDF()
    const headers = table.getFlatHeaders().map(header => header.column.columnDef.header as string)
    const body = table.getRowModel().rows.map(row => row.getVisibleCells().map(cell => cell.getValue() as string))

    doc.text("Relatório de Áreas de Atuação", 14, 15)
    autoTable(doc, {
      head: [headers],
      body: body,
      startY: 20,
    })
    doc.save('areas-de-atuacao.pdf')
  }

  const handleExportExcel = () => {
    const dataToExport = table.getRowModel().rows.map(row => (row.original))
    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Áreas de Atuação")
    XLSX.writeFile(workbook, 'areas-de-atuacao.xlxs')
  }

  return(
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input 
          placeholder="Buscar por descrição..."
          value={(table.getColumn("descricao")?.getFilterValue() as string) ?? ""}
          onChange={(event) => 
            table.getColumn("descricao")?.setFilterValue(event.target.value)
          }
          className="h-8 w-36 lg:w-3xs"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleExportExcel}>Excel</Button>
        <Button variant="outline" size="sm" onClick={handleExportPDF}>PDF</Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Colunas Visíveis
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            {table
              .getAllColumns()
              .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
              .map((column) => {
                return(
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(isChecked) => column.toggleVisibility(!!isChecked)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}


