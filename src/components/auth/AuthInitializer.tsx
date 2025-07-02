'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

export function AuthInitializer() {
  const initRef = useRef(false);

  useEffect(() => {
    // Initialize auth state when the app loads, but only once
    if (!initRef.current) {
      initRef.current = true;
      // Access the store directly to avoid dependency issues
      useAuthStore.getState().checkAuth();
    }
  }, []); // Empty dependency array to run only once

  return null; // This component doesn't render anything
}
