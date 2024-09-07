import React from 'react';
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableRowData from "./table-row-data";
import TableRowApplication from "./table-row-application";

interface TableRowDataProps {
    name: string;
    imageUrl: string;
    sector: string;
}

interface TableApplicationsProps {
    startup_name: string;
    full_name: string;
    email: string;
    phone: string;
    id: string;
    city: string;
    startup_description: string;
    startup_stage: string;
}

interface TableSectionProps {
    searchTerm: string;
    data?: TableRowDataProps[];
    appl: TableApplicationsProps[];
    onDelete: () => void;
    itemType: string;
}

export default function TableSection2({ data, appl, searchTerm, onDelete, itemType }: TableSectionProps) {
    return (
        <div className="mb-4 ml-8 mr-8 mt-5 p-4 border border-black rounded-lg shadow-[0px_5px_5px_rgba(0,0,0,0.5)] overflow-hidden">
            <Table className="w-full">
                <TableBody>
                    { searchTerm && appl.length === 0 ? (
                      <TableRow>
                          <TableCell colSpan={3} className="text-center">
                              Datos no encontrados
                          </TableCell>
                      </TableRow>
                    ):(
                        appl.map((item, index) => (
                            <TableRowApplication
                                key={index}
                                startup_name={item.startup_name}
                                full_name={item.full_name}
                                email={item.email}
                                phone={item.phone}
                                id={item.id}
                                onDelete={onDelete}
                                itemType={itemType}
                                startup_description={item.startup_description}
                                city={item.city}
                                startup_stage={item.startup_stage}

                                
                            />
                        ))

                    )}


                 
                </TableBody>
            </Table>
        </div>
    );
}
