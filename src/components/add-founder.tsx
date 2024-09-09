'use client'

import FounderForm from "@/components/founder-form";
import Typography from "@/components/Typography/typography";
import foundersService from "@/service/foundersService";
import { toast } from "sonner";



export default function AddFounder(){
    const handleSubmit = async (founder: {
       name: string;
       imageUrl: string;
       link: string;
       iconSize: string;
          
      }) => {
        try {
          await foundersService.add(founder);
         alert("Fundador agregado con éxito");
          toast.success("Fundador agregado con éxito");
        } catch (error) {
          alert("Error al agregar fundador:");
          toast.error("Error al agregarfundador:");
        }
      };

    return(
        <div className="container mx-auto p-4">
            <div>
                <Typography tag="h1"> Agregar Fundadores</Typography>
            </div>
            <br />
            <FounderForm
              onSubmit={handleSubmit}
              
            />

        </div>
    )
} 