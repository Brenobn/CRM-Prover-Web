import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useEffect } from "react"

import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { SheetFooter, SheetClose } from "./ui/sheet"
import { Input } from "./ui/input"

const formSchema = z.object({
  descrição: z.string().min(3, {
    message: "O nome do cargo deve ter pelo menos 3 caracteres.",
  }),
  numeroDeDias: z.coerce.number().min(0, {
    message: "O número de dias não pode ser negativo.",
  }),
})

interface DocumentTypeFormProps {
  onSubmit: (Values: z.infer<typeof formSchema>) => void
  initialData?: z.infer<typeof formSchema>
}

export function DocumentTypeForm({ onSubmit, initialData }: DocumentTypeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      descrição: "",
      numeroDeDias: 0,
    },
  })

  useEffect(() => {
    if(initialData) {
      form.reset(initialData)
    } else {
      form.reset({ descrição: "", numeroDeDias: 0 })
    }
  }, [initialData, form])

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full space-y-8">
        <div className="space-y-8">

          <FormField 
            control={form.control}
            name="descrição"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Contrato" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="numeroDeDias"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Dias</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 30" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SheetFooter className="pt-6">
          <SheetClose asChild>
            <Button type="button" variant="outline">Cancelar</Button>
          </SheetClose>
          <Button type="submit">Salvar</Button>
        </SheetFooter>
      </form>
    </Form>
  )
}