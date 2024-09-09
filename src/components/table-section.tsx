import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableRowData from "./table-row-data";
import TableRowFounder from './table-row-founder';

interface TableRowDataProps {
    id: string; 
    name: string;
    imageUrl: string;
    sector: string;
}
interface TableRowFounderProps {
    id: string;
    name: string;
    imageUrl: string;
    itemType: string; 
    handleDelete: () => void;
}

interface TableSectionProps {
    data?: TableRowDataProps[];
    found?: TableRowFounderProps[];
    searchTerm: string;
    itemType: string; 
    handleDelete: () => void;
}

export default function TableSection({ data, found, searchTerm, itemType, handleDelete }: TableSectionProps) {

    const filterData =  data?.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    )
    const filterfound = found?.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="mb-4 ml-8 mr-8 mt-5 p-4 border border-black rounded-lg shadow-[0px_5px_5px_rgba(0,0,0,0.5)] overflow-hidden">
            <Table className="w-full">
            <TableBody>
                    {searchTerm && (filterData?.length || filterfound?.length === 0) ? (
                        <TableRow>
                            <TableCell colSpan={filterData ? 3 : 4} className="text-center py-4">
                                No se encontraron resultados para la búsqueda.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterData && filterData.length > 0 ? (
                            filterData.map((item, index) => (
                                <TableRowData key={index} itemName={item.name} imageUrl={item.imageUrl} itemSector={item.sector} />
                            ))
                        ) : filterfound && filterfound.length > 0 ? (
                            filterfound.map((item, index) => (
                                <TableRowFounder
                                    key={index}
                                    itemId={item.id}
                                    handleDelete={handleDelete}
                                    itemType={itemType}
                                    itemName={item.name}
                                    imageUrl={item.imageUrl}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    Datos no encontrados
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>

            </Table>
        </div>
    );
}