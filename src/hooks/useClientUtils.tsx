'use client';

import { useState, useEffect } from 'react';

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

export function useIsMobile() {
  const isClient = useIsClient();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isClient) {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, [isClient]);

  return isMobile;
}

// Hook for generating stable IDs that won't cause hydration mismatches
export function useStableId(prefix: string = 'id') {
  // This will be undefined on server, then set on client without causing hydration mismatch
  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Only generate random ID on the client side
    setId(`${prefix}-${Math.random().toString(36).substring(2, 9)}`);
  }, [prefix]);

  // Return a stable ID that works with SSR
  return id || `${prefix}-placeholder`;
}
