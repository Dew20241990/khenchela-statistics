// Authentication Context - Mock Implementation
// For production, integrate with Supabase Auth

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole, Institution, AuthState, ROLE_PERMISSIONS, hasPermission, canAccessInstitution, Permission } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  canAccessInstitution: (institution: Institution) => boolean;
  isYearEditable: (year: number) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for development
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@khenchela.gov.dz': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@khenchela.gov.dz',
      name: 'المسؤول العام',
      role: 'super_admin',
      institution: 'directorate',
      permissions: ROLE_PERMISSIONS.super_admin,
      createdAt: new Date('2024-01-01'),
      isActive: true,
    },
  },
  'cnas@khenchela.gov.dz': {
    password: 'cnas123',
    user: {
      id: '2',
      email: 'cnas@khenchela.gov.dz',
      name: 'مسؤول CNAS',
      role: 'institution_admin',
      institution: 'cnas',
      permissions: ROLE_PERMISSIONS.institution_admin,
      createdAt: new Date('2024-01-01'),
      isActive: true,
    },
  },
  'analyst@khenchela.gov.dz': {
    password: 'analyst123',
    user: {
      id: '3',
      email: 'analyst@khenchela.gov.dz',
      name: 'محلل إحصائي',
      role: 'analyst',
      institution: 'employment',
      permissions: ROLE_PERMISSIONS.analyst,
      createdAt: new Date('2024-01-01'),
      isActive: true,
    },
  },
  'viewer@khenchela.gov.dz': {
    password: 'viewer123',
    user: {
      id: '4',
      email: 'viewer@khenchela.gov.dz',
      name: 'مطالع',
      role: 'viewer',
      institution: 'directorate',
      permissions: ROLE_PERMISSIONS.viewer,
      createdAt: new Date('2024-01-01'),
      isActive: true,
    },
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    // Check localStorage for persisted session
    const savedUser = localStorage.getItem('gov_stats_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        return { user, isAuthenticated: true, isLoading: false };
      } catch {
        localStorage.removeItem('gov_stats_user');
      }
    }
    return { user: null, isAuthenticated: false, isLoading: false };
  });

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const mockUser = MOCK_USERS[email];
    if (mockUser && mockUser.password === password) {
      const user = { ...mockUser.user, lastLogin: new Date() };
      localStorage.setItem('gov_stats_user', JSON.stringify(user));
      setState({ user, isAuthenticated: true, isLoading: false });
      return true;
    }
    
    setState((prev) => ({ ...prev, isLoading: false }));
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('gov_stats_user');
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const checkPermission = useCallback((permission: Permission): boolean => {
    return hasPermission(state.user, permission);
  }, [state.user]);

  const checkInstitutionAccess = useCallback((institution: Institution): boolean => {
    return canAccessInstitution(state.user, institution);
  }, [state.user]);

  const checkYearEditable = useCallback((year: number): boolean => {
    if (!state.user) return false;
    const currentYear = new Date().getFullYear();
    // Super admin can edit any year, others only current year
    if (state.user.role === 'super_admin') return true;
    return year === currentYear;
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        hasPermission: checkPermission,
        canAccessInstitution: checkInstitutionAccess,
        isYearEditable: checkYearEditable,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
