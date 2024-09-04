import { Button } from "./ui/button";
import { TrashIcon } from '@radix-ui/react-icons';

interface DeleteButtonProps {
  onClick?: () => void;
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {

    const confirmDelete = () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta startup?")) {
            onClick && onClick();
        }  
    };

    return (
        <Button 
        className="w-10 h-10 p-2 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-[#FE420A]"
        onClick={confirmDelete}
        >
            <TrashIcon className="w-11 h-11" />
        </Button>
    )
}