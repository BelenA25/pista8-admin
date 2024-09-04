import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableRowData from "./table-row-data";

interface TableRowDataProps {
    itemId: string; 
    itemName: string;
    itemImageUrl: string;
    itemSector: string;
    itemType: string; 
}

interface TableSectionProps {
    data: TableRowDataProps[];
    searchTerm: string;
    handleDelete: () => void;
}

export default function TableSection({ data, searchTerm, handleDelete }: TableSectionProps) {
    console.log(data);
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
                            <TableRowData key={index} itemName={item.itemName} imageUrl={item.itemImageUrl} itemSector={item.itemSector} itemId={item.itemId}  itemType={item.itemType} handleDelete={handleDelete}/>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}