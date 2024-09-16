import SectionNewsCard from "./SectionNewsCard";
import Typography from "./Typography/typography";

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
  searchTerm: string;
  handleDelete: () => void;
}

export default function SectionNews({
  news,
  itemType,
  searchTerm,
  handleDelete,
}: SectionProps) {
  const filterNews = news?.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="mb-1 ml-2 mr-2 mt-1 p-1 border border-black rounded-lg shadow-[0px_2px_2px_rgba(0,0,0,0.3)] overflow-visible">
      <div className={`grid ${filterNews?.length === 0 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2'} gap-4`}>
        
        {searchTerm && filterNews?.length === 0 ? (
          <div className="flex justify-center items-center w-full h-32 col-span-full">
            <p className="text-center">
              No se encontraron resultados de la búsqueda
            </p>
          </div>
        ) : (
          filterNews?.map((item, index) => (
            <SectionNewsCard
              key={index}
              itemId={item.id}
              imageUrl={item.imageUrl}
              link={item.link}
              itemName={item.name}
              itemType={itemType}
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
  
}