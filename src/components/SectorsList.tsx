"use client";

import { useState } from "react";
import { Plus, Edit, Trash } from "@/assets";

interface Sector {
  id: string;
  name: string;
  description: string;
  totalCapacity: number;
  available: number;
  basePrice: number;
  status: "active" | "inactive";
}

export default function SectorsList() {
  const [sectors] = useState<Sector[]>([
    {
      id: "1",
      name: "Pista",
      description: "Área principal do evento",
      totalCapacity: 5000,
      available: 250,
      basePrice: 150.00,
      status: "active"
    },
    {
      id: "2",
      name: "Camarote VIP",
      description: "Área premium com vista privilegiada",
      totalCapacity: 200,
      available: 15,
      basePrice: 450.00,
      status: "active"
    },
    {
      id: "3",
      name: "Arquibancada",
      description: "Setor com assentos numerados",
      totalCapacity: 1500,
      available: 680,
      basePrice: 80.00,
      status: "active"
    }
  ]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const getAvailablePercentage = (available: number, total: number) => {
    return Math.round((available / total) * 100);
  };

  const getProgressBarWidth = (available: number, total: number) => {
    return (available / total) * 100;
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Setores do Evento</h1>
          <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Novo Setor</span>
          </button>
        </div>
        <p className="text-gray-600 text-lg">Gerencie os setores e capacidades dos eventos</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Lista de Setores</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Setor</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Capacidade Total</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Disponível</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Preço Base</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sectors.map((sector) => (
                <tr key={sector.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{sector.name}</div>
                      <div className="text-sm text-gray-500">{sector.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatNumber(sector.totalCapacity)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-900">
                        {formatNumber(sector.available)} ({getAvailablePercentage(sector.available, sector.totalCapacity)}%)
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gray-800 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressBarWidth(sector.available, sector.totalCapacity)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatCurrency(sector.basePrice)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Ativo
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
