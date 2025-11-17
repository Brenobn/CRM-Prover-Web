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
  filterColumnId: string
  filterPlaceholder: string
  reportName: string
  sheetName: string
}

export function DataTableToolbar<TData>({ 
  table,
  filterColumnId,
  filterPlaceholder,
  reportName,
  sheetName
}: DataTableToolbarProps<TData>) {
  const handleExportPDF = () => {
    const doc = new jsPDF()
    const headers = table.getFlatHeaders()
      .filter(header => header.column.getIsVisible() && header.id !== 'actions')
      .map(header => header.column.columnDef.header as string)

    const body = table.getRowModel().rows.map(row => 
      row.getVisibleCells()
      .map(cell => {
        const value = cell.getValue()
        if (typeof value === 'boolean') {
          return value ? 'Sim' : 'Não'
        }
        return String(value)
      })
    )

    doc.text(reportName, 14, 15)
    autoTable(doc, {
      head: [headers],
      body: body,
      startY: 20,
    })

    const fileName = `${reportName.toLowerCase().replace(/ /g, '-')}.pdf`
    doc.save(fileName)
  }

  const handleExportExcel = () => {
    const headers = table.getFlatHeaders()
      .filter(header => header.column.getIsVisible() && header.id !== 'actions')
      .map(header => ({ id: header.id, name: header.column.columnDef.header as string }))

    const dataToExport = table.getRowModel().rows.map(row => {
      const rowData: Record<string, unknown> = {}
      headers.forEach(header => {
        const value = row.getValue(header.id)

        if (typeof value === 'boolean') {
          rowData[header.name] = value ? 'Sim' : 'Não'
        } else {
          rowData[header.name] = value
        }
      })
      return rowData
    })

    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    XLSX.utils.sheet_add_aoa(worksheet, [headers.map(h => h.name)], { origin: "A1" })

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

    const fileName = `${reportName.toLowerCase().replace(/ /g, '-')}.xlsx`
    XLSX.writeFile(workbook, fileName)
  }

  return(
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input 
          placeholder={filterPlaceholder}
          value={(table.getColumn(filterColumnId)?.getFilterValue() as string) ?? ""}
          onChange={(event) => 
            table.getColumn(filterColumnId)?.setFilterValue(event.target.value)
          }
          className="h-8 w-36 lg:w-3xs dark:placeholder:text-gray-75 dark:text-gray-75"
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


