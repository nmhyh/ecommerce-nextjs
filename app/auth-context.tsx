"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LoginPayload, UserProfile } from "@/services/models";
import { authService, localStorageService } from "@/services";

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
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Loads current user information when the application loads
  const loadUserFromToken = useCallback(async () => {
    try {
      const userDetails = await authService.getCurrentUser();
      // Attach the token back to the User object
      setCurrentUser({ ...userDetails });
    } catch (error) {
      // If the token is expired or invalid, log out
      authService.logout();
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorageService.getItem('authToken');
    if (token) {
      loadUserFromToken();
    } else {
      setLoading(false);
    }
  }, [loadUserFromToken]);

  const login = useCallback(async (credentials: LoginPayload) => {
    setLoading(true);
    try {
      const user = await authService.login(credentials);
      setCurrentUser(user);
    } catch (error) {
      throw error; // Throw the error so the Login component can handle it
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setCurrentUser(null);
  }, []);

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: !!currentUser,
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
