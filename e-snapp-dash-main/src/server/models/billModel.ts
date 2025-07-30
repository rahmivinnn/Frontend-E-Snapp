import { PrismaClient } from '@prisma/client';
import { prisma } from '../index.ts';

export interface CreateBillInput {
  userId: string;
  amount: number;
  energyUsed: number;
  period: string;
  dueDate: Date;
  isPaid?: boolean;
  estimatedFinal?: number;
}

export interface UpdateBillInput {
  amount?: number;
  energyUsed?: number;
  period?: string;
  dueDate?: Date;
  isPaid?: boolean;
  estimatedFinal?: number;
}

type Bill = any;

export const billModel = {
  // Get all bills
  getAllBills: async () => {
    return prisma.bill.findMany();
  },

  // Get bill by ID
  getBillById: async (id: string) => {
    return prisma.bill.findUnique({
      where: { id },
    });
  },

  // Get bills by user ID
  getBillsByUserId: async (userId: string) => {
    return prisma.bill.findMany({
      where: { userId },
      orderBy: {
        dueDate: 'desc',
      },
    });
  },

  // Create a new bill
  createBill: async (data: CreateBillInput) => {
    return prisma.bill.create({
      data,
    });
  },

  // Update bill
  updateBill: async (id: string, data: UpdateBillInput) => {
    return prisma.bill.update({
      where: { id },
      data,
    });
  },

  // Delete bill
  deleteBill: async (id: string) => {
    return prisma.bill.delete({
      where: { id },
    });
  },

  // Mark bill as paid
  markBillAsPaid: async (id: string) => {
    return prisma.bill.update({
      where: { id },
      data: { isPaid: true },
    });
  },

  // Get billing history for a user
  getBillingHistory: async (userId: string) => {
    return prisma.bill.findMany({
      where: { userId },
      orderBy: {
        dueDate: 'desc',
      },
    });
  },

  // Get current bill for a user
  getCurrentBill: async (userId: string) => {
    return prisma.bill.findFirst({
      where: { userId },
      orderBy: {
        dueDate: 'desc',
      },
    });
  },
};