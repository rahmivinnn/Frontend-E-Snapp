import { PrismaClient } from '@prisma/client';
import { prisma } from '../index.ts';

export interface CreateEnergyConsumptionInput {
  userId: string;
  date: Date;
  amount: number;
  category: string;
}

export interface UpdateEnergyConsumptionInput {
  date?: Date;
  amount?: number;
  category?: string;
}

type EnergyConsumption = any;

export const energyModel = {
  // Get all energy consumption records
  getAllEnergyConsumption: async () => {
    return prisma.energyConsumption.findMany();
  },

  // Get energy consumption by ID
  getEnergyConsumptionById: async (id: string) => {
    return prisma.energyConsumption.findUnique({
      where: { id },
    });
  },

  // Get energy consumption by user ID
  getEnergyConsumptionByUserId: async (userId: string) => {
    return prisma.energyConsumption.findMany({
      where: { userId },
      orderBy: {
        date: 'desc',
      },
    });
  },

  // Create a new energy consumption record
  createEnergyConsumption: async (data: CreateEnergyConsumptionInput) => {
    return prisma.energyConsumption.create({
      data,
    });
  },

  // Update energy consumption
  updateEnergyConsumption: async (id: string, data: UpdateEnergyConsumptionInput) => {
    return prisma.energyConsumption.update({
      where: { id },
      data,
    });
  },

  // Delete energy consumption
  deleteEnergyConsumption: async (id: string) => {
    return prisma.energyConsumption.delete({
      where: { id },
    });
  },

  // Get energy consumption by category
  getEnergyConsumptionByCategory: async (userId: string, category: string) => {
    return prisma.energyConsumption.findMany({
      where: { 
        userId,
        category 
      },
      orderBy: {
        date: 'desc',
      },
    });
  },

  // Get energy consumption by date range
  getEnergyConsumptionByDateRange: async (
    userId: string,
    startDate: Date,
    endDate: Date
  ) => {
    return prisma.energyConsumption.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  },

  // Get total energy consumption by user
  getTotalEnergyConsumption: async (userId: string): Promise<number> => {
    const result = await prisma.energyConsumption.aggregate({
      where: { userId },
      _sum: {
        amount: true,
      },
    });
    return result._sum.amount || 0;
  },
};