"use client";

import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001';

export interface Settings {
  id: number;
  primaryColor: string;
  secondaryColor: string;
}

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/settings`);
      if (!response.ok) throw new Error('Failed to fetch settings');

      const data = await response.json();
      setSettings(data[0]); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (id: string | number, settingsData: Partial<Settings>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData),
      });

      if (!response.ok) throw new Error('Failed to update settings');

      const updatedSettings = await response.json();
      setSettings(updatedSettings);
      return updatedSettings;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    updateSettings,
    refetch: fetchSettings,
  };
};