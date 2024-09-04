import AddButton from "./add-button";
import Typography from "./Typography/typography";

interface TitleProps {
    text: string;
}

export default function Title({ text }: TitleProps) {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex-grow">
                <div className="text-2xl">
                    <Typography tag="h1">{text}</Typography>
                </div>
            </div>
            <AddButton></AddButton>
        </div>
    )
}