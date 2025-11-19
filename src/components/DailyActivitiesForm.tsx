import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useEffect } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "../lib/utils"
import { vendedores } from "../pages/DailyActivitiesColumn"

const formSchema = z.object({
  dataCadastro: z.date({
    required_error: "A data de cadastro é obrigatória",
  }),
  linkedin: z.string().optional(),
  indicação: z.string().optional(),
  whatsappsEnviados: z.coerce.number().min(0).default(0),
  interaçõesMensagens: z.coerce.number().min(0).default(0),
  propostasEnviadas: z.coerce.number().min(0).default(0),
  vendedor: z.string().min(1, "Selecione um vendedor."),
  quantidadesLigações: z.coerce.number().min(0).default(0),
  reuniãoExecutada: z.coerce.number().min(0).default(0),
  reuniõesAgendadas: z.coerce.number().min(0).default(0),
  observações: z.string().optional(),
})

export type AtividadeDiariaFormValues = z.infer<typeof formSchema>

interface DailyActivitiesFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void
  initialData?: z.infer<typeof formSchema>
}


export function DailyActivitiesForm({ onSubmit, initialData }: DailyActivitiesFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      dataCadastro: new Date(),
      linkedin: "",
      indicação: "",
      whatsappsEnviados: 0,
      interaçõesMensagens: 0,
      propostasEnviadas: 0,
      vendedor: "",
      quantidadesLigações: 0,
      reuniãoExecutada: 0,
      reuniõesAgendadas: 0,
      observações: "",
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    } else {
      form.reset({
        dataCadastro: new Date(),
        linkedin: "",
        indicação: "",
        whatsappsEnviados: 0,
        interaçõesMensagens: 0,
        propostasEnviadas: 0,
        vendedor: "",
        quantidadesLigações: 0,
        reuniãoExecutada: 0,
        reuniõesAgendadas: 0,
        observações: "",
      })
    }
  }, [initialData, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
        <div className="space-y-6 flex-1 overflow-y-auto px-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField 
              control={form.control}
              name="dataCadastro"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de Cadastro</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy", { locale: ptBR })
                          ): (
                            <span>Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar 
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => 
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input placeholder="URL ou Perfil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField 
              control={form.control}
              name="indicação"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Indicação</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome ou Origem" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="whatsappsEnviados"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApps Enviados</FormLabel>
                  <FormControl>
                    <Input type="number" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField 
              control={form.control}
              name="interaçõesMensagens"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interações de mensagens</FormLabel>
                  <FormControl>
                    <Input type="number" {...field}/>
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
                    <Input type="number" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField 
              control={form.control}
              name="vendedor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendedor</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vendedores?.map((vendedor: string) => (
                        <SelectItem key={vendedor} value={vendedor}>{vendedor}</SelectItem>
                      )) || (
                        <>
                          <SelectItem value="Camilla">Camilla</SelectItem>
                          <SelectItem value="Felipe">Felipe</SelectItem>
                          <SelectItem value="Fernando">Fernando</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="quantidadesLigações"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidades de ligações</FormLabel>
                  <FormControl>
                    <Input type="number" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField 
              control={form.control}
              name="reuniãoExecutada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reunião executada</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField 
            control={form.control}
            name="observações"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Digite suas observações aqui..."
                    className="resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <SheetFooter className="pt-6 mt-auto">
          <SheetClose asChild>
            <Button type="button" variant="outline">Cancelar</Button>
          </SheetClose>
          <Button type="submit">Salvar Atividades</Button>
        </SheetFooter>
      </form>
    </Form>
  )
}