import AddButton from "./AddButton";
import Typography from "./Typography/typography";

interface TitleProps {
    text: string;
    typeName: string;
    showAddButton?: boolean;
}

export default function TitleSection({ text, typeName, showAddButton = true}: TitleProps) {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex-grow">
                <div className="text-2xl">
                    <Typography tag="h1">{text}</Typography>
                </div>
            </div>
            {showAddButton && <AddButton typeName={typeName} />}
        </div>
    )
}