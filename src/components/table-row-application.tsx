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
  onDelete: (id: string) => void;
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
            full_name={full_name}
            startup_description={startup_description}
            city={city}
            startup_stage={startup_stage}
          />
        </TableCell>
        <TableCell className="flex justify-end items-center">
          <DeleteButton onClick={() => onDelete(id)} />
        </TableCell>
      </TableRow>
    </div>
  );
}
