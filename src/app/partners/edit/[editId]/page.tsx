'use client'

import PartnerForm from "@/components/partners-form"
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
            <Typography tag="h1"> Editar Partner</Typography>
            <PartnerForm
            founderId={founderId}
            />
        </div>
    )
}