"use client";

import { useState } from "react";
import { Plus, Edit, Trash, Copy, Play } from "@/assets";
import Modal from "./Modal";
import NewLotForm from "./NewLotForm";
import EditLotForm from "./EditLotForm";
import { useLots, Lot } from "@/hooks/useLots";

export default function LotsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const { lots, loading, error, createLot, updateLot, deleteLot } = useLots();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatQuantity = (sold: number, total: number) => {
    return `${sold}/${total}`;
  };

  const formatPeriod = (start: string, end: string) => {
    return `${start} - ${end}`;
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      selling: { text: "Em venda", bg: "bg-gray-100", textColor: "text-gray-800" },
      scheduled: { text: "Agendado", bg: "bg-gray-100", textColor: "text-gray-800" },
      closed: { text: "Encerrado", bg: "bg-gray-100", textColor: "text-gray-800" }
    };

    const statusInfo = statusMap[status as keyof typeof statusMap];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.textColor}`}>
        {statusInfo.text}
      </span>
    );
  };

  const handleCreateLot = async (lotData: any) => {
    try {
      await createLot(lotData);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating lot:', error);
    }
  };

  const handleEditLot = async (lotData: any) => {
    try {
      await updateLot(lotData.id, lotData);
      setIsEditModalOpen(false);
      setSelectedLot(null);
    } catch (error) {
      console.error('Error updating lot:', error);
    }
  };

  const handleDeleteLot = async (lotId: string) => {
    if (confirm('Tem certeza que deseja excluir este lote?')) {
      try {
        await deleteLot(lotId);
      } catch (error) {
        console.error('Error deleting lot:', error);
      }
    }
  };

  const handleEditClick = (lot: Lot) => {
    setSelectedLot(lot);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Carregando lotes...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">Erro ao carregar lotes: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Lotes por Setor</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Novo Lote</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Nome do Lote</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Setor</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Preço</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Quantidade</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Período</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lots.map((lot) => (
                <tr key={lot.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {lot.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {lot.sector}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatCurrency(lot.price)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatQuantity(lot.sold, lot.total)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatPeriod(lot.startDate, lot.endDate)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(lot.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleEditClick(lot)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteLot(lot.id)}
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
        <div className=" py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-700">
            Mostrando {lots.length} resultados
          </p>
        </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Lote"
      >
        <NewLotForm
          onSubmit={handleCreateLot}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedLot(null);
        }}
        title="Editar Lote"
      >
        {selectedLot && (
          <EditLotForm
            lotData={selectedLot}
            onSubmit={handleEditLot}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedLot(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
