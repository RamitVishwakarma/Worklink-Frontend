import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { publicAPI, startupAPI, workerAPI } from '../api';
import type { Gig, GigApplication } from '../types';

export interface GigsState {
  // Data
  gigs: Gig[];
  userGigs: Gig[]; // For startups - gigs they created
  appliedGigs: GigApplication[]; // For workers - gigs they applied to
  currentGig: Gig | null;

  // Loading states
  isLoading: boolean;
  isCreating: boolean;
  isApplying: boolean;
  isDeleting: boolean;

  // Filters and search
  searchTerm: string;
  locationFilter: string;
  jobTypeFilter: string;

  // Actions
  fetchGigs: (params?: any) => Promise<void>;
  fetchUserGigs: (startupId: string) => Promise<void>;
  fetchAppliedGigs: (workerId: string) => Promise<void>;
  createGig: (gigData: any) => Promise<void>;
  deleteGig: (gigId: string) => Promise<void>;
  applyToGig: (
    gigId: string,
    workerId: string,
    applicationData?: any
  ) => Promise<void>;

  // Utility actions
  setSearchTerm: (term: string) => void;
  setLocationFilter: (location: string) => void;
  setJobTypeFilter: (jobType: string) => void;
  clearFilters: () => void;
  reset: () => void;
}

const initialState = {
  gigs: [],
  userGigs: [],
  appliedGigs: [],
  currentGig: null,
  isLoading: false,
  isCreating: false,
  isApplying: false,
  isDeleting: false,
  searchTerm: '',
  locationFilter: '',
  jobTypeFilter: '',
};

export const useGigsStore = create<GigsState>()(
  persist(
    (set, get) => ({
      ...initialState,

      fetchGigs: async (params) => {
        set({ isLoading: true });
        try {
          const gigs = await publicAPI.getAllGigs(params);
          set({ gigs, isLoading: false });
        } catch (error) {
          console.error('Failed to fetch gigs:', error);
          set({ isLoading: false });
        }
      },

      fetchUserGigs: async (startupId: string) => {
        set({ isLoading: true });
        try {
          const userGigs = await startupAPI.getGigs(startupId);
          set({ userGigs, isLoading: false });
        } catch (error) {
          console.error('Failed to fetch user gigs:', error);
          set({ isLoading: false });
        }
      },

      fetchAppliedGigs: async (workerId: string) => {
        set({ isLoading: true });
        try {
          const appliedGigs = await workerAPI.getAppliedGigs(workerId);
          set({ appliedGigs, isLoading: false });
        } catch (error) {
          console.error('Failed to fetch applied gigs:', error);
          set({ isLoading: false });
        }
      },

      createGig: async (gigData: any) => {
        set({ isCreating: true });
        try {
          const newGig = await startupAPI.createGig(gigData);
          const { userGigs } = get();
          set({
            userGigs: [newGig, ...userGigs],
            isCreating: false,
          });
        } catch (error) {
          console.error('Failed to create gig:', error);
          set({ isCreating: false });
          throw error; // Re-throw to allow component to handle
        }
      },

      deleteGig: async (gigId: string) => {
        set({ isDeleting: true });
        try {
          await startupAPI.deleteGig(gigId);
          const { userGigs, gigs } = get();
          set({
            userGigs: userGigs.filter((gig) => gig._id !== gigId),
            gigs: gigs.filter((gig) => gig._id !== gigId),
            isDeleting: false,
          });
        } catch (error) {
          console.error('Failed to delete gig:', error);
          set({ isDeleting: false });
          throw error;
        }
      },

      applyToGig: async (
        gigId: string,
        workerId: string,
        applicationData = {}
      ) => {
        set({ isApplying: true });
        try {
          const application = await workerAPI.applyToGig(
            gigId,
            workerId,
            applicationData
          );
          const { appliedGigs } = get();
          set({
            appliedGigs: [application, ...appliedGigs],
            isApplying: false,
          });
        } catch (error) {
          console.error('Failed to apply to gig:', error);
          set({ isApplying: false });
          throw error;
        }
      },

      setSearchTerm: (term: string) => set({ searchTerm: term }),
      setLocationFilter: (location: string) =>
        set({ locationFilter: location }),
      setJobTypeFilter: (jobType: string) => set({ jobTypeFilter: jobType }),

      clearFilters: () =>
        set({
          searchTerm: '',
          locationFilter: '',
          jobTypeFilter: '',
        }),
      reset: () => set(initialState),
    }),
    {
      name: 'gigs-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist filters and search term, not the actual data
        searchTerm: state.searchTerm,
        locationFilter: state.locationFilter,
        jobTypeFilter: state.jobTypeFilter,
      }),
    }
  )
);

// Derived hook for gig statistics
export const useGigStats = () => {
  const { gigs, userGigs } = useGigsStore();

  return {
    total: userGigs.length || gigs.length,
    active:
      userGigs.filter((gig) => gig.status === 'active').length ||
      gigs.filter((gig) => gig.status === 'active').length,
  };
};
