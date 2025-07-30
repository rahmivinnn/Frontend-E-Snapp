import { PrismaClient } from '@prisma/client';
import { prisma } from '../index.ts';

export interface CreateUserInput {
  email: string;
  name?: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
}

export interface CreateProfileInput {
  address?: string;
  phone?: string;
  contract?: string;
}

export interface UpdateProfileInput {
  address?: string;
  phone?: string;
  contract?: string;
}

type User = any;
type Profile = any;

export const userModel = {
  // Get all users
  getAllUsers: async () => {
    return prisma.user.findMany({
      include: {
        profile: true,
      },
    });
  },

  // Get user by ID
  getUserById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
      },
    });
  },

  // Get user by email
  getUserByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });
  },

  // Create a new user
  createUser: async (data: CreateUserInput) => {
    return prisma.user.create({
      data,
    });
  },

  // Update user
  updateUser: async (id: string, data: UpdateUserInput) => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  // Delete user
  deleteUser: async (id: string) => {
    return prisma.user.delete({
      where: { id },
    });
  },

  // Create user profile
  createProfile: async (userId: string, data: CreateProfileInput) => {
    return prisma.profile.create({
      data: {
        ...data,
        userId,
      },
    });
  },

  // Update user profile
  updateProfile: async (userId: string, data: UpdateProfileInput) => {
    return prisma.profile.upsert({
      where: { userId },
      update: data,
      create: {
        ...data,
        userId,
      },
    });
  },
};