import React from 'react';
import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  category?: 'application' | 'gig' | 'machine' | 'profile' | 'system';
}

export interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  hasHydrated: boolean;

  // Settings (persisted)
  settings: {
    enablePushNotifications: boolean;
    enableEmailNotifications: boolean;
    notificationCategories: {
      application: boolean;
      gig: boolean;
      machine: boolean;
      profile: boolean;
      system: boolean;
    };
  };

  // Actions
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>
  ) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
  updateSettings: (settings: Partial<NotificationsState['settings']>) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

const defaultSettings = {
  enablePushNotifications: true,
  enableEmailNotifications: true,
  notificationCategories: {
    application: true,
    gig: true,
    machine: true,
    profile: true,
    system: true,
  },
};

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      // Initial state
      notifications: [],
      unreadCount: 0,
      hasHydrated: false,
      settings: defaultSettings,

      // Actions
      addNotification: (notificationData) => {
        const notification: Notification = {
          ...notificationData,
          id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
          read: false,
        };

        set((state) => {
          const newNotifications = [notification, ...state.notifications];
          return {
            notifications: newNotifications,
            unreadCount: newNotifications.filter((n) => !n.read).length,
          };
        });
      },

      markAsRead: (notificationId) => {
        set((state) => {
          const updatedNotifications = state.notifications.map(
            (notification) =>
              notification.id === notificationId
                ? { ...notification, read: true }
                : notification
          );

          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter((n) => !n.read).length,
          };
        });
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            read: true,
          })),
          unreadCount: 0,
        }));
      },

      removeNotification: (notificationId) => {
        set((state) => {
          const filteredNotifications = state.notifications.filter(
            (notification) => notification.id !== notificationId
          );

          return {
            notifications: filteredNotifications,
            unreadCount: filteredNotifications.filter((n) => !n.read).length,
          };
        });
      },

      clearAllNotifications: () => {
        set({
          notifications: [],
          unreadCount: 0,
        });
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated });
      },
    }),
    {
      name: 'notifications-store',
      partialize: (state) => ({
        notifications: state.notifications,
        settings: state.settings,
      }), // Add storage configuration to handle SSR better
      storage: {
        getItem: (name: string) => {
          if (typeof window === 'undefined') return null;
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name: string, value: any) => {
          if (typeof window === 'undefined') return;
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          if (typeof window === 'undefined') return;
          localStorage.removeItem(name);
        },
      },
    }
  )
);

// Selectors for filtered notifications
export const useNotificationsByCategory = (
  category?: Notification['category']
) => {
  return useNotificationsStore((state) => {
    if (!category) return state.notifications;
    return state.notifications.filter(
      (notification) => notification.category === category
    );
  });
};

// Hydration-safe version of useUnreadNotifications
export const useUnreadNotifications = () => {
  const [isClient, setIsClient] = React.useState(false);
  const notifications = useNotificationsStore((state) => state.notifications);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Return empty array during SSR/hydration to prevent mismatches
  if (!isClient) {
    return [];
  }

  return notifications.filter((notification) => !notification.read);
};

export const useRecentNotifications = (limit: number = 5) => {
  return useNotificationsStore((state) =>
    state.notifications
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit)
  );
};

// Notification helper functions
export const createSuccessNotification = (
  title: string,
  message: string,
  category?: Notification['category']
): Omit<Notification, 'id' | 'timestamp' | 'read'> => ({
  type: 'success',
  title,
  message,
  category,
});

export const createErrorNotification = (
  title: string,
  message: string,
  category?: Notification['category']
): Omit<Notification, 'id' | 'timestamp' | 'read'> => ({
  type: 'error',
  title,
  message,
  category,
});

export const createInfoNotification = (
  title: string,
  message: string,
  category?: Notification['category'],
  actionUrl?: string,
  actionLabel?: string
): Omit<Notification, 'id' | 'timestamp' | 'read'> => ({
  type: 'info',
  title,
  message,
  category,
  actionUrl,
  actionLabel,
});

export const createWarningNotification = (
  title: string,
  message: string,
  category?: Notification['category']
): Omit<Notification, 'id' | 'timestamp' | 'read'> => ({
  type: 'warning',
  title,
  message,
  category,
});

// Hook for easy notification creation
export const useNotifications = () => {
  const addNotification = useNotificationsStore(
    (state) => state.addNotification
  );

  return {
    addNotification,
    addSuccess: (
      title: string,
      message: string,
      category?: Notification['category']
    ) => addNotification(createSuccessNotification(title, message, category)),
    addError: (
      title: string,
      message: string,
      category?: Notification['category']
    ) => addNotification(createErrorNotification(title, message, category)),
    addInfo: (
      title: string,
      message: string,
      category?: Notification['category'],
      actionUrl?: string,
      actionLabel?: string
    ) =>
      addNotification(
        createInfoNotification(title, message, category, actionUrl, actionLabel)
      ),
    addWarning: (
      title: string,
      message: string,
      category?: Notification['category']
    ) => addNotification(createWarningNotification(title, message, category)),
  };
};
