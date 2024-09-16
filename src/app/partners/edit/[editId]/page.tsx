'use client'

import AuthHandler from "@/components/AuthHandler"
import PartnerForm from "@/components/PartnersForm"
import Typography from "@/components/Typography/typography"
import useAuth from "@/hooks/useAuth"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function EditPartners(){
    const  {editId} = useParams()
    const  [partnerId, setPartnerId] = useState<string | null>(null)
    const { user, loading} = useAuth();


useEffect(() => {
    if(editId){
        setPartnerId(editId as string)
    }

}, [editId])

if(!partnerId){
    return <div>Cargando...</div>

}
    return(
      <AuthHandler user={user} loading={loading}>
        <div>
            <Typography tag="h1"> Editar Partner</Typography>
            <PartnerForm
            partnerId={partnerId}
            />
        </div>
      </AuthHandler>
    )
}