import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useEffect } from "react"

import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form"
import { SheetFooter, SheetClose } from "./ui/sheet"
import { Input } from "./ui/input"
import { Switch } from "./ui/switch"

const formSchema = z.object({
  empresa: z.string().min(3, {
    message: "O nome da empresa deve ter pelo menos 3 caracteres",
  }),
  cnpj: z.string().optional().nullable().transform(val => val ?? null),
  nomeDoVendedor: z.string().min(3, {
    message: "O nome do vendedor é obrigatório."
  }),
  faseAtual: z.string().optional().nullable().transform(val => val ?? null),
  statusDoCliente: z.string().min(3, {
    message: "O status do cliente é obrigatório."
  }),
  ativo: z.boolean().default(true),
})

interface CustomersFormProps {
  onSubmit: (Values: z.infer<typeof formSchema>) => void
  initialData?: Partial<z.infer<typeof formSchema>>
}

export function CustomersForm({ onSubmit, initialData }: CustomersFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      empresa: "",
      cnpj: "",
      nomeDoVendedor: "",
      faseAtual: "",
      statusDoCliente: "",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full space-y-8">
        <div className="space-y-8 overflow-y-auto px-1 py-2">
          <FormField 
            control={form.control}
            name="empresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Acme Inc." {...field} />
                </FormControl>
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
                  <Input placeholder="00.000.000/0000-00" {...field} value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="faseAtual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fase atual</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Negociação" {...field} value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="ativo"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Ativo</FormLabel>
                  <FormDescription>
                    Se desmarcado, este cliente não aparecerá em realatórios.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <SheetFooter className="pt-6 mt-auto border-t">
          <SheetClose asChild>
            <Button type="button" variant="outline">Cancelar</Button>
          </SheetClose>
          <Button type="submit">Salvar</Button>
        </SheetFooter>
      </form>
    </Form>
  )
}