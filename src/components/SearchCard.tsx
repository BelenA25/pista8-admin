
import { Input } from "./ui/input";
import Typography from "./Typography/typography";
import { Card } from "./ui/card";
import SearchButton from "./SeacrhButton";
import { ChangeEvent, KeyboardEvent, useState } from "react";

interface SearchCardProps {
  onSearchClick: (searchTerm: string) => void;
  text: string;
}

export default function SearchCard({ onSearchClick, text }: SearchCardProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    onSearchClick(searchTerm);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchClick(value);
  };
  return (
    <Card className="mx-8 p-4 flex items-center space-x-5 border-none">
      <Typography tag="h6" noWrap={true}>
        {text}{" "}
      </Typography>
      <Input
        type="text"
        placeholder="Buscar..."
        className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <SearchButton></SearchButton>
    </Card>
  );

}
