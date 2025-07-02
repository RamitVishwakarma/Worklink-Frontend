import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { workerAPI, startupAPI, manufacturerAPI, authAPI } from '../api';
import type {
  WorkerProfile,
  StartupProfile,
  ManufacturerProfile,
} from '../types';
import { UserType } from '../types';

type Profile = WorkerProfile | StartupProfile | ManufacturerProfile;

export interface ProfilesState {
  // Data
  currentProfile: Profile | null;

  // Loading states
  isLoading: boolean;
  isUpdating: boolean;

  // Actions
  fetchProfile: (userId: string, userType: UserType) => Promise<void>;
  updateProfile: (
    userId: string,
    userType: UserType,
    profileData: Partial<Profile>
  ) => Promise<Profile>;

  // Current authenticated user profile actions
  fetchCurrentUserProfile: (userType: UserType) => Promise<void>;
  updateCurrentUserProfile: (
    userType: UserType,
    profileData: Partial<Profile>
  ) => Promise<Profile>;

  clearProfile: () => void;
  reset: () => void;
}

const initialState = {
  currentProfile: null,
  isLoading: false,
  isUpdating: false,
};

export const useProfilesStore = create<ProfilesState>()(
  persist(
    (set, get) => ({
      ...initialState,

      fetchProfile: async (userId: string, userType: UserType) => {
        set({ isLoading: true });
        try {
          let profile: Profile;

          switch (userType) {
            case UserType.WORKER:
              profile = await workerAPI.getProfile();
              break;
            case UserType.STARTUP:
              profile = await startupAPI.getProfile();
              break;
            case UserType.MANUFACTURER:
              profile = await manufacturerAPI.getProfile();
              break;
            default:
              throw new Error(`Unknown user type: ${userType}`);
          }

          set({ currentProfile: profile, isLoading: false });
        } catch (error) {
          console.error('Failed to fetch profile:', error);
          set({ isLoading: false });
          throw error;
        }
      },
      updateProfile: async (
        userId: string,
        userType: UserType,
        profileData: Partial<Profile>
      ) => {
        set({ isUpdating: true });
        try {
          let updatedProfile: Profile;

          switch (userType) {
            case UserType.WORKER:
              updatedProfile = await workerAPI.updateProfile(
                profileData as Partial<WorkerProfile>
              );
              break;
            case UserType.STARTUP:
              updatedProfile = await startupAPI.updateProfile(
                profileData as Partial<StartupProfile>
              );
              break;
            case UserType.MANUFACTURER:
              updatedProfile = await manufacturerAPI.updateProfile(
                profileData as Partial<ManufacturerProfile>
              );
              break;
            default:
              throw new Error(`Unknown user type: ${userType}`);
          }

          set({ currentProfile: updatedProfile, isUpdating: false });
          return updatedProfile;
        } catch (error) {
          console.error('Failed to update profile:', error);
          set({ isUpdating: false });
          throw error;
        }
      },

      fetchCurrentUserProfile: async (userType: UserType) => {
        set({ isLoading: true });
        try {
          let profile: Profile;

          switch (userType) {
            case UserType.WORKER:
              profile = await workerAPI.getProfile();
              break;
            case UserType.STARTUP:
              profile = await startupAPI.getProfile();
              break;
            case UserType.MANUFACTURER:
              profile = await manufacturerAPI.getProfile();
              break;
            default:
              throw new Error(`Unknown user type: ${userType}`);
          }

          set({ currentProfile: profile, isLoading: false });
        } catch (error) {
          console.error('Failed to fetch current user profile:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      updateCurrentUserProfile: async (
        userType: UserType,
        profileData: Partial<Profile>
      ) => {
        set({ isUpdating: true });
        try {
          let updatedProfile: Profile;

          switch (userType) {
            case UserType.WORKER:
              updatedProfile = await workerAPI.updateProfile(
                profileData as Partial<WorkerProfile>
              );
              break;
            case UserType.STARTUP:
              updatedProfile = await startupAPI.updateProfile(
                profileData as Partial<StartupProfile>
              );
              break;
            case UserType.MANUFACTURER:
              updatedProfile = await manufacturerAPI.updateProfile(
                profileData as Partial<ManufacturerProfile>
              );
              break;
            default:
              throw new Error(`Unknown user type: ${userType}`);
          }

          set({ currentProfile: updatedProfile, isUpdating: false });
          return updatedProfile;
        } catch (error) {
          console.error('Failed to update current user profile:', error);
          set({ isUpdating: false });
          throw error;
        }
      },

      clearProfile: () => set({ currentProfile: null }),
      reset: () => set(initialState),
    }),
    {
      name: 'profiles-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist the current profile
        currentProfile: state.currentProfile,
      }),
    }
  )
);
