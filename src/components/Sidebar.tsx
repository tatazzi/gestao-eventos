"use client";

import { Calendar, Layers, Ticket, Users, MiniCalendar, Coupon, GearSolidFull } from "@/assets";
import Button from "./Button";

type SidebarProps = {
  activeItem: string;
  onItemClick: (item: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ activeItem, onItemClick, isOpen, onClose }: SidebarProps) {
  const menuItems = [
    {
      id: "eventos",
      label: "Eventos",
      icon: MiniCalendar,
    },
    {
      id: "setores",
      label: "Setores",
      icon: Layers,
    },
    {
      id: "cupons",
      label: "Cupons",
      icon: Coupon,
    },
    {
      id: "lotes",
      label: "Lotes",
      icon: Users,
    },
    {
      id: "configuracoes",
      label: "Configurações",
      icon: GearSolidFull,
    },
  ];

  const handleItemClick = (itemId: string) => {
    onItemClick(itemId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-opacity-20 bg-black/50 z-50 "
          onClick={onClose}
        />
      )}
      
      <div className={`
        w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-50
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <div className="flex items-center mb-8">
            <div className="bg-brandPrimary rounded-lg p-3 mr-4">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-lightText">
                EventManager
              </h1>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    isActive
                      ? "bg-gray-100 text-lightText"
                      : "text-gray-600 hover:bg-gray-50 hover:text-lightText"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
