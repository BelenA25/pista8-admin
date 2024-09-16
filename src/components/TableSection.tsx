import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableRowData from "./TableRowData";

interface TableSectionProps<T> {
    data: T[];
    searchTerm: string;
    itemType: string; 
    handleDelete: () => void;
    mapItemToRowDataProps: (item: T) => {
        itemId: string;
        [key: string]: any; 
    };
}

export default function TableSection<T>({
    data,
    searchTerm,
    itemType,
    handleDelete,
    mapItemToRowDataProps
}: TableSectionProps<T>) {
    return (
        <div className="mb-4 ml-8 mr-8 mt-5 p-4 border border-black rounded-lg custom-shadow overflow-hidden">
            <Table className="w-full">
                <TableBody>
                    {searchTerm && data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-4">
                                No se encontraron resultados para la busqueda.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, index) => {
                            const rowDataProps = mapItemToRowDataProps(item);
                            return (
                                <TableRowData
                                    key={index}
                                    itemId={rowDataProps.itemId}
                                    data={rowDataProps}
                                    itemType={itemType}
                                    handleDelete={handleDelete}
                                />
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}