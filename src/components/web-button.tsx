import { GlobeIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

interface WebButtonProps {
  link: string;
}

export default function WebButton({ link }: WebButtonProps) {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank");
    } else {
      alert("No se ha proporcionado un enlace");
    }
  };

  return (
    <Button
      className="w-16 h-10 p-2 bg-white text-black rounded-full flex items-center justify-center hover:bg-white"
      onClick={handleClick}
    >
      <GlobeIcon className="w-11 h-11" />
    </Button>
  );
}
