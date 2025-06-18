'use client';

import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from '@/hooks/use-toast';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// Create enhanced axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    // Check if window is defined (client side)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Log API requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
      );
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for centralized error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`
      );
    }
    return response;
  },
  (error: AxiosError) => {
    const { response, request, config } = error;

    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error(
        `❌ API Error: ${config?.method?.toUpperCase()} ${config?.url}`,
        error
      );
    }

    // Handle different types of errors
    if (response) {
      // Server responded with error status
      const status = response.status;
      const data = response.data as any;

      switch (status) {
        case 400:
          // Bad Request - show validation errors
          if (data?.message) {
            toast({
              title: 'Validation Error',
              description: data.message,
              variant: 'destructive',
            });
          }
          break;

        case 401:
          // Unauthorized - redirect to login
          toast({
            title: 'Authentication Required',
            description: 'Please log in to continue.',
            variant: 'destructive',
          });

          // Clear auth data and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/signin';
          }
          break;

        case 403:
          // Forbidden - insufficient permissions
          toast({
            title: 'Access Denied',
            description: 'You do not have permission to perform this action.',
            variant: 'destructive',
          });
          break;

        case 404:
          // Not Found
          toast({
            title: 'Not Found',
            description:
              data?.message || 'The requested resource was not found.',
            variant: 'destructive',
          });
          break;

        case 409:
          // Conflict (e.g., duplicate email)
          toast({
            title: 'Conflict',
            description: data?.message || 'A conflict occurred.',
            variant: 'destructive',
          });
          break;

        case 429:
          // Too Many Requests
          toast({
            title: 'Rate Limited',
            description: 'Too many requests. Please try again later.',
            variant: 'destructive',
          });
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          // Server errors
          toast({
            title: 'Server Error',
            description:
              'An unexpected error occurred. Please try again later.',
            variant: 'destructive',
          });
          break;

        default:
          // Generic error
          toast({
            title: 'Error',
            description: data?.message || 'An unexpected error occurred.',
            variant: 'destructive',
          });
      }
    } else if (request) {
      // Network error - no response received
      toast({
        title: 'Network Error',
        description:
          'Unable to connect to the server. Please check your internet connection.',
        variant: 'destructive',
      });
    } else {
      // Something else happened
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }

    return Promise.reject(error);
  }
);

// Enhanced API caller functions with success toasts and loading states
interface ApiCallOptions {
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
  skipGlobalErrorHandling?: boolean;
}

// Generic API callers with automatic error handling
export const apiGet = async <T = any>(
  url: string,
  options: ApiCallOptions = {}
): Promise<T> => {
  try {
    const response = await api.get<T>(url);

    if (options.showSuccessToast && options.successMessage) {
      toast({
        title: 'Success',
        description: options.successMessage,
      });
    }

    return response.data;
  } catch (error) {
    if (!options.skipGlobalErrorHandling) {
      // Global error handling is already done in the interceptor
    }
    throw error;
  }
};

export const apiPost = async <T = any, D = any>(
  url: string,
  data?: D,
  options: ApiCallOptions = {}
): Promise<T> => {
  try {
    const response = await api.post<T>(url, data);

    if (options.showSuccessToast && options.successMessage) {
      toast({
        title: 'Success',
        description: options.successMessage,
      });
    }

    return response.data;
  } catch (error) {
    if (!options.skipGlobalErrorHandling) {
      // Global error handling is already done in the interceptor
    }
    throw error;
  }
};

export const apiPut = async <T = any, D = any>(
  url: string,
  data?: D,
  options: ApiCallOptions = {}
): Promise<T> => {
  try {
    const response = await api.put<T>(url, data);

    if (options.showSuccessToast && options.successMessage) {
      toast({
        title: 'Success',
        description: options.successMessage,
      });
    }

    return response.data;
  } catch (error) {
    if (!options.skipGlobalErrorHandling) {
      // Global error handling is already done in the interceptor
    }
    throw error;
  }
};

export const apiPatch = async <T = any, D = any>(
  url: string,
  data?: D,
  options: ApiCallOptions = {}
): Promise<T> => {
  try {
    const response = await api.patch<T>(url, data);

    if (options.showSuccessToast && options.successMessage) {
      toast({
        title: 'Success',
        description: options.successMessage,
      });
    }

    return response.data;
  } catch (error) {
    if (!options.skipGlobalErrorHandling) {
      // Global error handling is already done in the interceptor
    }
    throw error;
  }
};

export const apiDelete = async <T = any>(
  url: string,
  options: ApiCallOptions = {}
): Promise<T> => {
  try {
    const response = await api.delete<T>(url);

    if (options.showSuccessToast && options.successMessage) {
      toast({
        title: 'Success',
        description: options.successMessage,
      });
    }

    return response.data;
  } catch (error) {
    if (!options.skipGlobalErrorHandling) {
      // Global error handling is already done in the interceptor
    }
    throw error;
  }
};

export default api;

// ==================================================
// ENHANCED API ENDPOINTS WITH TYPE SAFETY
// ==================================================

import type {
  User,
  AuthResponse,
  Gig,
  GigApplication,
  Machine,
  MachineApplication,
  WorkerProfile,
  StartupProfile,
  ManufacturerProfile,
} from './types';

// Auth endpoints
export const authAPI = {
  signup: (userData: any): Promise<AuthResponse> =>
    apiPost('/auth/signup', userData, {
      showSuccessToast: true,
      successMessage: 'Account created successfully!',
    }),

  signin: (credentials: any): Promise<AuthResponse> =>
    apiPost('/auth/signin', credentials, {
      showSuccessToast: true,
      successMessage: 'Welcome back!',
    }),

  getCurrentUser: (): Promise<{ user: User }> => apiGet('/auth/me'),

  refreshToken: (): Promise<AuthResponse> => apiPost('/auth/refresh'),

  logout: (): Promise<void> =>
    apiPost(
      '/auth/logout',
      {},
      {
        showSuccessToast: true,
        successMessage: 'Logged out successfully',
      }
    ),

  // Profile endpoints for current authenticated user
  getWorkerProfile: (): Promise<WorkerProfile> => apiGet('/profile/worker'),

  updateWorkerProfile: (
    profileData: Partial<WorkerProfile>
  ): Promise<WorkerProfile> =>
    apiPut('/profile/worker', profileData, {
      showSuccessToast: true,
      successMessage: 'Profile updated successfully!',
    }),

  getStartupProfile: (): Promise<StartupProfile> => apiGet('/profile/startup'),

  updateStartupProfile: (
    profileData: Partial<StartupProfile>
  ): Promise<StartupProfile> =>
    apiPut('/profile/startup', profileData, {
      showSuccessToast: true,
      successMessage: 'Profile updated successfully!',
    }),

  getManufacturerProfile: (): Promise<ManufacturerProfile> =>
    apiGet('/profile/manufacturer'),

  updateManufacturerProfile: (
    profileData: Partial<ManufacturerProfile>
  ): Promise<ManufacturerProfile> =>
    apiPut('/profile/manufacturer', profileData, {
      showSuccessToast: true,
      successMessage: 'Profile updated successfully!',
    }),
};

// Worker endpoints
export const workerAPI = {
  getProfile: (workerId: string): Promise<WorkerProfile> =>
    apiGet(`/workers/${workerId}/profile`),

  updateProfile: (
    workerId: string,
    profileData: Partial<WorkerProfile>
  ): Promise<WorkerProfile> =>
    apiPut(`/workers/${workerId}/profile`, profileData, {
      showSuccessToast: true,
      successMessage: 'Profile updated successfully!',
    }),

  getAppliedGigs: (workerId: string): Promise<GigApplication[]> =>
    apiGet(`/workers/${workerId}/applications`),

  applyToGig: (
    gigId: string,
    workerId: string,
    applicationData: any
  ): Promise<GigApplication> =>
    apiPost(
      `/gigs/${gigId}/apply`,
      { workerId, ...applicationData },
      {
        showSuccessToast: true,
        successMessage: 'Successfully applied for the gig!',
      }
    ),

  applyToMachine: (
    machineId: string,
    workerId: string,
    applicationData: any
  ): Promise<MachineApplication> =>
    apiPost(
      `/machines/${machineId}/apply`,
      {
        applicantId: workerId,
        applicantType: 'worker',
        ...applicationData,
      },
      {
        showSuccessToast: true,
        successMessage: 'Successfully applied to use the machine!',
      }
    ),
};

// Startup endpoints
export const startupAPI = {
  getProfile: (startupId: string): Promise<StartupProfile> =>
    apiGet(`/startups/${startupId}/profile`),

  updateProfile: (
    startupId: string,
    profileData: Partial<StartupProfile>
  ): Promise<StartupProfile> =>
    apiPut(`/startups/${startupId}/profile`, profileData, {
      showSuccessToast: true,
      successMessage: 'Profile updated successfully!',
    }),

  createGig: (gigData: any): Promise<Gig> =>
    apiPost('/gigs', gigData, {
      showSuccessToast: true,
      successMessage: 'Gig posted successfully!',
    }),

  getGigs: (startupId: string): Promise<Gig[]> =>
    apiGet(`/startups/${startupId}/gigs`),

  deleteGig: (gigId: string): Promise<void> =>
    apiDelete(`/gigs/${gigId}`, {
      showSuccessToast: true,
      successMessage: 'Gig deleted successfully',
    }),

  applyToMachine: (
    machineId: string,
    startupId: string,
    applicationData: any
  ): Promise<MachineApplication> =>
    apiPost(
      `/machines/${machineId}/apply`,
      {
        applicantId: startupId,
        applicantType: 'startup',
        ...applicationData,
      },
      {
        showSuccessToast: true,
        successMessage: 'Successfully applied to use the machine!',
      }
    ),
};

// Manufacturer endpoints
export const manufacturerAPI = {
  getProfile: (manufacturerId: string): Promise<ManufacturerProfile> =>
    apiGet(`/manufacturers/${manufacturerId}/profile`),

  updateProfile: (
    manufacturerId: string,
    profileData: Partial<ManufacturerProfile>
  ): Promise<ManufacturerProfile> =>
    apiPut(`/manufacturers/${manufacturerId}/profile`, profileData, {
      showSuccessToast: true,
      successMessage: 'Profile updated successfully!',
    }),

  addMachine: (machineData: any): Promise<Machine> =>
    apiPost('/machines', machineData, {
      showSuccessToast: true,
      successMessage: 'Machine added successfully!',
    }),

  getMachines: (manufacturerId: string): Promise<Machine[]> =>
    apiGet(`/manufacturers/${manufacturerId}/machines`),

  deleteMachine: (machineId: string): Promise<void> =>
    apiDelete(`/machines/${machineId}`, {
      showSuccessToast: true,
      successMessage: 'Machine deleted successfully',
    }),

  toggleMachineAvailability: (
    machineId: string,
    availability: boolean
  ): Promise<Machine> =>
    apiPatch(
      `/machines/${machineId}/availability`,
      { availability },
      {
        showSuccessToast: true,
        successMessage: `Machine ${availability ? 'enabled' : 'disabled'} successfully`,
      }
    ),

  getMachineApplications: (
    manufacturerId: string,
    machineId: string
  ): Promise<MachineApplication[]> =>
    apiGet(
      `/manufacturers/${manufacturerId}/machines/${machineId}/applications`
    ),

  updateApplicationStatus: (
    applicationId: string,
    status: 'approved' | 'rejected'
  ): Promise<MachineApplication> =>
    apiPatch(
      `/applications/${applicationId}/status`,
      { status },
      {
        showSuccessToast: true,
        successMessage: `Application ${status} successfully`,
      }
    ),
};

// General/Public endpoints
export const publicAPI = {
  getAllGigs: (params?: any): Promise<Gig[]> => apiGet('/gigs', { ...params }),

  getGigDetails: (gigId: string): Promise<Gig> => apiGet(`/gigs/${gigId}`),

  getAllMachines: (params?: any): Promise<Machine[]> =>
    apiGet('/machines', { ...params }),

  getMachineDetails: (machineId: string): Promise<Machine> =>
    apiGet(`/machines/${machineId}`),
};

// ==================================================
// LEGACY API FUNCTIONS (for backward compatibility)
// ==================================================

// Auth
export const signupUser = (userData: any) => authAPI.signup(userData);
export const signinUser = (credentials: any) => authAPI.signin(credentials);
export const getCurrentUser = () => authAPI.getCurrentUser();

// Worker specific
export const getWorkerProfile = (workerId: string) =>
  workerAPI.getProfile(workerId);
export const updateWorkerProfile = (workerId: string, profileData: any) =>
  workerAPI.updateProfile(workerId, profileData);
export const applyToGig = (
  gigId: string,
  workerId: string,
  applicationData: any
) => workerAPI.applyToGig(gigId, workerId, applicationData);
export const getAppliedGigsForWorker = (workerId: string) =>
  workerAPI.getAppliedGigs(workerId);
export const applyToMachineByWorker = (
  machineId: string,
  workerId: string,
  applicationData: any
) => workerAPI.applyToMachine(machineId, workerId, applicationData);

// Startup specific
export const getStartupProfile = (startupId: string) =>
  startupAPI.getProfile(startupId);
export const updateStartupProfile = (startupId: string, profileData: any) =>
  startupAPI.updateProfile(startupId, profileData);
export const createGig = (gigData: any) => startupAPI.createGig(gigData);
export const getGigsByStartup = (startupId: string) =>
  startupAPI.getGigs(startupId);
export const deleteGig = (gigId: string) => startupAPI.deleteGig(gigId);
export const applyToMachineByStartup = (
  machineId: string,
  startupId: string,
  applicationData: any
) => startupAPI.applyToMachine(machineId, startupId, applicationData);

// Manufacturer specific
export const getManufacturerProfile = (manufacturerId: string) =>
  manufacturerAPI.getProfile(manufacturerId);
export const updateManufacturerProfile = (
  manufacturerId: string,
  profileData: any
) => manufacturerAPI.updateProfile(manufacturerId, profileData);
export const addMachine = (machineData: any) =>
  manufacturerAPI.addMachine(machineData);
export const getMachinesByManufacturer = (manufacturerId: string) =>
  manufacturerAPI.getMachines(manufacturerId);
export const deleteMachine = (machineId: string) =>
  manufacturerAPI.deleteMachine(machineId);
export const toggleMachineAvailability = (
  machineId: string,
  availability: boolean
) => manufacturerAPI.toggleMachineAvailability(machineId, availability);
export const getMachineApplications = (
  manufacturerId: string,
  machineId: string
) => manufacturerAPI.getMachineApplications(manufacturerId, machineId);
export const approveOrRejectApplication = (
  applicationId: string,
  status: 'approved' | 'rejected'
) => manufacturerAPI.updateApplicationStatus(applicationId, status);

// General/Public
export const getAllGigs = (params?: any) => publicAPI.getAllGigs(params);
export const getGigDetails = (gigId: string) => publicAPI.getGigDetails(gigId);
export const getAllMachines = (params?: any) =>
  publicAPI.getAllMachines(params);
export const getMachineDetails = (machineId: string) =>
  publicAPI.getMachineDetails(machineId);
