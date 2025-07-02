import { useEffect, useCallback } from 'react';
import { useAuthStore } from '../lib/store/authStore';
import {
  useGigsStore,
  useMachinesStore,
  useProfilesStore,
  useApplicationsStore,
  useNotifications,
} from '../lib/store';

// Hook for automatic data fetching based on user role
export const useAutoFetch = () => {
  const { user, isAuthenticated } = useAuthStore();
  const fetchGigs = useGigsStore((state) => state.fetchGigs);
  const fetchMachines = useMachinesStore((state) => state.fetchMachines);
  const fetchCurrentUserProfile = useProfilesStore(
    (state) => state.fetchCurrentUserProfile
  );

  const fetchUserData = useCallback(async () => {
    if (!isAuthenticated || !user) return;

    try {
      // Always fetch user profile
      await fetchCurrentUserProfile(user.userType); // Fetch role-specific data
      switch (user.userType) {
        case 'worker':
          await Promise.all([fetchGigs(), fetchMachines()]);
          break;

        case 'startup':
          await Promise.all([fetchGigs(), fetchMachines()]);
          break;

        case 'manufacturer':
          await Promise.all([fetchMachines()]);
          break;
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }, [
    isAuthenticated,
    user,
    fetchCurrentUserProfile,
    fetchGigs,
    fetchMachines,
  ]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return { refetch: fetchUserData };
};

// Hook for managing loading states across multiple stores
export const useGlobalLoading = () => {
  const gigsLoading = useGigsStore((state) => state.isLoading);
  const machinesLoading = useMachinesStore((state) => state.isLoading);
  const profileLoading = useProfilesStore((state) => state.isLoading);
  const machineApplicationsLoading = useApplicationsStore(
    (state: any) => state.machineApplicationsLoading
  );
  const gigApplicationsLoading = useApplicationsStore(
    (state: any) => state.gigApplicationsLoading
  );

  const isLoading =
    gigsLoading ||
    machinesLoading ||
    profileLoading ||
    machineApplicationsLoading ||
    gigApplicationsLoading;

  return { isLoading };
};

// Note: Error handling is managed through toast notifications in individual operations
// and loading states in stores. Global error aggregation removed as stores don't
// implement unified error state patterns.

// Hook for gig-related operations
export const useGigOperations = () => {
  const { user } = useAuthStore();
  const deleteGig = useGigsStore((state) => state.deleteGig);
  const applyToGig = useApplicationsStore((state: any) => state.applyToGig);
  const { addSuccess, addError } = useNotifications();
  const handleDeleteGig = useCallback(
    async (gigId: string) => {
      try {
        await deleteGig(gigId);
        addSuccess('Gig Deleted', 'Your gig has been removed successfully');
        return true;
      } catch (error) {
        console.error('Failed to delete gig:', error);
        return false;
      }
    },
    [deleteGig, addSuccess]
  );
  const handleApplyToGig = useCallback(
    async (gigId: string, message?: string) => {
      if (user?.userType !== 'worker') {
        addError('Permission Denied', 'Only workers can apply to gigs');
        return false;
      }

      const success = await applyToGig(gigId, message);
      if (success) {
        addSuccess(
          'Application Sent',
          'Your application has been submitted successfully'
        );
      }
      return success;
    },
    [user, applyToGig, addSuccess, addError]
  );

  return {
    handleDeleteGig,
    handleApplyToGig,
  };
};

// Hook for application management operations
export const useApplicationOperations = () => {
  const { user } = useAuthStore();
  const updateApplicationStatus = useApplicationsStore(
    (state: any) => state.updateApplicationStatus
  );
  const { addSuccess, addError } = useNotifications();

  const handleApproveApplication = useCallback(
    async (
      applicationId: string,
      type: 'machine' | 'gig',
      applicantName?: string
    ) => {
      if (!['manufacturer', 'startup'].includes(user?.userType || '')) {
        addError('Permission Denied', 'You cannot approve applications');
        return false;
      }

      const success = await updateApplicationStatus(
        applicationId,
        'approved',
        type
      );
      if (success) {
        const message = applicantName
          ? `${applicantName}'s application has been approved`
          : 'Application has been approved';
        addSuccess('Application Approved', message);
      }
      return success;
    },
    [user, updateApplicationStatus, addSuccess, addError]
  );

  const handleRejectApplication = useCallback(
    async (
      applicationId: string,
      type: 'machine' | 'gig',
      applicantName?: string
    ) => {
      if (!['manufacturer', 'startup'].includes(user?.userType || '')) {
        addError('Permission Denied', 'You cannot reject applications');
        return false;
      }

      const success = await updateApplicationStatus(
        applicationId,
        'rejected',
        type
      );
      if (success) {
        const message = applicantName
          ? `${applicantName}'s application has been rejected`
          : 'Application has been rejected';
        addSuccess('Application Rejected', message);
      }
      return success;
    },
    [user, updateApplicationStatus, addSuccess, addError]
  );

  return {
    handleApproveApplication,
    handleRejectApplication,
  };
};
