import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableRowData from "./table-row-data";

interface TableRowDataProps {
    name: string;
    imageUrl: string;
    sector: string;
}

interface TableSectionProps {
    data: TableRowDataProps[];
}

export default function TableSection({ data }: TableSectionProps) {
    return (
        <div className="mb-4 ml-8 mr-8 mt-5 p-4 border border-black rounded-lg shadow-[0px_5px_5px_rgba(0,0,0,0.5)] overflow-hidden">
            <Table className="w-full">
                <TableBody>
                    {data.map((item, index) => (
                        <TableRowData key={index} name={item.name} imageUrl={item.imageUrl} sector={item.sector} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}