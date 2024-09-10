import { Button } from "./ui/button";
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

interface SearchCardProps {
    onClick?: () => void;
 }
export default function SearchButton({ onClick }: SearchCardProps) {
    return (
        <Button 
        className="bg-white text-black rounded-r-lg flex items-center hover:bg-white hover:text-black"
        onClick={onClick}
        >
            <MagnifyingGlassIcon className="w-6 h-6" />
        </Button>
    )
}