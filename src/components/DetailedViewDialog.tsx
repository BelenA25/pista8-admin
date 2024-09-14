import { Button } from "./ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import Typography from "./Typography/typography";

interface DetailItem {
    label: string;
    value: string | React.ReactNode;
}

interface DetailSection {
    title: string;
    items: DetailItem[];
}

interface DetailedViewDialogProps {
    title: string;
    subtitle?: string;
    sections: DetailSection[];
    onClose: () => void;
}

export default function DetailedViewDialog({ title, subtitle, sections, onClose }: DetailedViewDialogProps) {
    return (
        <AlertDialog open onOpenChange={onClose}>
            <AlertDialogContent className="max-w-4xl w-full mx-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <Typography tag="h4">
                            {title}
                        </Typography>
                    </AlertDialogTitle>
                    {subtitle && (
                        <Typography tag="h5">
                            {subtitle}
                        </Typography>
                    )}
                </AlertDialogHeader>
                <div className="p-6">
                    {sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-4">
                            <Typography tag="h5" alignment="left">
                                {section.title}
                            </Typography>
                            {section.items.map((item, itemIndex) => (
                                <Typography key={itemIndex} alignment="left">
                                    {item.label}: {item.value}
                                </Typography>
                            ))}
                        </div>
                    ))}
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