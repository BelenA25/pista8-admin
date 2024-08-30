"use client"

import dynamic from "next/dynamic";

const StartupsPage = dynamic(() => import('@/app/startups/page'), { ssr: false });

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="flex-grow p-4 overflow-auto  transition-all duration-300">
      <StartupsPage />
      </div>
    </div>
  );
}
