import Link from "next/link";
import AddButton from "./add-button";
import Typography from "./Typography/typography";

interface TitleProps {
  title: string;
  href: string;
}

export default function Title({ title, href }: TitleProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex-grow">
        <div className="text-2xl">
          <Typography tag="h1">{title}</Typography>
        </div>
      </div>
      <Link href={href}>
        <AddButton />
      </Link>
    </div>
  );
}
