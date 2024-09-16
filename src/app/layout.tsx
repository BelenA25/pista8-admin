'use client'; 

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Lato, Lexend } from '@next/font/google';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SideMenu from "@/components/SideMenu";


const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'], 
});

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); 
  const [routeLoaded, setRouteLoaded] = useState(false);
  useEffect(() => {
    if (pathname) {
      setRouteLoaded(true); 
    }
  }, [pathname]);
  const shouldHideSideMenu = pathname === "/login";

  return (
    <html lang="en">
      <body className={`${lexend.className} flex`}>
       
      {!shouldHideSideMenu && <SideMenu />}
        <main className="flex-1 p-4">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
