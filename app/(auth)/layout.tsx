"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src="/images/bryant.png" 
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center bg-[#542383] p-6 sm:p-12">
        <div className="bg-[#B6B5FF]/90 dark:bg-gray-800/70 p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-md">
          {children}
        </div>
      </div>
    </div>
  );
}
