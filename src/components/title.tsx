import AddButton from "./add-button";
import Typography from "./Typography/typography";

interface TitleProps {
 title: string
}

export default function Title({title}: TitleProps) {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex-grow">
                <div className="text-2xl">
                    <Typography tag="h1">{title}</Typography>
                </div>
            </div>
            <AddButton></AddButton>
        </div>
    )
}