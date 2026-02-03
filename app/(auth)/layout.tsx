"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="/images/bryant.png"
          alt="Background"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-1 items-center justify-center bg-[#542383] p-6 sm:p-12">
        <div className="bg-[#B6B5FF]/90 dark:bg-gray-800/70 p-8 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
