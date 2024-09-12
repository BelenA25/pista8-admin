import Link from "next/link";
import AddButton from "./AddButton";
import Typography from "./Typography/typography";

interface TitleProps {
    text: string;
    href: string;
}

export default function Title({ text, href }: TitleProps) {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex-grow">
                <div className="text-2xl">
                    <Typography tag="h1">{text}</Typography>
                </div>
            </div>
            <Link href={href}>
            <AddButton/>
            </Link>

        </div>
    )
}