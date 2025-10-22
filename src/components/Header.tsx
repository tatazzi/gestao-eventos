"use client";

import { useRouter } from "next/navigation";
import { User, Menu } from "@/assets";

type HeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export default function Header({ isSidebarOpen, onToggleSidebar }: HeaderProps) {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 lg:left-64 left-0 right-0 z-20 flex items-center justify-end px-6">
      <button 
        onClick={onToggleSidebar}
        className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Menu className="h-6 w-6" />
      </button>
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
