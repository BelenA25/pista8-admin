import { Button } from "./ui/button";
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { on } from 'events';

interface searchButtonProps {
    onClick: () => void;
}

export default function SearchButton({onClick}: searchButtonProps) {
    return (
        <Button className="bg-white text-black rounded-r-lg flex items-center hover:bg-white hover:text-black">
            <MagnifyingGlassIcon className="w-6 h-6" />
        </Button>
    )
}