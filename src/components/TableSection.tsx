import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableRowData from "./TableRowData";
import TableRowNews from './TableRowNews';

interface TableRowDataProps {
    name: string;
    imageUrl: string;
    sector: string;
}
interface TableRowNewsProps {
    id: string;
    imageUrl: string;
    link: string;
    name: string;
    itemType: string;
    handleDelete: () => void;
}

interface TableSectionProps {
    data?: TableRowDataProps[];
    news?:  TableRowNewsProps[];
    itemType: string;
    handleDelete: () => void;
}

export default function TableSection({ data, news ,handleDelete, }: TableSectionProps) {
    return (
        <div className="mb-4 ml-8 mr-8 mt-5 p-4 border border-black rounded-lg shadow-[0px_5px_5px_rgba(0,0,0,0.5)] overflow-hidden">
            <Table className="w-full">
                <TableBody>
                    {data?.map((item, index) => (
                        <TableRowData key={index} name={item.name} imageUrl={item.imageUrl} sector={item.sector} />
                    ))}
                    {news?.map((item, index) => (
                        <TableRowNews key={index} itemId={item.id} imageUrl={item.imageUrl} link={item.link} itemName={item.name} itemType={item.itemType} handleDelete={handleDelete} />
                    ))}


                </TableBody>
            </Table>
        </div>
    );
}