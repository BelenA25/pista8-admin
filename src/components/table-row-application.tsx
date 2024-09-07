import DeleteButton from "./delete-button";
import InformationButton from "./information-button";
import Typography from "./Typography/typography";
import { TableRow, TableCell } from "./ui/table";

interface TableApplicationsPorps {
  startup_name: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  startup_description: string;
  startup_stage: string;
  id: string;
  onDelete: () => void;
  itemType: string;
}
export default function TableRowApplication({
  startup_name,
  full_name,
  email,
  phone,
  city,
  startup_description,
  startup_stage,
  id,
  onDelete,
  itemType,
}: TableApplicationsPorps) {
    
  return (
    <div className="border border-black rounded-lg">
      <TableRow className="w-full flex  border border-gray-400">
        <TableCell className=" w-1/18 flex flex-col flex-grow ">
          <Typography tag="p" alignment="left" fontWeight="bold">
            {startup_name}
          </Typography>
          <Typography tag="p" alignment="left">
            {full_name} {" - "}
            {email} {" - "}
            {phone}
          </Typography>
        </TableCell>
        <TableCell className="flex justify-end items-center">
          <InformationButton
            startup_name={startup_name}
            phone={phone}
            email={email}
            full_name={full_name}
            startup_description={startup_description}
            city={city}
            
          />
        </TableCell>
        <TableCell className="flex justify-end items-center">
          <DeleteButton 
            id={id} 
            itemType={itemType} 
            onClick={onDelete}
          />
        </TableCell>
      </TableRow>
    </div>
  );
}
