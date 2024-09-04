import { Button } from "./ui/button";
import {  QuestionMarkIcon } from '@radix-ui/react-icons';  


export default function InformationButton() {
    return (
        <Button className="w-10 h-10 p-2 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600">
           <QuestionMarkIcon  className="w-11 h-11  stroke-current stroke-3"/>
        </Button>
    )
}
