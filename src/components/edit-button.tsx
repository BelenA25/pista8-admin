import { Button } from "./ui/button";
import { Pencil1Icon } from '@radix-ui/react-icons';  

export default function EditButton() {
    return (
        <Button className="w-10 h-10 p-2 bg-yellow-500 text-white rounded-full flex items-center justify-center hover:bg-yellow-600">
            <Pencil1Icon className="w-11 h-11" />
        </Button>
    )
}