import { Button } from "./ui/button";
import { PlusIcon } from '@radix-ui/react-icons'; 

export default function AddButton() {
    return (
        <Button className="w-10 h-10 p-2 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600">
            <PlusIcon className="w-11 h-11" />
        </Button>
    )
}