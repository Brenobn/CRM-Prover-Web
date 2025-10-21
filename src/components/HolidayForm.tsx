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
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "../components/ui/calendar"
import { cn } from "../lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

const formSchema = z.object({
  dataDoFeriado: z.date({
    required_error: "A data é obrigatória."
  }),
  descrição: z.string().min(3, {
    message: "A descrição dve ter pelo menos 3 caracteres.",
  }),
  tipoDoFeriado: z.enum(["Nacional", "Local", "Facultativo"]),
  estado: z.string().nullable(),
})

interface HolidayFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void
  initialData?: z.infer<typeof formSchema>
}

export function HolidayForm({ onSubmit, initialData }: HolidayFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      dataDoFeriado: new Date(),
      descrição: "",
      tipoDoFeriado: "Nacional",
      estado: null,
    },
  })

  const tipoDoFeriado = form.watch("tipoDoFeriado")

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    } else {
      form.reset({
        dataDoFeriado: new Date(),
        descrição: "",
        tipoDoFeriado: "Nacional",
        estado: null,
      })
    }
  }, [initialData, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
        <div className="space-y-6">
          <FormField 
            control={form.control}
            name="dataDoFeriado"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data do Feriado</FormLabel>
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
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar 
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={ptBR}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField 
            control={form.control}
            name="descrição"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Dia do Trabalho" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />

          <FormField 
            control={form.control}
            name="tipoDoFeriado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo do Feriado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Nacional">Nacional</SelectItem>
                    <SelectItem value="Local">Local</SelectItem>
                    <SelectItem value="Facultativo">Facultativo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {tipoDoFeriado === "Local" && (
            <FormField 
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleciobe o estado"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de </SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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

