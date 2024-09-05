import { Button } from "./ui/button";
import { PlusIcon } from '@radix-ui/react-icons'; 





export default function AddButton() {
    return (
        <div className="flex justify-end"> {/* Este div alinea el botón a la derecha */}
            <Button className="w-10 h-10 p-2 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600">
                <PlusIcon className="w-6 h-6" /> {/* Ajusté el tamaño del ícono también */}
            </Button>
        </div>
    );
}
