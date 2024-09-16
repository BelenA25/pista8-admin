"use client"

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = dynamic(() => import('@/app/login/page'), { ssr: false });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
  
    router.push("/login");
  }, [router]);
  return (
    <div className="flex h-screen">
      <div className="flex-grow p-4 overflow-auto  transition-all duration-300">
      <Login/>
      </div>
    </div>
  );
}
