import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001';

export interface Lot {
  id: string;
  name: string;
  sector: string;
  price: number;
  sold: number;
  total: number;
  startDate: string;
  endDate: string;
  status: 'selling' | 'scheduled' | 'closed';
}

export const useLots = () => {
  const [lots, setLots] = useState<Lot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLots = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/lots`);
      if (!response.ok) {
        throw new Error('Failed to fetch lots');
      }
      const data = await response.json();
      setLots(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createLot = async (lotData: Omit<Lot, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/lots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lotData),
      });

      if (!response.ok) {
        throw new Error('Failed to create lot');
      }

      const newLot = await response.json();
      setLots(prev => [...prev, newLot]);
      return newLot;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateLot = async (id: string, lotData: Partial<Lot>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/lots/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lotData),
      });

      if (!response.ok) {
        throw new Error('Failed to update lot');
      }

      const updatedLot = await response.json();
      setLots(prev => prev.map(lot => 
        lot.id === id ? updatedLot : lot
      ));
      return updatedLot;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteLot = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/lots/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete lot');
      }

      setLots(prev => prev.filter(lot => lot.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  return {
    lots,
    loading,
    error,
    createLot,
    updateLot,
    deleteLot,
    refetch: fetchLots,
  };
};

