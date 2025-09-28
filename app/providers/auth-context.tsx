"use client";

import React, { createContext, useContext, useCallback } from 'react';
import { LoginPayload, UserProfile } from "@/services/models";
import { authService } from "@/services";
import { useAuthUser } from "@/app/hooks";

// --- DEFINITIONS ---

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- PROVIDER COMPONENT ---

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, isAuthenticated, loading, error, mutateUser } = useAuthUser();

  const login = useCallback(
    async (credentials: LoginPayload) => {
      try {
        const user = await authService.login(credentials);
        // cập nhật lại cache SWR với user mới
        mutateUser(user, false);
      } catch (error) {
        throw error; // component Login sẽ handle
      }
    },
    [mutateUser]
  );

  const logout = useCallback(() => {
    authService.logout();
    // clear cache SWR
    mutateUser(null, false);
  }, [mutateUser]);

  const value: AuthContextType = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

// --- CUSTOM HOOK ---

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Basic Loading Component
const LoadingScreen = () => (
  <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading page...</div>
);
