import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Import routes
import userRoutes from '../src/server/api/userRoutes';
import billRoutes from '../src/server/api/billRoutes';
import tariffRoutes from '../src/server/api/tariffRoutes';
import energyRoutes from '../src/server/api/energyRoutes';

// Load environment variables
dotenv.config();

// Initialize Prisma client
export const prisma = new PrismaClient();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/tariffs', tariffRoutes);
app.use('/api/energy', energyRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Export the Express API
export default app;