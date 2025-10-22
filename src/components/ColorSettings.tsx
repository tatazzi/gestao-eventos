"use client";

import { useState, useEffect } from "react";
import { useSettings, Settings } from "@/hooks/useSettings";

export default function ColorSettings() {
  const { settings, loading, error, updateSettings } = useSettings();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    primaryColor: "",
    secondaryColor: "", 
  });
 
  const handleEditsettings = async () => {
      if (!settings) return;
      try {
          setSaving(true);
          
          const updatedSettings = {
              id: settings.id,
              primaryColor: formData.primaryColor,
              secondaryColor: formData.secondaryColor,
            };
            
      await updateSettings(updatedSettings.id, updatedSettings);
  
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
        console.error('Erro ao atualizar configurações:', error);
    } finally {
        setSaving(false);
    }
};

useEffect(() => {
  if (settings) {
    setFormData({
      primaryColor: settings.primaryColor|| "",
      secondaryColor: settings.secondaryColor|| "",
    });
  }
}, [settings]);

  const handleInputChange = (field: keyof Settings, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="text-gray-600">Carregando configurações...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="text-red-600">Erro ao carregar configurações: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Configurações de Cores - Página de Eventos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cor Primária
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={formData.primaryColor}
              onChange={(e) => handleInputChange('primaryColor', e.target.value)}
              className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer"
            />
            <div className="flex-1">
              <input
                type="text"
                value={formData.primaryColor}
                onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="#1f2937"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Cor principal usada no header, botões e footer
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cor Secundária (Hover)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={formData.secondaryColor}
              onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
              className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer"
            />
            <div className="flex-1">
              <input
                type="text"
                value={formData.secondaryColor}
                onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="#374151"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Cor usada no hover dos botões
          </p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Preview das Cores</h3>
        <div className="flex gap-4 flex-wrap">
          <button
            className="px-4 py-2 rounded-lg text-white font-medium"
            style={{ backgroundColor: formData.primaryColor }}
          >
            Botão Primário
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white font-medium"
            style={{ backgroundColor: formData.secondaryColor }}
          >
            Botão Secundário
          </button>
          <div
            className="px-4 py-2 rounded-lg text-white font-medium"
            style={{ backgroundColor: formData.primaryColor }}
          >
            Header/Footer
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleEditsettings}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Salvando..." : "Salvar Configurações"}
        </button>
      </div>

      {success && (
        <div className="mt-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-lg text-center">
          Configurações salvas com sucesso! As mudanças serão aplicadas na página de eventos.
        </div>
      )}
    </div>
  );
}

