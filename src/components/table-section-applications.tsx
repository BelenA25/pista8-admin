import { Table, TableBody } from "@/components/ui/table";
import TableApplication from "./table-application";


interface TableApplicationsPorps {
    startup_name: string;
    full_name: string;
    email: string;
    phone: string;
   
}

interface TableSectionAplicationsProps {
    
    data: TableApplicationsPorps[];
} 



export default function TableSectionAplications({ data }: TableSectionAplicationsProps) {
    return (
        <div className="mb-4 ml-8 mr-8 mt-5 p-4 border border-black rounded-lg shadow-[0px_5px_5px_rgba(0,0,0,0.5)] overflow-hidden">
            <Table className="w-full">
                <TableBody>
                    
                    {data.map((item, index) => (
                        <TableApplication key={index} startup_name={item.startup_name} full_name={item.full_name} email={item.email} phone={item.phone} />
                    ))}
                </TableBody>

                
                
            </Table>

          
        </div>
    );
} 