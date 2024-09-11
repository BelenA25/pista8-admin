import SearchCard from "@/components/search-card";
import Title from "@/components/title";


export default function NewsPage() {
 return(
    <>
      <Title title="Noticias" href="news/create"/>
      <SearchCard text="Buscar Noticias"/>
    </>
 )
}