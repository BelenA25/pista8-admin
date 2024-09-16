"use client";

import { useState } from "react";
import {

  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { LockOpen1Icon, RocketIcon } from "@radix-ui/react-icons";
import {
  BriefcaseIcon,
  HandshakeIcon,
  MailIcon,
  NewspaperIcon,
  UserIcon,

} from "lucide-react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionTrigger } from "./ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const MENU_ITEMS = {
  STARTUPS: {
    label: "Startups",
    icon: <RocketIcon className="h-4 w-4 mt-1" />,
    path: "/startups",
  },
  MENTORES: {
    label: "Mentores",
    icon: <UserIcon className="h-4 w-4 mt-1" />,
    path: "/mentors",
  },
  FUNDADORES: {
    label: "Fundadores",
    icon: <BriefcaseIcon className="h-4 w-4 mt-1" />,
    path: "/founders",
  },
  PARTNERS: {
    label: "Partners",
    icon: <HandshakeIcon className="h-4 w-4 mt-1" />,
    path: "/partners",
  },
  SUSCRIPCIONES: {
    label: "Suscripciones",
    icon: <MailIcon className="h-4 w-4 mt-1" />,
    path: "/subscriptions",
  },
  NOTICIAS: {
    label: "Noticias",
    icon: <NewspaperIcon className="h-4 w-4 mt-1" />,
    path: "/news",
  },
};

export default function SideMenu() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const asPath = usePathname();
  const { handleLogout } = useAuth();

  const handleImageClick = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const getActiveClass = (path: string) => {
    return asPath.startsWith(path) ? "bg-[#F2A594]" : "";
  };

  return (
    <div className="flex">
      {isSidebarVisible && (
        <div
          className={`flex-grow w-56 relative transition-all h-[calc(100vh-2rem)] bg-[#FFCDC2] rounded-lg p-4 my-4 ml-4 flex-shrink-0 transition-transform duration-300 ease-in-out z-10`}
        >
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col space-y-6 ">
              <NavigationMenuItem>
                <Image
                  src="https://i.ibb.co/1LZ6zNV/image-2-removebg-preview.png"
                  width={125}
                  height={100}
                  alt="logo"
                  className="mb-3 mt-7 cursor-pointer"
                  onClick={handleImageClick}
                />
              </NavigationMenuItem>
              <Accordion type="single" collapsible>
                <NavigationMenuItem
                  className={`w-full py-1 p-7 rounded-md transition-colors hover:bg-[#F2A594] ${getActiveClass(
                    MENU_ITEMS.STARTUPS.path
                  )}`}
                >
                  <AccordionItem value={"item-1"}>
                    <AccordionTrigger style={{ textDecoration: "none" }}>
                      <div className="flex items-center space-x-4">
                        {MENU_ITEMS.STARTUPS.icon}
                        <span>{MENU_ITEMS.STARTUPS.label}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-8">
                      <ul className="space-y-2">
                        <li>
                          <a
                            href={`${MENU_ITEMS.STARTUPS.path}`}
                            className="block p-2 rounded-md hover:bg-[#F2A594]"
                          >
                            Lista de Startups
                          </a>
                        </li>
                        <li>
                          <a
                            href={`${MENU_ITEMS.STARTUPS.path}/applications`}
                            className="block p-2 rounded-md hover:bg-[#F2A594]"
                          >
                            Lista de Postulaciones
                          </a>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </NavigationMenuItem>
                <NavigationMenuItem
                  className={`w-full py-2 p-7 rounded-md transition-colors hover:bg-[#F2A594] ${getActiveClass(
                    MENU_ITEMS.MENTORES.path
                  )}`}
                >
                  <AccordionItem value={"item-2"}>
                    <AccordionTrigger style={{ textDecoration: "none" }}>
                      <div className="flex items-center space-x-4">
                        {MENU_ITEMS.MENTORES.icon}
                        <span>{MENU_ITEMS.MENTORES.label}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-8">
                      <ul className="space-y-2">
                        <li>
                          <a
                            href={`${MENU_ITEMS.MENTORES.path}`}
                            className="block p-2 rounded-md hover:bg-[#F2A594]"
                          >
                            Lista de Mentores
                          </a>
                        </li>
                        <li>
                          <a
                            href={`${MENU_ITEMS.MENTORES.path}/applications`}
                            className="block p-2 rounded-md hover:bg-[#F2A594]"
                          >
                            Lista de Postulaciones
                          </a>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </NavigationMenuItem>
              </Accordion>
              {Object.values(MENU_ITEMS)
                .slice(2)
                .map(({ label, icon, path }) => (
                  <NavigationMenuItem
                    key={label}
                    className={`w-full py-2 p-7 rounded-md hover:bg-[#F2A594] transition-colors ${getActiveClass(
                      path
                    )}`}
                  >
                    <a href={path} className="flex space-x-4">
                      <span>{icon}</span>
                      <span>{label}</span>
                    </a>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem
                className={`w-full py-2 p-7 rounded-md hover:bg-[#F2A594] transition-colors cursor-pointer`}
                onClick={handleLogout}
              >
                <div className="flex items-center space-x-4">
                  <LockOpen1Icon className="h-4 w-4 mt-1" />
                  <span>Cerrar sesión</span>
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
      <div
        className={`ml-4 mt-4 transition-transform duration-300 ease-in-out z-0`}
        onClick={handleImageClick}
      >
        {!isSidebarVisible && (
          <Image
            src="https://i.ibb.co/jT23vqs/image-3-removebg-preview.png"
            width={30}
            height={100}
            alt="Logo"
            className="cursor-pointer mt-2 ml-3"
          />
        )}
      </div>
    </div>
  );
}

