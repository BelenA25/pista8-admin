import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableRowData from "./table-row-data";

interface TableRowDataProps {
    id: string; 
    name: string;
    imageUrl: string;
    sector: string;
}

interface TableSectionProps {
    data: TableRowDataProps[];
    searchTerm: string;
    itemType: string; 
    handleDelete: () => void;
}

export default function TableSection({ data, searchTerm, itemType, handleDelete }: TableSectionProps) {
    console.log("Hola yo estoy en table section",data);
    return (
        <div className="mb-4 ml-8 mr-8 mt-5 p-4 border border-black rounded-lg shadow-[0px_5px_5px_rgba(0,0,0,0.5)] overflow-hidden">
            <Table className="w-full">
                <TableBody>
                    {searchTerm && data.length == 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-4">
                                No se encontraron resultados para la búsqueda.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, index) => (
                            <TableRowData key={index} itemName={item.name} imageUrl={item.imageUrl} itemSector={item.sector} itemId={item.id}  itemType={itemType} handleDelete={handleDelete}/>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}