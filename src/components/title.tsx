import AddButton from "./add-button";
import Typography from "./Typography/typography";

export default function Tittle() {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex-grow">
                <div className="text-2xl">
                    <Typography tag="h1">Lista de Startups</Typography>
                </div>
            </div>
            <AddButton></AddButton>
        </div>
    )
}