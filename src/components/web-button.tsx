import { Button } from "./ui/button";
import { GlobeIcon } from '@radix-ui/react-icons';  

export default function WebButton() {
    return(
        <div>
             <Button  className="w-16 h-10 p-2 bg-white text-black rounded-full flex items-center justify-center hover:bg-white">
                <GlobeIcon className="w-11 h-11" />
             </Button>
        </div>
    )
}