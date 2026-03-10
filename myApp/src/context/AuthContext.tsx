// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  continueAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  const login = async (email: string, password: string) => {
    // API call simulation
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      phone: '+1234567890',
      role: 'user',
      token: 'mock-token'
    };
    setUser(mockUser);
    setIsGuest(false);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const register = async (userData: Partial<User>) => {
    const mockUser: User = {
      id: '1',
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || 'user',
      token: 'mock-token',
      verificationStatus: userData.role === 'rider' ? 'pending' : undefined,
      vehicle: userData.vehicle,
      licensePlate: userData.licensePlate,
      licenseNumber: userData.licenseNumber,
      bankAccount: userData.bankAccount,
      bankName: userData.bankName,
    };
    setUser(mockUser);
    setIsGuest(false);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('user');
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setUser(null);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isGuest, login, register, logout, continueAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};