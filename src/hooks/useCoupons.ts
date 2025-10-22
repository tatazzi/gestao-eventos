import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001';

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  discount: number;
  validityStart: string;
  validityEnd: string;
  usage: number;
  maxUsage: number;
  status: 'active' | 'inactive';
}

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/coupons`);
      if (!response.ok) {
        throw new Error('Failed to fetch coupons');
      }
      const data = await response.json();
      setCoupons(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createCoupon = async (couponData: Omit<Coupon, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/coupons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(couponData),
      });

      if (!response.ok) {
        throw new Error('Failed to create coupon');
      }

      const newCoupon = await response.json();
      setCoupons(prev => [...prev, newCoupon]);
      return newCoupon;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateCoupon = async (id: string, couponData: Partial<Coupon>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/coupons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(couponData),
      });

      if (!response.ok) {
        throw new Error('Failed to update coupon');
      }

      const updatedCoupon = await response.json();
      setCoupons(prev => prev.map(coupon => 
        coupon.id === id ? updatedCoupon : coupon
      ));
      return updatedCoupon;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteCoupon = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/coupons/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete coupon');
      }

      setCoupons(prev => prev.filter(coupon => coupon.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return {
    coupons,
    loading,
    error,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    refetch: fetchCoupons,
  };
};
