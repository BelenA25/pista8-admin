import AddButton from "./AddButton";
import Typography from "./Typography/typography";

interface TitleProps {
    text: string;
    typeName: string;
}

export default function Title({ text, typeName }: TitleProps) {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex-grow">
                <div className="text-2xl">
                    <Typography tag="h1">{text}</Typography>
                </div>
            </div>
            <AddButton typeName={typeName} ></AddButton>
        </div>
    )
}