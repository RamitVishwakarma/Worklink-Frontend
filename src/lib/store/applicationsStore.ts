import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { workerAPI, startupAPI, manufacturerAPI } from '../api';
import type { MachineApplication, GigApplication } from '../types';
import { useAuthStore } from './authStore';

export interface ApplicationsState {
  // Machine Applications
  machineApplications: MachineApplication[];
  machineApplicationsLoading: boolean;
  machineApplicationsError: string | null;

  // Gig Applications
  gigApplications: GigApplication[];
  gigApplicationsLoading: boolean;
  gigApplicationsError: string | null;

  // Filters (persisted)
  filters: {
    status: string;
    type: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };

  // Actions
  applyToMachine: (machineId: string, message?: string) => Promise<boolean>;
  applyToGig: (gigId: string, message?: string) => Promise<boolean>;
  updateApplicationStatus: (
    applicationId: string,
    status: 'approved' | 'rejected',
    type: 'machine' | 'gig'
  ) => Promise<boolean>;
  clearError: () => void;
  setFilters: (filters: Partial<ApplicationsState['filters']>) => void;
  resetFilters: () => void;
}

const defaultFilters = {
  status: 'all',
  type: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc' as const,
};

export const useApplicationsStore = create<ApplicationsState>()(
  persist(
    (set, get) => ({
      // Initial state
      machineApplications: [],
      machineApplicationsLoading: false,
      machineApplicationsError: null,

      gigApplications: [],
      gigApplicationsLoading: false,
      gigApplicationsError: null,

      filters: defaultFilters,

      // Actions
      applyToMachine: async (machineId: string, message?: string) => {
        try {
          const { user } = useAuthStore.getState();
          if (!user?.id) {
            throw new Error('User not authenticated');
          }

          await workerAPI.applyToMachine(machineId, user.id, { message });
          return true;
        } catch (error) {
          console.error('Failed to apply to machine:', error);
          return false;
        }
      },

      applyToGig: async (gigId: string, message?: string) => {
        try {
          const { user } = useAuthStore.getState();
          if (!user?.id) {
            throw new Error('User not authenticated');
          }

          await workerAPI.applyToGig(gigId, user.id, { message });
          return true;
        } catch (error) {
          console.error('Failed to apply to gig:', error);
          return false;
        }
      },

      updateApplicationStatus: async (
        applicationId: string,
        status: 'approved' | 'rejected',
        type: 'machine' | 'gig'
      ) => {
        try {
          if (type === 'machine') {
            await manufacturerAPI.updateApplicationStatus(
              applicationId,
              status
            );

            // Update local state optimistically
            set((state) => ({
              machineApplications: state.machineApplications.map((app) =>
                app.id === applicationId ? { ...app, status } : app
              ),
            }));
          } else {
            // Note: startupAPI.updateApplicationStatus doesn't exist in current API
            // This would need to be implemented if gig application status updates are needed
            throw new Error('Gig application status updates not implemented');
          }

          return true;
        } catch (error) {
          console.error('Failed to update application status:', error);
          return false;
        }
      },

      clearError: () => {
        set({
          machineApplicationsError: null,
          gigApplicationsError: null,
        });
      },

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      resetFilters: () => {
        set({ filters: defaultFilters });
      },
    }),
    {
      name: 'applications-store',
      partialize: (state) => ({
        filters: state.filters,
      }),
    }
  )
);

// Selectors for computed values
export const useFilteredMachineApplications = () => {
  return useApplicationsStore((state) => {
    const { machineApplications, filters } = state;

    let filtered = [...machineApplications];

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter((app) => app.status === filters.status);
    }

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy as keyof MachineApplication];
      const bValue = b[filters.sortBy as keyof MachineApplication];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return filters.sortOrder === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      return 0;
    });

    return filtered;
  });
};

export const useFilteredGigApplications = () => {
  return useApplicationsStore((state) => {
    const { gigApplications, filters } = state;

    let filtered = [...gigApplications];

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter((app) => app.status === filters.status);
    }

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy as keyof GigApplication];
      const bValue = b[filters.sortBy as keyof GigApplication];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return filters.sortOrder === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      return 0;
    });

    return filtered;
  });
};

// Application statistics selectors
export const useMachineApplicationStats = () => {
  return useApplicationsStore((state) => {
    const { machineApplications } = state;

    const total = machineApplications.length;
    const pending = machineApplications.filter(
      (app) => app.status === 'pending'
    ).length;
    const approved = machineApplications.filter(
      (app) => app.status === 'approved'
    ).length;
    const rejected = machineApplications.filter(
      (app) => app.status === 'rejected'
    ).length;

    return { total, pending, approved, rejected };
  });
};

export const useGigApplicationStats = () => {
  return useApplicationsStore((state) => {
    const { gigApplications } = state;

    const total = gigApplications.length;
    const pending = gigApplications.filter(
      (app) => app.status === 'pending'
    ).length;
    const approved = gigApplications.filter(
      (app) => app.status === 'approved'
    ).length;
    const rejected = gigApplications.filter(
      (app) => app.status === 'rejected'
    ).length;

    return { total, pending, approved, rejected };
  });
};
