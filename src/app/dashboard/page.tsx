"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import EventsList from "@/components/EventsList";
import SectorsList from "@/components/SectorsList";
import CouponsList from "@/components/CouponsList";

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("eventos");

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const renderContent = () => {
    switch (activeItem) {
      case "eventos":
        return <EventsList />;
      case "setores":
        return <SectorsList />;
      case "cupons":
        return <CouponsList />;
      case "participantes":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-lightText mb-6">Participantes</h1>
            <p className="text-gray-600">Página de participantes em desenvolvimento...</p>
          </div>
        );
        case "configuracoes":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-lightText mb-6">Configurações</h1>
            <p className="text-gray-600">Página de Configurações em desenvolvimento...</p>
          </div>
        );
      default:
        return <EventsList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
      <Header />
      <main className="ml-64 pt-16">
        {renderContent()}
      </main>
    </div>
  );
}
