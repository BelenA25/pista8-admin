import Typography from "./Typography/typography";
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
  startup_name: string;
  phone: string;
  email: string;
  full_name: string;
  startup_description: string;
  city: string;
}

export default function InformationButton({
  full_name,
  startup_description,
  city,
  startup_name,
  phone,
  email,
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
          <AlertDialogTitle className="flex justify-center">
            {startup_name}
          </AlertDialogTitle>
          <AlertDialogTitle>
            Nombre del emprendedor o emprendedora:
          </AlertDialogTitle>{" "}
          {full_name}
          <AlertDialogTitle>Descripcion:</AlertDialogTitle>{" "}
          {startup_description}
          <AlertDialogTitle>Email:</AlertDialogTitle> {email}
          <AlertDialogTitle>Telefono:</AlertDialogTitle> {phone}
          <AlertDialogTitle>Ciudad:</AlertDialogTitle> {city}
        </AlertDialogHeader>
        <div className="flex justify-center">
          <AlertDialogFooter>
            <AlertDialogAction className="bg-orange-600 hover:bg-orange-400 w-40">
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
