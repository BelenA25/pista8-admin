import DeleteButton from "./delete-button";
import EditButton from "./edit-button";
import Typography from "./Typography/typography";
import { TableCell, TableRow } from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TableRowDataProps {
    itemId: string;
    itemName: string;
    imageUrl: string;
    itemSector: string;
    itemType: string; 
    handleDelete: () => void;
  }

export default function TableRowData({itemId, itemName, imageUrl, itemSector, itemType, handleDelete }: TableRowDataProps) {
    return (
        <div className="border border-black rounded-lg">
            <TableRow className="w-full flex  border border-gray-400">
                <TableCell className="w-1/18 flex items-center">
                    <Avatar>
                        <AvatarImage src={imageUrl}/>
                        <AvatarFallback>{itemName.charAt(0)}</AvatarFallback>
                    </Avatar>
                </TableCell>
                <TableCell className="flex flex-col flex-grow">
                    <Typography tag="p" alignment="left" fontWeight="bold">
                        {itemName}
                    </Typography>
                    <Typography tag="p" alignment="left">
                        {itemSector}
                    </Typography>
                </TableCell>
                <TableCell className="flex justify-end items-center">
                    <EditButton />
                </TableCell>
                <TableCell className="flex justify-end items-center">
                    <DeleteButton itemId={itemId} onDelete={handleDelete} itemType={itemType}/>
                </TableCell>
            </TableRow>
        </div>
    )
}