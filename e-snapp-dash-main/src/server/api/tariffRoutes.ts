import express from 'express';
import { tariffModel } from '../models/tariffModel.ts';
import { protect } from '../utils/authMiddleware.ts';
import { catchAsync, AppError } from '../utils/errorHandler.ts';

const router = express.Router();

// Protect all routes in this router
router.use(protect);

// Get all tariffs
router.get(
  '/',
  catchAsync(async (req, res, next) => {
    const tariffs = await tariffModel.getAllTariffs();

    res.status(200).json({
      status: 'success',
      results: tariffs.length,
      data: {
        tariffs,
      },
    });
  })
);

// Get popular tariffs
router.get(
  '/popular',
  catchAsync(async (req, res, next) => {
    const tariffs = await tariffModel.getPopularTariffs();

    res.status(200).json({
      status: 'success',
      results: tariffs.length,
      data: {
        tariffs,
      },
    });
  })
);

// Get tariffs with estimated savings for current user
router.get(
  '/savings',
  catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const tariffs = await tariffModel.getTariffsWithSavings(userId);

    res.status(200).json({
      status: 'success',
      results: tariffs.length,
      data: {
        tariffs,
      },
    });
  })
);

// Get tariff by ID
router.get(
  '/:id',
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const tariff = await tariffModel.getTariffById(id);

    if (!tariff) {
      return next(new AppError('No tariff found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        tariff,
      },
    });
  })
);

// Create a new tariff (admin only - in a real app would have admin middleware)
router.post(
  '/',
  catchAsync(async (req, res, next) => {
    const tariff = await tariffModel.createTariff(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tariff,
      },
    });
  })
);

// Update tariff (admin only)
router.patch(
  '/:id',
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    
    // Check if tariff exists
    const existingTariff = await tariffModel.getTariffById(id);
    if (!existingTariff) {
      return next(new AppError('No tariff found with that ID', 404));
    }

    const tariff = await tariffModel.updateTariff(id, req.body);

    res.status(200).json({
      status: 'success',
      data: {
        tariff,
      },
    });
  })
);

// Delete tariff (admin only)
router.delete(
  '/:id',
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    
    // Check if tariff exists
    const existingTariff = await tariffModel.getTariffById(id);
    if (!existingTariff) {
      return next(new AppError('No tariff found with that ID', 404));
    }

    await tariffModel.deleteTariff(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  })
);

export default router;