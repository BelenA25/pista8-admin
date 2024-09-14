import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { PlusIcon } from '@radix-ui/react-icons'; 

interface AddButtonProps {
    typeName: string;  
}

export default function AddButton({ typeName }: AddButtonProps) {
    const router = useRouter(); 
    const handleClick = () => {
        router.push(`/${typeName}/create`); 
    };
    return (
        <Button className="w-10 h-10 p-2 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600" onClick={handleClick}>
            <PlusIcon className="w-11 h-11" />
        </Button>
    )
}