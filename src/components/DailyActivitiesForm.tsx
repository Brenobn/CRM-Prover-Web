import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
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
import type { AtividadeDiaria } from "../pages/DailyActivitiesColumn"
import { vendedores } from "../pages/DailyActivitiesColumn"
import { useEffect } from "react"

const formSchema = z.object({
  nomeVendedor: z.string({ required_error: "Selecione um vendedor." }),
  linkedin: z.coerce.number().min(0, { message: "Deve ser no mínimo 0." }),
  indicações: z.coerce.number().min(0, { message: "Deve ser no mínimo 0." }),
  whatsEnviado: z.coerce.number().min(0, { message: "Deve ser no mínimo 0." }),
  interaçõesMensagem: z.coerce.number().min(0, { message: "Deve ser no mínimo 0." }),
  reuniõesAgendadas: z.coerce.number().min(0, { message: "Deve ser no mínimo 0." }),
  reuniõesExecutadas: z.coerce.number().min(0, { message: "Deve ser no mínimo 0." }),
  propostasEnviadas: z.coerce.number().min(0, { message: "Deve ser no mínimo 0." }),
  quantidadeLigações: z.coerce.number().min(0, { message: "Deve ser no mínimo 0." }),
})

export type AtividadeDiariaFormValues = z.infer<typeof formSchema>

interface AtividadesDiariasFormProps {
  onSubmit: (values: AtividadeDiariaFormValues) => void
  initialData?: AtividadeDiaria
}

export function DailyActivitiesForm({ onSubmit, initialData }: AtividadesDiariasFormProps) {
  const form = useForm<AtividadeDiariaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      nomeVendedor: undefined,
      linkedin: 0,
      indicações: 0,
      whatsEnviado: 0,
      interaçõesMensagem: 0,
      reuniõesAgendadas: 0,
      reuniõesExecutadas: 0,
      propostasEnviadas: 0,
      quantidadeLigações: 0,
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
          name="nomeVendedor"
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

        <div className="grid grid-cols-2 gap-4">
          <FormField 
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Linkedin</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="indicações"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indicações</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="interaçõesMensagem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interações</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="reuniõesAgendadas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reuniões Agendadas</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="propostasEnviadas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Propostas Enviadas</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="quantidadeLigações"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ligações</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          {initialData ? "Salvar Aterações" : "Criar Atividade"}
        </Button>
      </form>
    </Form>
  )
}