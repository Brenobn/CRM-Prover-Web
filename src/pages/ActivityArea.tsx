import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

import { columns } from './ActivityAreaColumns'

export type AreaDeAtuação = {
  id: string;
  descrição: string;
  ativo: boolean;
}

const data : AreaDeAtuação[] = [
  { id: "1", descrição: "Administração pública, defesa e seguridade social.", ativo: true },
  { id: "2", descrição: "Advocacia", ativo: true },
  { id: "3", descrição: "Agronegócio", ativo: false },
  { id: "4", descrição: "Água e esgoto", ativo: true },
  { id: "5", descrição: "Alimentação e bebidas", ativo: true },
  { id: "6", descrição: "Alimentos", ativo: true },
  { id: "7", descrição: "Alimentos e bebidas", ativo: true },
  { id: "8", descrição: "Armazenamento e atividades auxiliares dos transportes", ativo: true },
  { id: "9", descrição: "Artes, cultutra, esporte e recreação", ativo: true },
  { id: "10", descrição: "Atividades de bem-estar e condicionamento físico", ativo: true },
  { id: "11", descrição: "Atividades de consultoria em gestão empresarial", ativo: true },
  { id: "12", descrição: "Atividades de contabilidade", ativo: true },
  { id: "13", descrição: "Atividades de serviços Financeiros", ativo: true },
  { id: "14", descrição: "Atividades de vigilância e segurança", ativo: true },
  { id: "15", descrição: "Atividades esportivas para audiências", ativo: true },
  { id: "16", descrição: "Atividades ligadas ao patrimônio cultural e ambiental", ativo: true },
  { id: "17", descrição: "Atividades veterinárias", ativo: true },
  { id: "18", descrição: "Automação Industrial", ativo: true},
  { id: "19", descrição: "AUTOMOTIVO", ativo: true },
];
 
export function ActitvityArea() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return(
    <section className="container mx-auto py-10">
      <div className="flex items-center justify-between mt-5">
        <h1 className="text-2xl font-normal text-gray-150 dark:text-gray-75 -tracking-tight">Área de Atuação</h1>
        <div className="inline-flex text-center gap-1">
          <a href="#" className="text-blue-500 font-light">Home <span className="text-gray-90">/ Área de Atuação</span></a>
        </div>
      </div>

      <div className="rounded-md border">
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
    </section>
  );
}