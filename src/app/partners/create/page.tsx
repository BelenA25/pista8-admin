'use client'

import AuthHandler from "@/components/AuthHandler";
import PartnersForm from "@/components/PartnersForm"
import Typography from "@/components/Typography/typography"
import useAuth from "@/hooks/useAuth";

  export default function Createfounder(){
  const { user, loading} = useAuth();

    return(
      <AuthHandler user={user} loading={loading}>
        <Typography tag="h1"> Crear Partner</Typography>
        <PartnersForm/>
      </AuthHandler>
    )
  }