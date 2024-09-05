import { useState, FormEvent } from 'react';
import { Input } from "./ui/input";
import { Label } from './ui/label';
import { Button } from './ui/button';

interface FounderFormProps {
    onSubmit: (founders: {
       name: string;
       imageUrl: string;
       link: string;
       iconSize: string;
      }) => void;
}

export default function FounderForm({onSubmit}: FounderFormProps) {

 const [name, setName] = useState('')
 const [imageUrl, setImageUrl] = useState('')
 const [link, setLink] = useState('')
 
 const handleSubmit = (e:FormEvent)=>{
    e.preventDefault()
    const newFounder = {
        name,
        imageUrl,
        link,
        iconSize: "1"
    }
    onSubmit(newFounder)
    setName('')
    setImageUrl('')
    setLink('')
 }
 
 return(
        <form
      onSubmit={handleSubmit}
      className="p-4 border border-gray-600 rounded-lg shadow-lg"
       >
        <div className="mb-4">
            <Label>Nombre</Label>
            <Input
             value={name}
             onChange={(e)=> setName(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <Label>Link</Label>
            <Input
             value={link}
             onChange={(e)=> setLink(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <Label>Icono del Fundador</Label>
            <Input
             value={imageUrl}
             onChange={(e)=> setImageUrl(e.target.value)}
            />
        </div>
        <div className="flex justify-center">
        <Button
          type="submit"
          className="w-36 bg-orange-600 text-white hover:bg-orange-400"
        >
          ACEPTAR
        </Button>
      </div>
      
    </form>
    )
}