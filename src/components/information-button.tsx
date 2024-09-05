import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

interface InformationButtonProps {
  full_name: string;
  startup_description: string;
  city: string;
  startup_stage: string;
}

export default function InformationButton({
  full_name,
  startup_description,
  city,
  startup_stage,
}: InformationButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-10 h-10 p-2 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600">
          <QuestionMarkIcon className="w-11 h-11  stroke-current stroke-3" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mas Informacion</AlertDialogTitle>
          <AlertDialogTitle>Nombre Completo:</AlertDialogTitle> {full_name}
          <AlertDialogDescription>{startup_description}</AlertDialogDescription>
          <AlertDialogTitle>Ciudad:</AlertDialogTitle> {city}
          <AlertDialogTitle>Etapa de la Startup:</AlertDialogTitle>{" "}
          {startup_stage}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Cerrar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
