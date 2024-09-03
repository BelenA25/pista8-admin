import { Button } from "./ui/button";
import { TrashIcon } from '@radix-ui/react-icons';

export default function DeleteButton() {
    return (
        <Button className="w-10 h-10 p-2 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-[#FE420A]">
            <TrashIcon className="w-11 h-11" />
           
        </Button>
    )
}