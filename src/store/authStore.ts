import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { removeToken } from '@/hooks/useAuth';

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

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      login: (user) => set({ 
        user, 
        isAuthenticated: true 
      }),
      
      logout: () => {
        removeToken();
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },
      
      updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null
      })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

