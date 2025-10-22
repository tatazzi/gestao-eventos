import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001';

export interface Sector {
  id: string;
  name: string;
  description: string;
  totalCapacity: number;
  available: number;
  basePrice: number;
  status: 'active' | 'inactive';
}

export const useSectors = () => {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSectors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/sectors`);
      if (!response.ok) {
        throw new Error('Failed to fetch sectors');
      }
      const data = await response.json();
      setSectors(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createSector = async (sectorData: Omit<Sector, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sectors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sectorData),
      });

      if (!response.ok) {
        throw new Error('Failed to create sector');
      }

      const newSector = await response.json();
      setSectors(prev => [...prev, newSector]);
      return newSector;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateSector = async (id: string, sectorData: Partial<Sector>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sectors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sectorData),
      });

      if (!response.ok) {
        throw new Error('Failed to update sector');
      }

      const updatedSector = await response.json();
      setSectors(prev => prev.map(sector => 
        sector.id === id ? updatedSector : sector
      ));
      return updatedSector;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteSector = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sectors/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete sector');
      }

      setSectors(prev => prev.filter(sector => sector.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  return {
    sectors,
    loading,
    error,
    createSector,
    updateSector,
    deleteSector,
    refetch: fetchSectors,
  };
};
