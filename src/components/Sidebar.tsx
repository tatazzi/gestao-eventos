"use client";

import { Calendar, Layers, Ticket, Users, MiniCalendar, Coupon } from "@/assets";

type SidebarProps = {
  activeItem: string;
  onItemClick: (item: string) => void;
};

export default function Sidebar({ activeItem, onItemClick }: SidebarProps) {
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
      id: "participantes",
      label: "Participantes",
      icon: Users,
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-10">
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
                onClick={() => onItemClick(item.id)}
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
  );
}
