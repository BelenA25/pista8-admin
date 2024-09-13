import { FaLinkedinIn } from "react-icons/fa";
import { Button } from "./ui/button";

interface LinkedInButtonProps {
    link: string; 
}

export default function LinkedInButton({ link }: LinkedInButtonProps) {
    const handleClick = () => {
        window.open(link, '_blank'); 
    };

    return (
        <Button className="w-10 h-10 p-2 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800" onClick={handleClick}>
            <FaLinkedinIn className="w-6 h-6" />
        </Button>
    );
}
