import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideMenu from "@/components/side-menu";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} flex`}>
        <SideMenu></SideMenu>
        <main className="flex-1 p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
