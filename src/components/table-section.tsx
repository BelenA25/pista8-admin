import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableRowData from "./table-row-data";
import TableRowPartners from "./table-row-partners";

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
  itemType: string;
  handleDelete: () => void;
}
interface TableSectionProps {
  data?: TableRowDataProps[];
  part?: TableRowPartnersProps[];
  searchTerm: string;
  itemType: string;
  handleDelete: () => void;
}

export default function TableSection({
  data,
  part,
  searchTerm,
  itemType,
  handleDelete,
}: TableSectionProps) {
  const filterData = data?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filterPart = part?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="mb-4 ml-8 mr-8 mt-5 p-4 border border-black rounded-lg shadow-[0px_5px_5px_rgba(0,0,0,0.5)] overflow-hidden">
      <Table className="w-full">
        <TableBody>
          {searchTerm && (filterData?.length || filterPart?.length === 0) ? (
            <TableRow>
              <TableCell
                colSpan={filterData ? 3 : 4}
                className="text-center py-4"
              >
                No se encontraron resultados para la búsqueda.
              </TableCell>
            </TableRow>
          ) : filterData && filterData.length > 0 ? (
            filterData.map((item, index) => (
              <TableRowData
                key={index}
                name={item.name}
                imageUrl={item.imageUrl}
                sector={item.sector}
              />
            ))
          ) : filterPart && filterPart.length > 0 ? (
            filterPart.map((item, index) => (
              <TableRowPartners
                key={index}
                itemId={item.id}
                link={item.link}
                handleDelete={handleDelete}
                itemType={itemType}
                itemName={item.name}
                imageUrl={item.imageUrl}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Datos no encontrados recargue la página porfavor
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
