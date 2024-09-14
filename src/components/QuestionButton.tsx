import { useState } from "react";
import { Button } from "./ui/button";


import { FaQuestion } from 'react-icons/fa';
import DetailedViewDialog from "./DetailedViewDialog";

interface QuestionButtonProps {
    mentorDetails: {
        name: string;
        city: string;
        phone: string;
        email: string;
        linkedin?: string;
        facebook?: string;
        twitter?: string;
        experience: string;
        satisfaction: string;
    };
}

const QuestionButton: React.FC<QuestionButtonProps> = ({ mentorDetails }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <Button
                className="w-10 h-10 p-2 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500"
                onClick={handleOpenDialog}
            >
                <FaQuestion  className="w-5 h-5" />
            </Button>
            
            {isDialogOpen && (
                <DetailedViewDialog mentorDetails={mentorDetails} onClose={handleCloseDialog} />
            )}
        </>
    );
}
export default QuestionButton;