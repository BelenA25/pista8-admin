import { Button } from "./ui/button";
import { TrashIcon } from '@radix-ui/react-icons';

interface DeleteButtonProps {
  onClick?: () => void;
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {
    return (
        <Button 
        className="w-10 h-10 p-2 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-[#FE420A]"
        onClick={onClick}
        >
            <TrashIcon className="w-11 h-11" />
        </Button>
    )
}