"use client";

import { useState, useEffect } from "react";

type SectorData = {
  id: string;
  name: string;
  description: string;
  totalCapacity: number;
  available: number;
  basePrice: number;
  status: "active" | "inactive";
};

type EditSectorFormProps = {
  sectorData: SectorData;
  onSubmit: (sectorData: any) => void;
  onCancel: () => void;
};

export default function EditSectorForm({ sectorData, onSubmit, onCancel }: EditSectorFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    totalCapacity: "",
    available: "",
    basePrice: "",
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    setFormData({
      name: sectorData.name,
      description: sectorData.description,
      totalCapacity: sectorData.totalCapacity.toString(),
      available: sectorData.available.toString(),
      basePrice: sectorData.basePrice.toString(),
      status: sectorData.status,
    });
  }, [sectorData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedSectorData = {
      ...sectorData,
      name: formData.name,
      description: formData.description,
      totalCapacity: parseInt(formData.totalCapacity) || 0,
      available: parseInt(formData.available) || 0,
      basePrice: parseFloat(formData.basePrice) || 0,
      status: formData.status
    };

    onSubmit(updatedSectorData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Nome do Setor <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Digite o nome do setor"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            required
          />
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
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-lightText mb-2">
          Descrição <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Digite a descrição do setor"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Capacidade Total <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Capacidade total do setor"
            value={formData.totalCapacity}
            onChange={(e) => handleInputChange('totalCapacity', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            min="1"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Disponíveis <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Quantidade disponível"
            value={formData.available}
            onChange={(e) => handleInputChange('available', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            min="0"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Preço Base (R$) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Preço base do setor"
            value={formData.basePrice}
            onChange={(e) => handleInputChange('basePrice', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            min="0"
            step="0.01"
            required
          />
        </div>
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
