"use client";

import { useState } from "react";
import { Plus, Edit, Trash } from "@/assets";
import Modal from "./Modal";
import NewSectorForm from "./NewSectorForm";
import EditSectorForm from "./EditSectorForm";
import { useSectors, Sector } from "@/hooks/useSectors";

export default function SectorsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const { sectors, loading, error, createSector, updateSector, deleteSector } = useSectors();

  const handleCreateSector = async (sectorData: any) => {
    try {
      await createSector(sectorData);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating sector:', error);
    }
  };

  const handleEditSector = async (sectorData: any) => {
    try {
      await updateSector(sectorData.id, sectorData);
      setIsEditModalOpen(false);
      setSelectedSector(null);
    } catch (error) {
      console.error('Error updating sector:', error);
    }
  };

  const handleDeleteSector = async (sectorId: string) => {
    if (confirm('Tem certeza que deseja excluir este setor?')) {
      try {
        await deleteSector(sectorId);
      } catch (error) {
        console.error('Error deleting sector:', error);
      }
    }
  };

  const handleEditClick = (sector: Sector) => {
    setSelectedSector(sector);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Carregando setores...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">Erro ao carregar setores: {error}</div>
        </div>
      </div>
    );
  }

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

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Setores do Evento</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Novo Setor</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      
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
                      <button 
                        onClick={() => handleEditClick(sector)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteSector(sector.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
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
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Mostrando {sectors.length} resultados
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Setor"
      >
        <NewSectorForm
          onSubmit={handleCreateSector}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedSector(null);
        }}
        title="Editar Setor"
      >
        {selectedSector && (
          <EditSectorForm
            sectorData={selectedSector}
            onSubmit={handleEditSector}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedSector(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
