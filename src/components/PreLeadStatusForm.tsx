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
  FormMessage,
} from "./ui/form"
import { SheetFooter, SheetClose } from "./ui/sheet"
import { Input } from "./ui/input"
import { Switch } from "./ui/switch"

const formSchema = z.object({
  descrição: z.string().min(3, {
    message: "A descrição deve ter pelo menos 3 caracteres.",
  }),
  ativo: z.boolean().default(true),
})

interface PreLeadStatusFromProps {
  onSubmit: (Values: z.infer<typeof formSchema>) => void
  initialData?: z.infer<typeof formSchema>
}

export function PreLeadStatusForm({ onSubmit, initialData }: PreLeadStatusFromProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      descrição: "",
      ativo: true,
    },
  })

  useEffect(() => {
    if(initialData) {
      form.reset(initialData)
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
                <FormLabel>Descrição do Status</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Atendeu" {...field}/>
                </FormControl>
                <FormMessage />
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
                    Se desmarcado, este status não aparecerá para seleção.
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