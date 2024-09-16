'use client'

import AuthHandler from "@/components/AuthHandler";
import FounderForm from "@/components/FounderForm"
import Typography from "@/components/Typography/typography"
import useAuth from "@/hooks/useAuth";

  export default function Createfounder(){
  const { user, loading} = useAuth();
    return(
      <AuthHandler user={user} loading={loading}>
        <Typography tag="h1"> Agregar Fundadores</Typography>
        <FounderForm/>
      </AuthHandler>
    )
  }