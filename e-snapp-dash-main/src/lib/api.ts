import { QueryClient } from '@tanstack/react-query';

// Base API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Helper to handle API errors
const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API error: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
};

// Helper to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper to set auth token
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

// Helper to remove auth token
export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

// Helper to check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Base fetch function with auth header
const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return handleApiError(response);
};

// API functions
export const api = {
  // Auth
  auth: {
    login: (email: string, password: string) =>
      fetchWithAuth('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (name: string, email: string, password: string) =>
      fetchWithAuth('/users/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      }),
    getProfile: () => fetchWithAuth('/users/me'),
    updateProfile: (data: any) =>
      fetchWithAuth('/users/me', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    deleteAccount: () =>
      fetchWithAuth('/users/me', {
        method: 'DELETE',
      }),
  },

  // Bills
  bills: {
    getAll: () => fetchWithAuth('/bills'),
    getCurrent: () => fetchWithAuth('/bills/current'),
    getHistory: () => fetchWithAuth('/bills/history'),
    getById: (id: string) => fetchWithAuth(`/bills/${id}`),
    markAsPaid: (id: string) =>
      fetchWithAuth(`/bills/${id}/pay`, {
        method: 'PATCH',
      }),
  },

  // Tariffs
  tariffs: {
    getAll: () => fetchWithAuth('/tariffs'),
    getPopular: () => fetchWithAuth('/tariffs/popular'),
    getWithSavings: () => fetchWithAuth('/tariffs/savings'),
    getById: (id: string) => fetchWithAuth(`/tariffs/${id}`),
  },

  // Energy Consumption
  energy: {
    getAll: () => fetchWithAuth('/energy'),
    getByCategory: (category: string) =>
      fetchWithAuth(`/energy/category/${category}`),
    getByDateRange: (startDate: string, endDate: string) =>
      fetchWithAuth(`/energy/range?start=${startDate}&end=${endDate}`),
    getTotal: () => fetchWithAuth('/energy/total'),
  },
};