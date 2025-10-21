import type { ColumnDef } from '@tanstack/react-table'
import { FilePen, Trash2 } from "lucide-react"
import { Button } from '../components/ui/button';

export type Feriado = {
  id: string;
  dataDoFeriado: string;
  descrição: string;
  tipoDoFeriado: 'Nacional' | 'Local' | 'Facultativo';
  estado: string | null;
}

export const data : Feriado[] = [
  { id: "1", dataDoFeriado: "01/01/2023", descrição: "Confraternização Universal", tipoDoFeriado: "Nacional", estado: null },
  { id: "2", dataDoFeriado: "01/01/2024", descrição: "Confraternização Universal", tipoDoFeriado: "Nacional", estado: null },
  { id: "3", dataDoFeriado: "01/05/2024", descrição: "Dia do Trabalho", tipoDoFeriado: "Nacional", estado: null },
  { id: "4", dataDoFeriado: "02/11/2024", descrição: "Finados", tipoDoFeriado: "Nacional", estado: null },
  { id: "5", dataDoFeriado: "07/09/2024", descrição: "Independência do Brasil", tipoDoFeriado: "Nacional", estado: null },
  { id: "6", dataDoFeriado: "09/07/2024", descrição: "Revolução Constitucionalista", tipoDoFeriado: "Local", estado: "SP" },
  { id: "7", dataDoFeriado: "12/02/2024", descrição: "Carnaval (ponto facultativo)", tipoDoFeriado: "Facultativo", estado: null },
  { id: "8", dataDoFeriado: "12/10/2024", descrição: "Nossa Senhora Aparecida", tipoDoFeriado: "Nacional", estado: null },
  { id: "9", dataDoFeriado: "13/02/2024", descrição: "Carnaval (ponto facultativo)", tipoDoFeriado: "Facultativo", estado: "SP" },
  
];

export const columns: ColumnDef<Feriado>[] = [
  {
    accessorKey: "dataDoFeriado",
    header: "Data do Feriado",
  },
  {
    accessorKey: "descrição",
    header: "Descrição",
  },
  {
    accessorKey: "tipoDoFeriado",
    header: "Tipo do Feriado",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => row.getValue("estado") || "N/A",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <Button 
            variant="outline"
            size="icon"
            className='h-8 w-8'
            onClick={() => {}}
          >
            <FilePen className='h-4 w-4' />
            <span className='sr-only'>Editar</span>
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className='h-8 w-8'
            onClick={() => {
              console.log("Clicou em Editar na linha:", row.original.id)
            }}
          >
            <Trash2 className='h-4 w-4' />
            <span className='sr-only'>Deletar</span>
          </Button>
        </div> 
      )
    },
  },
];