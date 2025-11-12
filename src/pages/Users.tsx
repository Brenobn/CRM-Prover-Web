import { toast } from "sonner"
import { useState, useMemo } from "react"
import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Button } from "../components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger, 
} from "../components/ui/sheet"
import { DataTablePagination } from "../components/DataTablePagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../components/ui/alert-dialog"
import { type Usuario, data as initialData, } from "./UsersColumns"
import { UsuarioForm, type UsuarioFormValues } from "../components/UsersForm"
import { ArrowUpDown, FilePen, Trash2 } from "lucide-react"
import { DataTableToolbar } from "../components/DataTableToolbar"

export function Users() {
  const [data, setData] = useState<Usuario[]>(initialData)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<Usuario | null>(null)
  const [deletingUser, setDeletingUser] = useState<Usuario | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<Usuario>[]>(
    () => [
      {
        accessorKey: "fotoUrl",
        header: "Foto",
        cell: ({ row }) => {
          const nome = row.getValue("nome") as string
          const fotoUrl = row.getValue("fotoUrl") as string
          const fallbackSrc = `https://placehold.co/40x40/64748b/FFF?text=${nome.charAt(0).toUpperCase()}`

          return (
            <img 
              src={fotoUrl} 
              alt={nome} 
              className="h-10 w-10 rounded-full object-cover"
              onError={(e) => { e.currentTarget.src = fallbackSrc }}
            />
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: "nome",
        header: "Nome",
        cell: ({ row }) => {
          const nome = row.getValue("nome") as string
          return (
            <div
              className="truncate max-w-[200px]"
              title={nome}
            >
              {nome}
            </div>
          )
        }
      },
      { accessorKey: "cpf", header: "CPF" },
      { accessorKey: "telefone", header: "Telefone" },
      { accessorKey: "perfil", header: "Perfil" },
      {
        accessorKey: "ativo",
        header: "Ativo",
        cell: ({ row }) => (row.getValue("ativo") ? "Sim" : "Não"),
      },
      {
        accessorKey: "podeVender",
        header: "Pode Vender ?",
        cell: ({ row }) => (row.getValue("podeVender") ? "Sim" : "Não"),
      },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const usuario = row.original
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-blue-400 hover:text-blue-500 hover:border-blue-500"
                onClick={() => {
                  setEditingUser(usuario)
                  setIsSheetOpen(true)
                }}
              >
                <FilePen className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8"
                onClick={() => setDeletingUser(usuario)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Deletar</span>
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

  function handleFormSubmit(values: UsuarioFormValues) {
    if (editingUser) {
      setData(currentData => 
        currentData.map(item => 
          item.id === editingUser.id
            ? { ...item, ...values, id: editingUser.id, fotoUrl: editingUser.fotoUrl }
            : item
        )
      )
      toast.success(`Usuário '${values.nome}' atualizado com sucesso`)
    } else {
      const newUsuario: Usuario = {
        id: (data.length + 1).toString(),
        ...values,
        fotoUrl: "",
      }
      setData(currentData => [newUsuario, ...currentData])
      toast.success(`Novo usuário '${values.nome}' criado com sucesso!`)
    }
    setIsSheetOpen(false)
    setEditingUser(null)
  }

  function handleDeleteUsuario() {
    if (!deletingUser) return
    setData(currentData => currentData.filter(item => item.id !== deletingUser.id))
    toast.success(`Usuário '${deletingUser.nome}' deletado com sucesso`)
    setDeletingUser(null)
  }

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-normal text-gray-150 dark:text-gray-75 -tracking-tight">Usuários</h1>
          <div className="text-sm text-muted-foreground">
            <a href="#" className="text-shadow-blue-500 hover:underline">Home</a>
            <span> / Usuários</span>
          </div>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={(isOpen) => { setIsSheetOpen(isOpen); if (!isOpen) { setEditingUser(null) } }}>
          <SheetTrigger asChild>
            <Button onClick={() => setEditingUser(null)}>Adicionar</Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col sm:max-w-md p-0 shadow-xl shadow-gray-125">
            <SheetHeader className="text-left p-6 pb-4 border-b">
              <SheetTitle>{editingUser ? "Editar Usuário" : "Adicionar Novo Usuário"}</SheetTitle>
              <SheetDescription>{editingUser ? "Altere os dados abaixo" : "Preencha os dados para cadastrar"}</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-auto p-6">
              <UsuarioForm onSubmit={handleFormSubmit} initialData={editingUser ?? undefined} />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <div>
        <DataTableToolbar 
          table={table}
          filterColumnId="nome"
          filterPlaceholder="Buscar por nome..."
          reportName="Relatório de Usuários"
          sheetName="Usuários"
        />
      </div>

      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : (
                            <Button
                              variant="ghost"
                              onClick={header.column.getToggleSortingHandler()}
                              disabled={!header.column.getCanSort()}
                              className="w-full flex justify-between p-2"
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {header.column.getCanSort() && <ArrowUpDown className="h-4 w-4"/>}
                            </Button>
                          )
                      }
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

      <AlertDialog open={!!deletingUser} onOpenChange={() => setDeletingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta ?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso irá deletar permanentemente o usuário:
              <br />
              <strong className="font-medium text-foreground">{deletingUser?.nome}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUsuario}>Sim, deletar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

 