import { PrismaClient } from '@prisma/client';
import { prisma } from '../index.ts';

export interface CreateTariffInput {
  name: string;
  description?: string;
  annualCost: number;
  estimatedSaving?: number;
  fixedPeriod?: number;
  isPopular?: boolean;
}

export interface UpdateTariffInput {
  name?: string;
  description?: string;
  annualCost?: number;
  estimatedSaving?: number;
  fixedPeriod?: number;
  isPopular?: boolean;
}

type Tariff = any;

export const tariffModel = {
  // Get all tariffs
  getAllTariffs: async () => {
    return prisma.tariff.findMany();
  },

  // Get tariff by ID
  getTariffById: async (id: string) => {
    return prisma.tariff.findUnique({
      where: { id },
    });
  },

  // Get popular tariffs
  getPopularTariffs: async () => {
    return prisma.tariff.findMany({
      where: { isPopular: true },
    });
  },

  // Create a new tariff
  createTariff: async (data: CreateTariffInput) => {
    return prisma.tariff.create({
      data,
    });
  },

  // Update tariff
  updateTariff: async (id: string, data: UpdateTariffInput) => {
    return prisma.tariff.update({
      where: { id },
      data,
    });
  },

  // Delete tariff
  deleteTariff: async (id: string) => {
    return prisma.tariff.delete({
      where: { id },
    });
  },

  // Get tariffs with savings
  getTariffsWithSavings: async () => {
    return prisma.tariff.findMany({
      where: {
        estimatedSaving: {
          gt: 0,
        },
      },
      orderBy: {
        estimatedSaving: 'desc',
      },
    });
  },
};