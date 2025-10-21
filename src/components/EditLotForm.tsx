"use client";

import { useState, useEffect } from "react";

type LotData = {
  id: string;
  name: string;
  sector: string;
  price: number;
  sold: number;
  total: number;
  startDate: string;
  endDate: string;
  status: "selling" | "scheduled" | "closed";
};

type EditLotFormProps = {
  lotData: LotData;
  onSubmit: (lotData: any) => void;
  onCancel: () => void;
};

export default function EditLotForm({ lotData, onSubmit, onCancel }: EditLotFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    price: "",
    total: "",
    startDate: "",
    endDate: "",
    status: "scheduled" as "selling" | "scheduled" | "closed",
  });

  useEffect(() => {
    setFormData({
      name: lotData.name,
      sector: lotData.sector,
      price: lotData.price.toString(),
      total: lotData.total.toString(),
      startDate: lotData.startDate,
      endDate: lotData.endDate,
      status: lotData.status,
    });
  }, [lotData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedLotData = {
      ...lotData,
      name: formData.name,
      sector: formData.sector,
      price: parseFloat(formData.price) || 0,
      total: parseInt(formData.total) || 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: formData.status
    };

    onSubmit(updatedLotData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Nome do Lote <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Digite o nome do lote"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Setor <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.sector}
            onChange={(e) => handleInputChange('sector', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            required
          >
            <option value="">Selecione um setor</option>
            <option value="Pista">Pista</option>
            <option value="Camarote VIP">Camarote VIP</option>
            <option value="Arquibancada">Arquibancada</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Preço (R$) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Preço do lote"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Quantidade Total <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Quantidade total de ingressos"
            value={formData.total}
            onChange={(e) => handleInputChange('total', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            min="1"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Data de Início <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Data de Fim <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-lightText mb-2">
          Status <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
          className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
          required
        >
          <option value="scheduled">Agendado</option>
          <option value="selling">Em venda</option>
          <option value="closed">Encerrado</option>
        </select>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-brandPrimary text-white rounded-lg hover:bg-brandPrimary/80 transition-colors"
        >
          Salvar Alterações
        </button>
      </div>
    </form>
  );
}