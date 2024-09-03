import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableRowData from "./table-row-data";
import TableApplication from "./table-application";

interface TableRowDataProps {
    name: string;
    imageUrl: string;
    sector: string;
}
interface TableApplicationsPorps {
    startup_name: string;
    full_name: string;
    email: string;
    phone: string;
   
}

interface TableSectionProps {
    data?: TableRowDataProps[];
    appl?: TableApplicationsPorps[];
}



export default function TableSection({ data, appl }: TableSectionProps) {
    return (
        <div className="mb-4 ml-8 mr-8 mt-5 p-4 border border-black rounded-lg shadow-[0px_5px_5px_rgba(0,0,0,0.5)] overflow-hidden">
            <Table className="w-full">
                <TableBody>
                    {data?.map((item, index) => (
                        <TableRowData key={index} name={item.name} imageUrl={item.imageUrl} sector={item.sector} />
                    ))}
                </TableBody>
            </Table>

            <Table className="w-full">
                <TableBody>
                    {appl?.map((item, index) => (
                        <TableApplication key={index} startup_name={item.startup_name} full_name={item.full_name} email={item.email} phone={item.phone} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
} 