'use client'

import { database } from "@/app/firebaseConfig";
import FounderForm from "@/components/founder-form";
import Typography from "@/components/Typography/typography";
import { ref, set } from "firebase/database";
import { toast } from "sonner";



export default function AddFounders(){
    const handleSubmit = async (founders: {
       name: string;
       imageUrl: string;
       link: string;
       iconSize: string;
          
      }) => {
        try {
          const newApplicationRef = ref(database, `founders/${Date.now()}`);
          await set(newApplicationRef, founders);
        
          toast.success("Fundador agregada con éxito");
        } catch (error) {
          toast.error("Error al agregar la fundador:");
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