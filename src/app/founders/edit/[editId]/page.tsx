"use client"

import AuthHandler from "@/components/AuthHandler"
import FounderForm from "@/components/FounderForm"
import Typography from "@/components/Typography/typography"
import useAuth from "@/hooks/useAuth"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function EditFounders(){
    const { user, loading} = useAuth();
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
        <AuthHandler user={user} loading={loading}>
        <div>
            <Typography tag="h1"> Editar Fundador</Typography>
            <FounderForm
             founderId={founderId}
             />
        </div>
       </AuthHandler>
    )
}