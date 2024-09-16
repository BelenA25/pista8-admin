import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import Typography from "./Typography/typography";

interface TableNewsProps {
  itemId: string;
  imageUrl: string;
  link: string;
  itemName: string;
  itemType: string;
  handleDelete: () => void;
} 
export default function SectionNewsCard({
  itemId,
  imageUrl,
  link,
  itemName,
  itemType,
  handleDelete,
}: TableNewsProps) {
  return (
    <Card className=" shadow-md border-black overflow-hidden  mb-4 ml-4 mr-4 mt-4 ">
      <CardContent className="p-0">
        <Image
          src={imageUrl}
          alt={`Imagen de ${itemName}`}
          width={200}
          height={150}
          className="w-full h-40 object-cover"
        />
        <div className="p-1">
          <Typography tag="h4" alignment="left">
            {itemName}
          </Typography>
          <Typography tag="h6" alignment="left">
            <a href={link} target="_blank" rel="noopener noreferrer">
              Lee la Noticia Completa
            </a>
          </Typography>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 p-1">

        <EditButton 
          itemId={itemId} 
          itemType={itemType}
        />
        <DeleteButton
         itemId={itemId}
         onDelete={handleDelete}
         itemType={itemType}
        />
      </CardFooter>
    </Card>
  );
}

