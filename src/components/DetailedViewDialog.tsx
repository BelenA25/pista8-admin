import { Button } from "./ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import Typography from "./Typography/typography";

interface MentorDetails {
    name: string;
    city: string;
    phone: string;
    email: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    experience: string;
    satisfaction: string;
}

interface DetailedViewDialogProps {
    mentorDetails: MentorDetails;
    onClose: () => void;
}

export default function DetailedViewDialog({ mentorDetails, onClose }: DetailedViewDialogProps) {
    return (
        <AlertDialog open onOpenChange={onClose}>
            <AlertDialogContent className="max-w-4xl w-full mx-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <Typography tag="h4">
                            {mentorDetails.name}
                        </Typography>
                    </AlertDialogTitle>
                    <Typography tag="h5">
                        {mentorDetails.city}
                    </Typography>
                </AlertDialogHeader>
                <div className="p-6">
                    <Typography tag="h5" alignment="left">
                        Datos personales:
                    </Typography >
                    <Typography alignment="left" >Teléfono: {mentorDetails.phone}</Typography>
                    <Typography alignment="left">
                        Email:
                        <a href={`mailto:${mentorDetails.email}?subject=Contacto desde plataforma`} className="text-blue-500 underline ml-2">
                            {mentorDetails.email}
                        </a>
                    </Typography>
                    {mentorDetails.linkedin && <Typography alignment="left">LinkedIn: <a href={mentorDetails.linkedin} target="_blank" className="text-blue-500 underline ml-2" rel="noopener noreferrer">{mentorDetails.linkedin}</a></Typography>}
                    {mentorDetails.facebook && <Typography alignment="left">Facebook: <a href={mentorDetails.facebook} target="_blank" className="text-blue-500 underline ml-2" rel="noopener noreferrer">{mentorDetails.facebook}</a></Typography>}
                    {mentorDetails.twitter && <Typography alignment="left">Twitter:<a href={mentorDetails.twitter} target="_blank" className="text-blue-500 underline ml-2" rel="noopener noreferrer">{mentorDetails.twitter}</a></Typography>}
                    <Typography tag="h5" alignment="left">
                        Experiencia
                    </Typography>
                    <Typography alignment="left">{mentorDetails.experience}</Typography>
                    <Typography tag="h5" alignment="left">
                        Satisfacción y Frustración
                    </Typography>
                    <Typography alignment="left">{mentorDetails.satisfaction}</Typography>
                </div>
                <AlertDialogFooter className="flex-center !justify-center items-center">
                    <Button onClick={onClose} className="bg-custom-orange text-white">
                        Cerrar
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}