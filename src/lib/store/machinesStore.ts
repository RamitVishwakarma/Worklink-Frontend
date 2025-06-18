import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { publicAPI, manufacturerAPI, workerAPI, startupAPI } from '../api';
import type { Machine, MachineApplication } from '../types';

export interface MachinesState {
  // Data
  machines: Machine[];
  userMachines: Machine[]; // For manufacturers - machines they own
  applications: MachineApplication[]; // Applications for machines
  currentMachine: Machine | null;

  // Loading states
  isLoading: boolean;
  isCreating: boolean;
  isApplying: boolean;
  isDeleting: boolean;
  isUpdating: boolean;

  // Filters and search
  searchTerm: string;
  locationFilter: string;
  typeFilter: string;
  availabilityFilter: string;

  // Actions
  fetchMachines: (params?: any) => Promise<void>;
  fetchUserMachines: (manufacturerId: string) => Promise<void>;
  fetchApplications: (
    manufacturerId: string,
    machineId: string
  ) => Promise<void>;
  addMachine: (machineData: any) => Promise<void>;
  deleteMachine: (machineId: string) => Promise<void>;
  toggleMachineAvailability: (
    machineId: string,
    availability: boolean
  ) => Promise<void>;
  applyToMachine: (
    machineId: string,
    applicantId: string,
    applicantType: 'worker' | 'startup',
    applicationData?: any
  ) => Promise<void>;
  updateApplicationStatus: (
    applicationId: string,
    status: 'approved' | 'rejected'
  ) => Promise<void>;

  // Utility actions
  setSearchTerm: (term: string) => void;
  setLocationFilter: (location: string) => void;
  setTypeFilter: (type: string) => void;
  setAvailabilityFilter: (availability: string) => void;
  clearFilters: () => void;
  reset: () => void;
}

const initialState = {
  machines: [],
  userMachines: [],
  applications: [],
  currentMachine: null,
  isLoading: false,
  isCreating: false,
  isApplying: false,
  isDeleting: false,
  isUpdating: false,
  searchTerm: '',
  locationFilter: '',
  typeFilter: '',
  availabilityFilter: '',
};

export const useMachinesStore = create<MachinesState>()(
  persist(
    (set, get) => ({
      ...initialState,

      fetchMachines: async (params) => {
        set({ isLoading: true });
        try {
          const machines = await publicAPI.getAllMachines(params);
          set({ machines, isLoading: false });
        } catch (error) {
          console.error('Failed to fetch machines:', error);
          set({ isLoading: false });
        }
      },

      fetchUserMachines: async (manufacturerId: string) => {
        set({ isLoading: true });
        try {
          const userMachines =
            await manufacturerAPI.getMachines(manufacturerId);
          set({ userMachines, isLoading: false });
        } catch (error) {
          console.error('Failed to fetch user machines:', error);
          set({ isLoading: false });
        }
      },

      fetchApplications: async (manufacturerId: string, machineId: string) => {
        set({ isLoading: true });
        try {
          const applications = await manufacturerAPI.getMachineApplications(
            manufacturerId,
            machineId
          );
          set({ applications, isLoading: false });
        } catch (error) {
          console.error('Failed to fetch applications:', error);
          set({ isLoading: false });
        }
      },

      addMachine: async (machineData: any) => {
        set({ isCreating: true });
        try {
          const newMachine = await manufacturerAPI.addMachine(machineData);
          const { userMachines } = get();
          set({
            userMachines: [newMachine, ...userMachines],
            isCreating: false,
          });
        } catch (error) {
          console.error('Failed to add machine:', error);
          set({ isCreating: false });
          throw error;
        }
      },

      deleteMachine: async (machineId: string) => {
        set({ isDeleting: true });
        try {
          await manufacturerAPI.deleteMachine(machineId);
          const { userMachines, machines } = get();
          set({
            userMachines: userMachines.filter(
              (machine) => machine._id !== machineId
            ),
            machines: machines.filter((machine) => machine._id !== machineId),
            isDeleting: false,
          });
        } catch (error) {
          console.error('Failed to delete machine:', error);
          set({ isDeleting: false });
          throw error;
        }
      },

      toggleMachineAvailability: async (
        machineId: string,
        availability: boolean
      ) => {
        set({ isUpdating: true });
        try {
          const updatedMachine =
            await manufacturerAPI.toggleMachineAvailability(
              machineId,
              availability
            );
          const { userMachines, machines } = get();

          const updateMachine = (machine: Machine) =>
            machine._id === machineId
              ? { ...machine, availability, isAvailable: availability }
              : machine;

          set({
            userMachines: userMachines.map(updateMachine),
            machines: machines.map(updateMachine),
            isUpdating: false,
          });
        } catch (error) {
          console.error('Failed to toggle machine availability:', error);
          set({ isUpdating: false });
          throw error;
        }
      },

      applyToMachine: async (
        machineId: string,
        applicantId: string,
        applicantType: 'worker' | 'startup',
        applicationData = {}
      ) => {
        set({ isApplying: true });
        try {
          let application: MachineApplication;

          if (applicantType === 'worker') {
            application = await workerAPI.applyToMachine(
              machineId,
              applicantId,
              applicationData
            );
          } else {
            application = await startupAPI.applyToMachine(
              machineId,
              applicantId,
              applicationData
            );
          }

          // Update local state to show machine as applied
          const { machines } = get();
          const updatedMachines = machines.map((machine) =>
            machine._id === machineId
              ? { ...machine, hasApplied: true }
              : machine
          );

          set({
            machines: updatedMachines,
            isApplying: false,
          });
        } catch (error) {
          console.error('Failed to apply to machine:', error);
          set({ isApplying: false });
          throw error;
        }
      },

      updateApplicationStatus: async (
        applicationId: string,
        status: 'approved' | 'rejected'
      ) => {
        set({ isUpdating: true });
        try {
          const updatedApplication =
            await manufacturerAPI.updateApplicationStatus(
              applicationId,
              status
            );
          const { applications } = get();
          set({
            applications: applications.map((app) =>
              app._id === applicationId ? { ...app, status } : app
            ),
            isUpdating: false,
          });
        } catch (error) {
          console.error('Failed to update application status:', error);
          set({ isUpdating: false });
          throw error;
        }
      },

      setSearchTerm: (term: string) => set({ searchTerm: term }),
      setLocationFilter: (location: string) =>
        set({ locationFilter: location }),
      setTypeFilter: (type: string) => set({ typeFilter: type }),
      setAvailabilityFilter: (availability: string) =>
        set({ availabilityFilter: availability }),

      clearFilters: () =>
        set({
          searchTerm: '',
          locationFilter: '',
          typeFilter: '',
          availabilityFilter: '',
        }),

      reset: () => set(initialState),
    }),
    {
      name: 'machines-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist filters and search term, not the actual data
        searchTerm: state.searchTerm,
        locationFilter: state.locationFilter,
        typeFilter: state.typeFilter,
        availabilityFilter: state.availabilityFilter,
      }),
    }
  )
);

// Stats hook for machines
export const useMachineStats = () => {
  const { userMachines, applications } = useMachinesStore();

  return {
    total: userMachines.length,
    active: userMachines.filter((machine) => machine.availability).length,
    inactive: userMachines.filter((machine) => !machine.availability).length,
    totalApplications: applications.length,
    pendingApplications: applications.filter((app) => app.status === 'pending')
      .length,
    approvedApplications: applications.filter(
      (app) => app.status === 'approved'
    ).length,
    rejectedApplications: applications.filter(
      (app) => app.status === 'rejected'
    ).length,
  };
};
