import { Button } from "./ui/button";
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';


export default function SearchButton({ onClick }: { onClick: () => void }) {
    return (
        <Button onClick={onClick} className="bg-white text-black rounded-r-lg flex items-center hover:bg-white hover:text-black">
            <MagnifyingGlassIcon className="w-6 h-6" />
        </Button>
    )
}