import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
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
import type { Lead } from "../pages/LeadsColumns"
import { useEffect } from "react"

const fasesVenda = ["Prospecção", "Primeira Reunião", "Proposta", "Negociação", "Fechamento"] as const
const statusLead = ["Lead", "Oportunidade", "Cliente", "Perdido"] as const
const vendedores = ["Camilla", "Felipe de Oliveira Santos", "Elisa Xavier", "Marcelle Pereira dos Santos", "Eduarda Garcia"]

const formSchema = z.object({
  nomeCliente : z.string().min(2, { message: "O nome do cliente deve ter pelo menos 2 caracteres" }),
  cnpj: z.string().min(14, { message: "O CNPJ deve ter 14 caracteres." }).max(18, { message: "O CNPJ deve ter no máximo 18 caracteres." }),
  vendedor: z.string({ required_error: "Selecione um vendedor." }),
  faseVenda: z.enum(fasesVenda, { required_error: "Selecione a fase da venda." }),
  status: z.enum(statusLead, { required_error: "Selicione o status do lead" }),
  ativo: z.boolean().default(true),
})

export type LeadFormValues = z.infer<typeof formSchema>

interface LeadFormProps {
  onSubmit: (values: LeadFormValues) => void
  initialData?: Lead
}

export function LeadsForm({ onSubmit, initialData }: LeadFormProps) {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      nomeCliente: "",
      cnpj: "",
      vendedor: undefined,
      faseVenda: "Prospecção",
      status: "Lead",
      ativo: true,
    },
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
          name="nomeCliente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Cliente</FormLabel>
              <FormControl>
                <Input placeholder="Nome da empresa cliente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="cnpj"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <Input placeholder="00.000.000/0000-00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="vendedor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendedor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um vendedor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vendedores.map(vendedor => (
                    <SelectItem key={vendedor} value={vendedor}>{vendedor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="faseVenda"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fase da Venda</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a fase" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fasesVenda.map(fase => (
                    <SelectItem key={fase} value={fase}>{fase}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="status"
          render={({ field}) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statusLead.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
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
                  Marque se este lead está ativo.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">{initialData ? "Salvar Alterações" : "Criar Lead"}</Button>
      </form>
    </Form>
  )
}