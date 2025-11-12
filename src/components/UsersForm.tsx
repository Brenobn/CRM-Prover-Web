import { z } from "zod"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "./ui/select"
import { Input } from "./ui/input"
import { Checkbox } from "./ui/checkbox"
import type { Usuario } from "../pages/UsersColumns"
import { perfis } from "../pages/UsersColumns"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  nome: z.string().min(2, { message: "O nome deve pelo menos 2 caracteres." }),
  cpf: z.string().min(14, { message: "O CPF deve ter 14 caracteres." }),
  telefone: z.string().min(10, { message: "O telefone é obrigatório." }),
  perfil: z.enum(perfis, { message: "Selecione um perfil." }),
  ativo: z.boolean().default(true),
  podeVender: z.boolean().default(false),
})

export type UsuarioFormValues = z.infer<typeof formSchema>

interface UsuariosFormProps {
  onSubmit: (values: UsuarioFormValues) => void
  initialData?: Usuario
}

export function UsuarioForm({ onSubmit, initialData }: UsuariosFormProps) {
  const form = useForm<UsuarioFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      nome: "",
      cpf: "",
      telefone: "",
      perfil: undefined,
      ativo: true,
      podeVender: false,
    }
  })

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    }
  }, [initialData, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField 
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Nome do usuário" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField 
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="000.000.000-00" {...field} disabled={!!initialData} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(00) 00000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField 
          control={form.control}
          name="perfil"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Perfil</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um perfil" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {perfis.map(perfil => (
                    <SelectItem key={perfil} value={perfil}>{perfil}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="ativo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Ativo</FormLabel>
                <FormDescription>
                  Marque se este usuário pode acessar o sistema.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="podeVender"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Pode Vender ?</FormLabel>
                <FormDescription>
                  Marque se este usuário deve aparecer nas listas de vendedores.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {initialData ? "Salvar Alterações" : "Criar Usuário"}
        </Button>
      </form>
    </Form>
  )
}
