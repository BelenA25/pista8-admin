"use client"

import { useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import { RocketIcon } from "@radix-ui/react-icons"
import { BriefcaseIcon, HandshakeIcon, MailIcon, NewspaperIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionTrigger } from "./ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { usePathname } from "next/navigation";

export default function SideMenu() {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const asPath  = usePathname();

    const handleImageClick = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const getActiveClass = (path: string) => {
        return asPath.startsWith(path) ? "bg-[#F2A594]" : "";
    };

    return (
        <div className="flex">
            {isSidebarVisible && (
                <div className={`flex-grow w-56 relative transition-all  h-[calc(100vh-2rem)] bg-[#FFCDC2] rounded-lg p-4 my-4 ml-4 flex-shrink-0 transition-transform duration-300 ease-in-out z-10`}>
                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-col space-y-6 ">
                            <NavigationMenuItem>
                                <Image src="https://i.ibb.co/1LZ6zNV/image-2-removebg-preview.png" width={125} height={100} alt="" className="mb-3 mt-7 cursor-pointer" onClick={handleImageClick} />
                            </NavigationMenuItem>
                            <Accordion type="single" collapsible >
                                <NavigationMenuItem className={`w-full py-1 p-7 rounded-md transition-colors hover:bg-[#F2A594] ${getActiveClass("/startups")}`} >
                                    <AccordionItem value={"item-1"}>
                                        <AccordionTrigger style={{ textDecoration: 'none' }}>
                                            <div className="flex items-center space-x-4">
                                                <RocketIcon className="h-4 w-4 mt-1" />
                                                <span>Startups</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pl-8">
                                            <ul className="space-y-2">
                                                <li><a href="/startups" className="block p-2 rounded-md hover:bg-[#F2A594] " >Lista de Startups</a></li>
                                                <li><a href="/startups/postulaciones" className="block p-2 rounded-md hover:bg-[#F2A594]">Lista de Postulaciones</a></li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </NavigationMenuItem>
                                <NavigationMenuItem className={`w-full py-2 p-7 rounded-md transition-colors hover:bg-[#F2A594] ${getActiveClass("/mentores")}`}>
                                    <AccordionItem value={"item-2"}>
                                        <AccordionTrigger style={{ textDecoration: 'none' }}>
                                            <div className="flex items-center space-x-4">
                                                <UserIcon className="h-4 w-4 mt-1" />
                                                <span>Mentores</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pl-8">
                                            <ul className="space-y-2">
                                                <li><a href="/mentors" className={`block p-2 rounded-md hover:bg-[#F2A594] `}>Lista de Mentores</a></li>
                                                <li><a href="/mentors/postulaciones" className={`block p-2 rounded-md hover:bg-[#F2A594] `}>Lista de Postulaciones</a></li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </NavigationMenuItem>
                            </Accordion>
                            {["Fundadores", "Partners", "Suscripciones", "Noticias"].map((item) => (
                                <NavigationMenuItem key={item} className={`w-full py-2 p-7 rounded-md hover:bg-[#F2A594] transition-colors ${getActiveClass(`/${item.toLowerCase()}`)}`} >
                                    <a href={`${item.toLowerCase()}`} className="flex space-x-4">
                                        <span>
                                            {item === "Fundadores" && <BriefcaseIcon className="h-4 w-4 mt-1" />}
                                            {item === "Partners" && <HandshakeIcon className="h-4 w-4 mt-1" />}
                                            {item === "Suscripciones" && <MailIcon className="h-4 w-4 mt-1" />}
                                            {item === "Noticias" && <NewspaperIcon className="h-4 w-4 mt-1" />}
                                        </span>
                                        <span>{item}</span>
                                    </a>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div >
            )}
            <div className={`ml-4 mt-4 transition-transform duration-300 ease-in-out  z-0`} onClick={handleImageClick}>
                {!isSidebarVisible && (<Image src="https://i.ibb.co/jT23vqs/image-3-removebg-preview.png" width={30} height={100} alt="Logo" className="cursor-pointer mt-2 ml-3" />)}
            </div>
        </div>
    );
}
