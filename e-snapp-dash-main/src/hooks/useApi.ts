import { useMutation, useQuery } from '@tanstack/react-query';
import { api, queryClient, removeAuthToken } from '../lib/api';

// Auth hooks
export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      api.auth.login(email, password),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => api.auth.register(name, email, password),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => {
      removeAuthToken();
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => api.auth.getProfile(),
    retry: false,
    enabled: !!localStorage.getItem('token'),
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (data: any) => api.auth.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: () => api.auth.deleteAccount(),
    onSuccess: () => {
      removeAuthToken();
      queryClient.clear();
    },
  });
};

// Bills hooks
export const useBills = () => {
  return useQuery({
    queryKey: ['bills'],
    queryFn: () => api.bills.getAll(),
  });
};

export const useCurrentBill = () => {
  return useQuery({
    queryKey: ['bills', 'current'],
    queryFn: () => api.bills.getCurrent(),
  });
};

export const useBillingHistory = () => {
  return useQuery({
    queryKey: ['bills', 'history'],
    queryFn: () => api.bills.getHistory(),
  });
};

export const useBill = (id: string) => {
  return useQuery({
    queryKey: ['bills', id],
    queryFn: () => api.bills.getById(id),
    enabled: !!id,
  });
};

export const useMarkBillAsPaid = () => {
  return useMutation({
    mutationFn: (id: string) => api.bills.markAsPaid(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bills'] });
    },
  });
};

// Tariffs hooks
export const useTariffs = () => {
  return useQuery({
    queryKey: ['tariffs'],
    queryFn: () => api.tariffs.getAll(),
  });
};

export const usePopularTariffs = () => {
  return useQuery({
    queryKey: ['tariffs', 'popular'],
    queryFn: () => api.tariffs.getPopular(),
  });
};

export const useTariffsWithSavings = () => {
  return useQuery({
    queryKey: ['tariffs', 'savings'],
    queryFn: () => api.tariffs.getWithSavings(),
  });
};

export const useTariff = (id: string) => {
  return useQuery({
    queryKey: ['tariffs', id],
    queryFn: () => api.tariffs.getById(id),
    enabled: !!id,
  });
};

// Energy consumption hooks
export const useEnergyConsumption = () => {
  return useQuery({
    queryKey: ['energy'],
    queryFn: () => api.energy.getAll(),
  });
};

export const useEnergyConsumptionByCategory = (category: string) => {
  return useQuery({
    queryKey: ['energy', 'category', category],
    queryFn: () => api.energy.getByCategory(category),
    enabled: !!category,
  });
};

export const useEnergyConsumptionByDateRange = (
  startDate: string,
  endDate: string
) => {
  return useQuery({
    queryKey: ['energy', 'range', startDate, endDate],
    queryFn: () => api.energy.getByDateRange(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });
};

export const useTotalEnergyConsumption = () => {
  return useQuery({
    queryKey: ['energy', 'total'],
    queryFn: () => api.energy.getTotal(),
  });
};