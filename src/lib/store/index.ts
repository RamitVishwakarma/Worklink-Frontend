// Store exports
export { useAuthStore } from './authStore';
export { useGigsStore, useGigStats } from './gigsStore';
export { useMachinesStore, useMachineStats } from './machinesStore';
export { useProfilesStore } from './profilesStore';
export {
  useApplicationsStore,
  useFilteredMachineApplications,
  useFilteredGigApplications,
  useMachineApplicationStats,
  useGigApplicationStats,
} from './applicationsStore';
export {
  useNotificationsStore,
  useNotificationsByCategory,
  useUnreadNotifications,
  useRecentNotifications,
  useNotifications,
  createSuccessNotification,
  createErrorNotification,
  createInfoNotification,
  createWarningNotification,
} from './notificationsStore';

// Type exports
export type { AuthState } from './authStore';
export type { GigsState } from './gigsStore';
export type { MachinesState } from './machinesStore';
export type { ProfilesState } from './profilesStore';
export type { ApplicationsState } from './applicationsStore';
export type { NotificationsState, Notification } from './notificationsStore';

// Store initialization helper
export const initializeStores = () => {
  // This function can be called in the app initialization
  // to set up any necessary store configurations or data fetching
  console.log('Stores initialized');
};
