import express from 'express';
import userRoutes from './userRoutes';
import billRoutes from './billRoutes';
import tariffRoutes from './tariffRoutes';
import energyRoutes from './energyRoutes';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
  });
});

// Mount routes
router.use('/users', userRoutes);
router.use('/bills', billRoutes);
router.use('/tariffs', tariffRoutes);
router.use('/energy', energyRoutes);

export default router;