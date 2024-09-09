import { Button } from "./ui/button";
import { GlobeIcon } from '@radix-ui/react-icons';  

interface WebButtonProps {
    itemId: string;
    link: string;
    itemType: string;
    onClickWeb: () => void;
}

export default function WebButton({link, itemId, itemType, onClickWeb}: WebButtonProps) {
    return(
        <div>
             <Button  className="w-16 h-10 p-2 bg-white text-black rounded-full flex items-center justify-center hover:bg-white">
                <GlobeIcon className="w-11 h-11" />
             </Button>
        </div>
    )
}