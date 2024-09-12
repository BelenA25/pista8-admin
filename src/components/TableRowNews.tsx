import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
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

export default function TableRowNews({ itemId, imageUrl, link, itemName, itemType, handleDelete }: TableNewsProps) {

    return(
       
            <div className="container mx-auto p-4 border border-cyan-300 rounded-lg">
              <div className="grid grid-cols-2 grid-rows-1  gap-4">
               
                  <Card key={"id"} className="overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        src={imageUrl}
                        alt={"imagen noticia"}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover"
                      />
                      
                      <div className="p-3">
                        <Typography tag="h3">{itemName}</Typography>
                        <Typography tag="p"><a href={link} target="_blank">Lee la Noticia Completa</a></Typography>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-1 p-1">
                      <div  className="h-8 w-8">
                        <EditButton/>
                      </div>
                      <div  className="h-8 w-8">
                       <DeleteButton/>
                      </div>
                    </CardFooter>
                  </Card>
              </div>
             
            </div>
    )
}
