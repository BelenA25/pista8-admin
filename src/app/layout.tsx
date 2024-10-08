import type { Metadata } from "next";
import { Lato, Lexend } from '@next/font/google';
import "./globals.css";
import SideMenu from "@/components/side-menu";

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'], 
});

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '700'],
});


export const metadata: Metadata = {
  title: "Pista 8 Admin",
  description: "Pista 8 view for admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.className} flex`}>
        <SideMenu></SideMenu>
        <main className="flex-1 p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
