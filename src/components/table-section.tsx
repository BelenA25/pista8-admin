import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableRowData from "./table-row-data";
import { ReactNode } from "react";

interface TableSectionProps<T> {
    data: T[];
    searchTerm: string;
    itemType: string; 
    handleDelete: () => void;
    mapItemToRowDataProps: (item: T) => {
        itemId: string;
        itemName: string;
        imageUrl: string;
        itemGeneric1: string;
        itemGeneric2?: string;
        LinkedInButton?: ReactNode;
    };
}

export default function TableSection<T>({data, searchTerm, itemType, handleDelete, mapItemToRowDataProps}: TableSectionProps<T>) {
    return (
        <div className="mb-4 ml-8 mr-8 mt-5 p-4 border border-black rounded-lg custom-shadow overflow-hidden">
            <Table className="w-full">
                <TableBody>
                    {searchTerm && data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-4">
                                No se encontraron resultados para la búsqueda.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, index) => {
                            const rowDataProps = mapItemToRowDataProps(item);
                            return (
                                <TableRowData
                                    key={index}
                                    itemId={rowDataProps.itemId}
                                    itemName={rowDataProps.itemName}
                                    imageUrl={rowDataProps.imageUrl}
                                    itemGeneric1={rowDataProps.itemGeneric1}
                                    itemGeneric2={rowDataProps.itemGeneric2 || ""}
                                    itemType={itemType}
                                    handleDelete={handleDelete}
                                    LinkedInButton={rowDataProps.LinkedInButton}
                                />
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}