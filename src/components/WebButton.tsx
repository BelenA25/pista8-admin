import { ref } from "firebase/database";
import { Button } from "./ui/button";
import { GlobeIcon } from '@radix-ui/react-icons';  
import { database } from "@/app/firebaseConfig";

interface WebButtonProps {

    link: string;
    
}

export default function WebButton({link}: WebButtonProps) {
  const handleClick = ()=>{
    if(link){
        window.open(link, "_blank");

    }
  }
    return(
        <div>
             <Button  className="w-16 h-10 p-2 bg-white text-black rounded-full flex items-center justify-center hover:bg-white"
             onClick={handleClick}
             >
                <GlobeIcon className="w-11 h-11" />
            
             </Button>
        </div>
    )
}