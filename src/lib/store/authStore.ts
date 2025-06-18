import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api, {
  getCurrentUser,
  signinUser as apiSigninUser,
  signupUser as apiSignupUser,
} from '../api';
import { User, UserType } from '../types';
import { useRouter } from 'next/navigation'; // Import for redirection, though direct usage in store is tricky

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
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          delete api.defaults.headers.common['Authorization'];
        }
      },

      login: async (token: string, userData?: User) => {
        set({ isLoading: true });
        let userToSet = userData;
        if (!userToSet) {
          try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await getCurrentUser();
            userToSet = response.user;
          } catch (error) {
            console.error('Failed to fetch user after login:', error);
            get().setUserAndToken(null, null); // Clear auth state on error
            return;
          }
        }
        get().setUserAndToken(userToSet!, token);
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
        const token = get().token;
        if (token) {
          try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await getCurrentUser();
            get().setUserAndToken(response.user, token);
          } catch (error) {
            console.error('Token validation failed:', error);
            get().setUserAndToken(null, null);
          }
        } else {
          get().setUserAndToken(null, null);
        }
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
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
        if (state) {
          // This function is called when the storage is rehydrated.
          // We can trigger checkAuth or initial token validation here if needed.
          // For example, to ensure the token is still valid on app load.
          // state.checkAuth(); // Be cautious with async operations here.
          // For now, we set isLoading to false after rehydration is attempted.
          // The actual validation will happen in a useEffect in _app.tsx or a layout component.
          api.defaults.headers.common['Authorization'] =
            `Bearer ${state.token}`;
          state.isAuthenticated = !!state.token;
          state.isLoading = false;
        }
      },
    }
  )
);

// No need for a separate useAuth hook, components can directly use useAuthStore.

// Higher-Order Component for protecting routes
// This will now be a client component that uses the store
