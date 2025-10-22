"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import EventsList from "@/components/EventsList";
import SectorsList from "@/components/SectorsList";
import CouponsList from "@/components/CouponsList";
import LotsList from "@/components/LotsList";
import ColorSettings from "@/components/ColorSettings";

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("eventos");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeItem) {
      case "eventos":
        return <EventsList />;
      case "setores":
        return <SectorsList />;
      case "cupons":
        return <CouponsList />;
      case "lotes":
        return <LotsList />;
        case "configuracoes":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Configurações</h1>
            <ColorSettings />
          </div>
        );
      default:
        return <EventsList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        activeItem={activeItem} 
        onItemClick={handleItemClick}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
      <Header 
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
      />
      <main className="lg:ml-64 pt-16 ">
        {renderContent()}
      </main>
    </div>
  );
}
