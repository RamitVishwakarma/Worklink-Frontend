'use client';

import React, { useEffect } from 'react';
import { useAutoFetch } from '@/hooks/useApiIntegration';
import { useAuthStore } from '@/lib/store/authStore';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const { isAuthenticated } = useAuthStore();
  const { refetch } = useAutoFetch();

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    // This useEffect will only run on the client
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          useAuthStore.getState().setUserAndToken(user, token);
        } catch (error) {
          console.error('Failed to restore auth state:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    }
  }, []);

  return <>{children}</>;
}

// Component for authenticated app shell with data fetching
export function AuthenticatedAppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  useAutoFetch(); // This will automatically fetch data based on user role

  return <>{children}</>;
}
