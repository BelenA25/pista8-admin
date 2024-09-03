import { Input } from './ui/input';
import Typography from './Typography/typography';
import { Card } from './ui/card';
import SearchButton from './search-button';
import { useState } from 'react';

interface SearchCardProps {
    onSearchClick: (searchTerm: string) => void;
}

export default function SearchCard({ onSearchClick }: SearchCardProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchClick = () => {
        onSearchClick(searchTerm);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearchClick(value);
    };
    return (
        <Card className="mx-8 p-4 flex items-center space-x-5 border-none">
            <Typography tag='h6' noWrap={true}>Buscar Startup: </Typography>
            <Input type="text" value={searchTerm} onChange={handleSearchChange}  placeholder="Escribe el nombre del startup..." onKeyDown={handleKeyDown} className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
            <SearchButton onClick={handleSearchClick}></SearchButton>
        </Card>
    );
}