"use client";

import { useRouter } from "next/navigation";
import { User } from "@/assets";

export default function Header() {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-64 right-0 z-20 flex items-center justify-end px-6">
      <button 
        onClick={handleProfileClick}
        className="flex items-center gap-2 bg-brandPrimary text-white px-4 py-2 rounded-lg hover:bg-brandPrimary/80 transition-colors"
      >
        <span>Perfil</span>
        <User className="h-4 w-4" />
      </button>
    </header>
  );
}
