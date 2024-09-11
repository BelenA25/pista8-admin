import { Input } from './ui/input';
import Typography from './Typography/typography';
import { Card } from './ui/card';
import SearchButton from './search-button';

interface SearchCardProps {
    text:string;
}

export default function SearchCard({text}:SearchCardProps) {
    return (
        <Card className="mx-8 p-4 flex items-center space-x-5 border-none">
            <Typography tag='h6' noWrap={true}>{text} </Typography>
            <Input type="text" placeholder="Buscar..." className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
            <SearchButton></SearchButton>
        </Card>
    );
}
