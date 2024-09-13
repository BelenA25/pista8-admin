import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import Typography from "./Typography/typography";
import { TableCell, TableRow } from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TableRowDataProps {
    name: string;
    imageUrl: string;
    sector: string;
  }

export default function TableRowData({ name, imageUrl, sector }: TableRowDataProps) {
    return (
        <div className="border border-black rounded-lg">
            <TableRow className="w-full flex  border border-gray-400">
                <TableCell className="w-1/18 flex items-center">
                    <Avatar>
                        <AvatarImage src={imageUrl}/>
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </TableCell>
                <TableCell className="flex flex-col flex-grow">
                    <Typography tag="p" alignment="left" fontWeight="bold">
                        {name}
                    </Typography>
                    <Typography tag="p" alignment="left">
                        {sector}
                    </Typography>
                </TableCell>
                <TableCell className="flex justify-end items-center">
                    <EditButton />
                </TableCell>
                <TableCell className="flex justify-end items-center">
                    <DeleteButton />
                </TableCell>
            </TableRow>
        </div>
    )
}