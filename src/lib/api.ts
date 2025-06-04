'use client';

import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'; // Default to local backend

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests
api.interceptors.request.use(
  (config) => {
    // Check if window is defined (i.e., we are on the client side)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

// Define common request functions

// Auth
export const signupUser = (userData: any) => api.post('/auth/signup', userData);
export const signinUser = (credentials: any) =>
  api.post('/auth/signin', credentials);
export const getCurrentUser = () => api.get('/auth/me'); // Example endpoint for fetching user

// Worker specific
export const getWorkerProfile = (workerId: string) =>
  api.get(`/workers/${workerId}/profile`);
export const updateWorkerProfile = (workerId: string, profileData: any) =>
  api.put(`/workers/${workerId}/profile`, profileData);
export const applyToGig = (
  gigId: string,
  workerId: string,
  applicationData: any
) => api.post(`/gigs/${gigId}/apply`, { workerId, ...applicationData });
export const getAppliedGigsForWorker = (workerId: string) =>
  api.get(`/workers/${workerId}/applications`);
export const applyToMachineByWorker = (
  machineId: string,
  workerId: string,
  applicationData: any
) =>
  api.post(`/machines/${machineId}/apply`, {
    applicantId: workerId,
    applicantType: 'worker',
    ...applicationData,
  });

// Startup specific
export const getStartupProfile = (startupId: string) =>
  api.get(`/startups/${startupId}/profile`);
export const updateStartupProfile = (startupId: string, profileData: any) =>
  api.put(`/startups/${startupId}/profile`, profileData);
export const createGig = (gigData: any) => api.post('/gigs', gigData);
export const getGigsByStartup = (startupId: string) =>
  api.get(`/startups/${startupId}/gigs`);
export const deleteGig = (gigId: string) => api.delete(`/gigs/${gigId}`);
export const applyToMachineByStartup = (
  machineId: string,
  startupId: string,
  applicationData: any
) =>
  api.post(`/machines/${machineId}/apply`, {
    applicantId: startupId,
    applicantType: 'startup',
    ...applicationData,
  });

// Manufacturer specific
export const getManufacturerProfile = (manufacturerId: string) =>
  api.get(`/manufacturers/${manufacturerId}/profile`);
export const updateManufacturerProfile = (
  manufacturerId: string,
  profileData: any
) => api.put(`/manufacturers/${manufacturerId}/profile`, profileData);
export const addMachine = (machineData: any) =>
  api.post('/machines', machineData);
export const getMachinesByManufacturer = (manufacturerId: string) =>
  api.get(`/manufacturers/${manufacturerId}/machines`);
export const deleteMachine = (machineId: string) =>
  api.delete(`/machines/${machineId}`);
export const toggleMachineAvailability = (
  machineId: string,
  availability: boolean
) => api.patch(`/machines/${machineId}/availability`, { availability });
export const getMachineApplications = (
  manufacturerId: string,
  machineId: string
) =>
  api.get(
    `/manufacturers/${manufacturerId}/machines/${machineId}/applications`
  );
export const approveOrRejectApplication = (
  applicationId: string,
  status: 'approved' | 'rejected'
) => api.patch(`/applications/${applicationId}/status`, { status });

// General/Public
export const getAllGigs = (params?: any) => api.get('/gigs', { params });
export const getGigDetails = (gigId: string) => api.get(`/gigs/${gigId}`);
export const getAllMachines = (params?: any) =>
  api.get('/machines', { params });
export const getMachineDetails = (machineId: string) =>
  api.get(`/machines/${machineId}`);
