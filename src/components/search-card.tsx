import { Input } from './ui/input';
import Typography from './Typography/typography';
import { Card } from './ui/card';
import SearchButton from './search-button';
import { useState } from 'react';
import { ChangeEvent } from 'react';

interface SearchCardProps {
    onSearch: (searchTerm: string) => void;
}
export default function SearchCard({ onSearch }: SearchCardProps) {

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };
    const handleSearch = () => {
        onSearch(searchTerm);
        searchTerm && setSearchTerm('');
   }
    
    
    return (
        <Card className="mx-8 p-4 flex items-center space-x-5 border-none">
            <Typography tag='h6' noWrap={true}>Buscar Startup: </Typography>
            <Input 
            type="text"
            placeholder="Buscar..." 
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={handleInputChange}
            />
            <SearchButton
             onClick={handleSearch}
            />
        </Card>
    );
}
