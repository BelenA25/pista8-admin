// components/edit-button.tsx
import { Button } from "./ui/button";
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useRouter } from "next/navigation";

interface EditButtonProps {
  itemId: string;
  itemType: string;
}

export default function EditButton({ itemId, itemType }: EditButtonProps) {
  
const router = useRouter();

const handleClick =() => {
  router.push(`/${itemType}/edit/${itemId}`);
}

  return (
    <Button
      className="w-10 h-10 p-2 bg-yellow-500 text-white rounded-full flex items-center justify-center hover:bg-yellow-600"
      onClick={handleClick}
    >
      <Pencil1Icon className="w-11 h-11" />
    </Button>
  );
}