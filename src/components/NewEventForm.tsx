"use client";

import { useState } from "react";

type NewEventFormProps = {
  onSubmit: (eventData: any) => void;
  onCancel: () => void;
};

export default function NewEventForm({ onSubmit, onCancel }: NewEventFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    location: "",
    status: "Rascunho",
    totalTickets: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newId = String(Date.now()).slice(-3);
    
    const eventData = {
      id: newId,
      name: formData.name,
      date: formData.date,
      time: `${formData.startTime} - ${formData.endTime}`,
      venue: formData.venue,
      location: formData.location,
      status: formData.status,
      ticketsSold: 0,
      totalTickets: parseInt(formData.totalTickets) || 0
    };

    onSubmit(eventData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Nome do Evento <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Digite o nome do evento"
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
            <option value="Rascunho">Rascunho</option>
            <option value="Publicado">Publicado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Data <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Hora de Início <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) => handleInputChange('startTime', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Hora de Fim <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            value={formData.endTime}
            onChange={(e) => handleInputChange('endTime', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Local/Venue <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Nome do local"
            value={formData.venue}
            onChange={(e) => handleInputChange('venue', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Cidade/Estado <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Cidade, Estado"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-lightText mb-2">
          Total de Ingressos <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Quantidade total de ingressos"
          value={formData.totalTickets}
          onChange={(e) => handleInputChange('totalTickets', e.target.value)}
          className="w-full h-12 px-4 border border-inputBorder rounded-lg bg-white text-lightText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent transition-all"
          min="1"
          required
        />
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
          Criar Evento
        </button>
      </div>
    </form>
  );
}
