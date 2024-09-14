'use client';

import FormNews from "@/components/FormNews";
import Typography from "@/components/Typography/typography";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditNews() {
   const {editId} = useParams()
   const [newsId, setNewsId] = useState<string | null>(null);
   
   useEffect(() => {
     if(editId){
         setNewsId(editId as string)
     }
   },[editId])

   if(!newsId){
       return <div>...Cargando</div>
   }

   return(
    <div>
        <Typography tag="h1">Editar Noticia</Typography>
        <FormNews newsId={newsId}/>
     
    </div>
   )
}