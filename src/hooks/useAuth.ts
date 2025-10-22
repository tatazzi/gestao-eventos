"use client";

import { useState } from 'react';

const API_BASE_URL = 'http://localhost:3001';

export interface User {
  id: string;
  fullName: string;
  establishmentName: string;
  cpfCnpj: string;
  companyName: string;
  tradeName: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface SignupData {
  fullName: string;
  establishmentName: string;
  cpfCnpj: string;
  companyName: string;
  tradeName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: string;
}

export const saveToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
};

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (signupData: SignupData): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar conta');
      }

      const data: AuthResponse = await response.json();
      

      saveToken(data.token);
      
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar conta';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData: LoginData): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao fazer login');
      }

      const data: AuthResponse = await response.json();
      
      saveToken(data.token);
      
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async (): Promise<User | null> => {
    const token = getToken();
    
    if (!token) {
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        removeToken();
        return null;
      }

      const data = await response.json();
      return data.user;
    } catch (err) {
      removeToken();
      return null;
    }
  };

  const logout = () => {
    removeToken();
  };

  return {
    signup,
    login,
    verifyToken,
    logout,
    loading,
    error,
  };
};
