'use client'

import FounderForm from "@/components/founder-form"
import Typography from "@/components/Typography/typography"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function editFounders(){
    const  {editId} = useParams()
    const [founderId, setFounderId] = useState<string | null>(null)

useEffect(() => {
    if(editId){
        setFounderId(editId as string)
    }

}, [editId])

if(!founderId){
    return <div>Cargando...</div>

}
    return(
        <div>
            <Typography tag="h1"> Editar Fundador</Typography>
            <FounderForm
             founderId={founderId}
            />
        </div>
    )
}