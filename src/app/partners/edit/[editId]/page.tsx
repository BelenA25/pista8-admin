'use client'

import PartnerForm from "@/components/PartnersForm"
import Typography from "@/components/Typography/typography"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function EditPartners(){
    const  {editId} = useParams()
    const  [partnerId, setPartnerId] = useState<string | null>(null)

useEffect(() => {
    if(editId){
        setPartnerId(editId as string)
    }

}, [editId])

if(!partnerId){
    return <div>Cargando...</div>

}
    return(
        <div>
            <Typography tag="h1"> Editar Partner</Typography>
            <PartnerForm
            partnerId={partnerId}
            />
        </div>
    )
}