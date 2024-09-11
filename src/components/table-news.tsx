import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import EditButton from "./edit-button";
import DeleteButton from "./delete-button";

interface TableNewsProps {
    description: string;
    imageUrl: string;
    link: string;
    name: string;
    itemType: string;
}

export default function TableNews() {
    return(
       
            <div className="container mx-auto p-4 border border-black rounded-lg">
              <div className="grid grid-cols-2 gap-4">
               
                  <Card key={"id"} className="overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        src={""}
                        alt={""}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="text-sm font-semibold line-clamp-2">{"title"}</h3>
                        <p className="text-xs text-gray-600 mt-1">{"description"}</p>
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
              <div className="flex justify-center mt-4 space-x-2">
                <Button variant="outline" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
              </div>
            </div>
    )
}