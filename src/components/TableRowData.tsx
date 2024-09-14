import { ReactNode } from "react";
import Typography from "./Typography/typography";
import { TableCell, TableRow } from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DeleteButton from "./DeleteButton";

interface TableRowDataProps {
    itemId: string;
    data: { [key: string]: string | ReactNode };
    itemType: string;
    handleDelete: () => void;
}

export default function TableRowData({ itemId, data, itemType, handleDelete }: TableRowDataProps) {
    return (
        <div className="border border-black rounded-lg">
            <TableRow className="w-full flex  border border-gray-400">
                <TableCell className="w-1/18 flex items-center">
                    <Avatar>
                        <AvatarImage src={data.imageUrl as string} />
                        <AvatarFallback>{(data.itemName as string).charAt(0)}</AvatarFallback>
                    </Avatar>
                </TableCell>
                <TableCell className="flex flex-col flex-grow">
                    <Typography tag="p" alignment="left" fontWeight="bold">
                        {data.itemName}
                    </Typography>
                    <Typography tag="p" alignment="left">
                        {data.itemGeneric1}
                        {data.itemGeneric2 && ` - ${data.itemGeneric2}`}
                        {data.itemGeneric3 && ` - ${data.itemGeneric3}`}
                    </Typography>
                </TableCell>
                <TableCell className="flex justify-end items-center">
                    {data.genericButton && data.genericButton}
                </TableCell>
                <TableCell className="flex justify-end items-center">
                    {data.questionButton ? data.questionButton : data.detailButton ? data.detailButton : null}
                </TableCell>
                <TableCell className="flex justify-end items-center">
                    <DeleteButton itemId={itemId} onDelete={handleDelete} itemType={itemType} />
                </TableCell>
            </TableRow>
        </div>
    )
}