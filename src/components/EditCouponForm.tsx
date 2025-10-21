"use client";

import { useState, useEffect } from "react";

type CouponData = {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  discount: number;
  validityStart: string;
  validityEnd: string;
  usage: number;
  maxUsage: number;
  status: "active" | "inactive";
};

type EditCouponFormProps = {
  couponData: CouponData;
  onSubmit: (couponData: any) => void;
  onCancel: () => void;
};

export default function EditCouponForm({ couponData, onSubmit, onCancel }: EditCouponFormProps) {
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage" as "percentage" | "fixed",
    discount: "",
    validityStart: "",
    validityEnd: "",
    maxUsage: "",
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    setFormData({
      code: couponData.code,
      type: couponData.type,
      discount: couponData.discount.toString(),
      validityStart: couponData.validityStart,
      validityEnd: couponData.validityEnd,
      maxUsage: couponData.maxUsage.toString(),
      status: couponData.status,
    });
  }, [couponData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedCouponData = {
      ...couponData,
      code: formData.code,
      type: formData.type,
      discount: parseFloat(formData.discount),
      validityStart: formData.validityStart,
      validityEnd: formData.validityEnd,
      maxUsage: parseInt(formData.maxUsage) || 0,
      status: formData.status
    };

    onSubmit(updatedCouponData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Código do Cupom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Digite o código do cupom"
            value={formData.code}
            onChange={(e) => handleInputChange('code', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Tipo de Desconto <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            required
          >
            <option value="percentage">Percentual</option>
            <option value="fixed">Valor Fixo</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            {formData.type === "percentage" ? "Percentual de Desconto (%)" : "Valor do Desconto (R$)"} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder={formData.type === "percentage" ? "Ex: 20" : "Ex: 50.00"}
            value={formData.discount}
            onChange={(e) => handleInputChange('discount', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            min="0"
            step={formData.type === "percentage" ? "1" : "0.01"}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Máximo de Usos <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Quantidade máxima de usos"
            value={formData.maxUsage}
            onChange={(e) => handleInputChange('maxUsage', e.target.value)}
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
            value={formData.validityStart}
            onChange={(e) => handleInputChange('validityStart', e.target.value)}
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
            value={formData.validityEnd}
            onChange={(e) => handleInputChange('validityEnd', e.target.value)}
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
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
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
