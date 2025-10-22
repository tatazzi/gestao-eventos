"use client";

import { useState } from "react";
import { Plus, Edit, Trash, Copy } from "@/assets";
import Modal from "./Modal";
import NewCouponForm from "./NewCouponForm";
import EditCouponForm from "./EditCouponForm";

interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  discount: number;
  validityStart: string;
  validityEnd: string;
  usage: number;
  maxUsage: number;
  status: "active" | "inactive";
}

export default function CouponsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "1",
      code: "DESCONTO20",
      type: "percentage",
      discount: 20,
      validityStart: "01/01/2025",
      validityEnd: "31/12/2025",
      usage: 45,
      maxUsage: 100,
      status: "active"
    },
    {
      id: "2",
      code: "FIXO50",
      type: "fixed",
      discount: 50,
      validityStart: "15/03/2025",
      validityEnd: "30/04/2025",
      usage: 12,
      maxUsage: 50,
      status: "inactive"
    }
  ]);

  const handleCreateCoupon = (couponData: any) => {
    setCoupons(prev => [...prev, couponData]);
    setIsModalOpen(false);
  };

  const handleEditCoupon = (couponData: any) => {
    setCoupons(prev => prev.map(coupon => 
      coupon.id === couponData.id ? couponData : coupon
    ));
    setIsEditModalOpen(false);
    setSelectedCoupon(null);
  };

  const handleEditClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsEditModalOpen(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDiscount = (coupon: Coupon) => {
    if (coupon.type === "percentage") {
      return `${coupon.discount}%`;
    } else {
      return formatCurrency(coupon.discount);
    }
  };

  const formatValidity = (start: string, end: string) => {
    return `${start} - ${end}`;
  };

  const formatUsage = (usage: number, maxUsage: number) => {
    return `${usage}/${maxUsage}`;
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Ativo
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Inativo
        </span>
      );
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Cupons de Desconto</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Novo Cupom</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Código</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Tipo</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Desconto</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Validade</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Uso</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {coupon.code}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {coupon.type === "percentage" ? "Percentual" : "Valor Fixo"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatDiscount(coupon)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatValidity(coupon.validityStart, coupon.validityEnd)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatUsage(coupon.usage, coupon.maxUsage)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(coupon.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditClick(coupon)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Copy className="h-4 w-4" />
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
        <div className="py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-700">
            Mostrando {coupons.length} resultados 
          </p>
        </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Cupom"
      >
        <NewCouponForm
          onSubmit={handleCreateCoupon}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCoupon(null);
        }}
        title="Editar Cupom"
      >
        {selectedCoupon && (
          <EditCouponForm
            couponData={selectedCoupon}
            onSubmit={handleEditCoupon}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedCoupon(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
