import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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
import { Input } from "./ui/input"
import { Switch } from "./ui/switch"

const formSchema = z.object({
  descricao: z.string().min(3, {
    message: "A descrição deve ter pelo menos 3 caracteres.",
  }),
  ativo: z.boolean().default(true),
})

interface AreaDeAruacaoFormProps {
  onSubmit: (Values: z.infer<typeof formSchema>) => void
}

export function AreaDeAtuacaoForm({ onSubmit }: AreaDeAruacaoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: "",
      ativo: true,
    },
  })

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField 
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Advocacia" {...field}/>
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
                  Se desmarcado, esta área não aparecerá para seleção.
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
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  )
}