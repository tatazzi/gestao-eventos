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
  password: string;
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

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (signupData: SignupData): Promise<User | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const checkResponse = await fetch(`${API_BASE_URL}/users?email=${signupData.email}`);
      if (!checkResponse.ok) {
        throw new Error('Erro ao verificar email');
      }
      
      const existingUsers = await checkResponse.json();
      if (existingUsers.length > 0) {
        throw new Error('Este email já está cadastrado');
      }

      const newUser = {
        ...signupData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar conta');
      }

      const createdUser = await response.json();
      return createdUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar conta';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData: LoginData): Promise<User | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/users?email=${loginData.email}&password=${loginData.password}`);
      
      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const users = await response.json();
      
      if (users.length === 0) {
        throw new Error('Email ou senha incorretos');
      }

      return users[0];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    login,
    loading,
    error,
  };
};

