import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableRowData from "./table-row-data";
import TableRowPartners from './table-row-partners';

interface TableRowDataProps {
    name: string;
    imageUrl: string;
    sector: string;
}

interface TableRowPartnersProps {
    id: string;
    name: string;
    imageUrl: string;
    link: string;
    itemtype: string;
    handleDelete: () => void;
}
interface TableSectionProps {
    data?: TableRowDataProps[];
    part?:TableRowPartnersProps[];
    itemType: string;
    handleDelete: () => void;
}

export default function TableSection({ data , part, handleDelete}: TableSectionProps) {
       
    return (
        <div className="mb-4 ml-8 mr-8 mt-5 p-4 border border-black rounded-lg shadow-[0px_5px_5px_rgba(0,0,0,0.5)] overflow-hidden">
            <Table className="w-full">
               
                <TableBody>
                    {data?.map((item, index) => (
                        <TableRowData key={index} name={item.name} imageUrl={item.imageUrl} sector={item.sector} />
                    ))}

                    {part?.map((item, index)=>(
                        <TableRowPartners key={index} itemName={item.name} ImageUrl={item.imageUrl} link={item.link} itemType={item.itemtype} itemId={item.id} handleDelete={handleDelete}/>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}