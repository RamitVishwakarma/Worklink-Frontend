import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../api';
import { User, UserType } from '../types';

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, userData?: User) => Promise<void>;
  logout: () => void;
  signup: (token: string, userData?: User) => Promise<void>;
  checkAuth: () => Promise<void>;
  setUserAndToken: (user: User | null, token: string | null) => void;
  updateUser: (userData: Partial<User>) => void;
}

// Helper to get router instance - this is a common pattern, or pass router as an argument to actions
// For simplicity, direct router usage is avoided here; redirection should be handled in components or HOCs.

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,
      isAuthenticated: false,

      setUserAndToken: (user, token) => {
        set({ user, token, isAuthenticated: !!token, isLoading: false });
        if (token) {
          // Ensure token doesn't have 'Bearer ' prefix when setting axios header
          const cleanToken = token.replace('Bearer ', '');
          api.defaults.headers.common['Authorization'] = `Bearer ${cleanToken}`;
        } else {
          delete api.defaults.headers.common['Authorization'];
        }
      },

      login: async (token: string, userData?: User) => {
        set({ isLoading: true });
        // User data should be provided from the authentication response
        if (!userData) {
          console.error('User data must be provided during login');
          set({ isLoading: false });
          return;
        }
        get().setUserAndToken(userData, token);
      },

      signup: async (token: string, userData?: User) => {
        // Similar to login, sets token and user data
        await get().login(token, userData);
      },

      logout: () => {
        get().setUserAndToken(null, null);
        // Redirection should be handled by the component/HOC calling logout
      },

      checkAuth: async () => {
        set({ isLoading: true });
        const state = get();
        const token = state.token;
        if (token) {
          // If we have a token, assume the user is authenticated
          // The user data should already be in the store from login/signup
          const currentUser = state.user;
          if (currentUser) {
            const cleanToken = token.replace('Bearer ', '');
            api.defaults.headers.common['Authorization'] =
              `Bearer ${cleanToken}`;
            state.setUserAndToken(currentUser, token);
          } else {
            // If no user data but we have a token, clear everything
            state.setUserAndToken(null, null);
          }
        } else {
          state.setUserAndToken(null, null);
        }
      },

      updateUser: (userData: Partial<User>) => {
        const state = get();
        const currentUser = state.user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
        }
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ token: state.token, user: state.user }), // Persist only token and user
      onRehydrateStorage: () => (state, error) => {
        if (state && state.token) {
          // This function is called when the storage is rehydrated.
          // Ensure token doesn't have 'Bearer ' prefix when setting axios header
          const cleanToken = state.token.replace('Bearer ', '');
          api.defaults.headers.common['Authorization'] = `Bearer ${cleanToken}`;
          state.isAuthenticated = !!state.token;
          state.isLoading = false;
        } else if (state) {
          state.isAuthenticated = false;
          state.isLoading = false;
        }
      },
    }
  )
);

// No need for a separate useAuth hook, components can directly use useAuthStore.

// Higher-Order Component for protecting routes
// This will now be a client component that uses the store
