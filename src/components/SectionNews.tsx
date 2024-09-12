import SectionNewsCard from "./SectionNewsCard";

interface TableRowNewsProps {
  id: string;
  imageUrl: string;
  link: string;
  name: string;
  itemType: string;
  handleDelete: () => void;
}

interface SectionProps {
  news?: TableRowNewsProps[];
  itemType: string;
  handleDelete: () => void;
}

export default function SectionNews({ news, handleDelete }: SectionProps) {
  return (
    <div className="mb-2 ml-4 mr-4 mt-3 p-2 border border-black rounded-lg shadow-[0px_5px_5px_rgba(0,0,0,0.5)] overflow-visible">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
        {news?.map((item, index) => (
          <SectionNewsCard
            key={index}
            itemId={item.id}
            imageUrl={item.imageUrl}
            link={item.link}
            itemName={item.name}
            itemType={item.itemType}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
