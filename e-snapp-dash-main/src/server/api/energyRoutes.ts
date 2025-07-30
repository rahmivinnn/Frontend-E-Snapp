import express from 'express';
import { energyModel } from '../models/energyModel.ts';
import { protect } from '../utils/authMiddleware.ts';
import { catchAsync, AppError } from '../utils/errorHandler.ts';

const router = express.Router();

// Protect all routes in this router
router.use(protect);

// Get all energy consumption records for current user
router.get(
  '/',
  catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const records = await energyModel.getRecordsByUserId(userId);

    res.status(200).json({
      status: 'success',
      results: records.length,
      data: {
        records,
      },
    });
  })
);

// Get energy consumption by category
router.get(
  '/category/:category',
  catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { category } = req.params;
    const records = await energyModel.getRecordsByCategory(userId, category);

    res.status(200).json({
      status: 'success',
      results: records.length,
      data: {
        records,
      },
    });
  })
);

// Get energy consumption by date range
router.get(
  '/date-range',
  catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return next(new AppError('Please provide start and end dates', 400));
    }

    const records = await energyModel.getRecordsByDateRange(
      userId,
      new Date(startDate as string),
      new Date(endDate as string)
    );

    res.status(200).json({
      status: 'success',
      results: records.length,
      data: {
        records,
      },
    });
  })
);

// Get total energy consumption
router.get(
  '/total',
  catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const total = await energyModel.getTotalConsumption(userId);

    res.status(200).json({
      status: 'success',
      data: {
        total,
      },
    });
  })
);

// Get energy consumption record by ID
router.get(
  '/:id',
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const record = await energyModel.getRecordById(id);

    if (!record) {
      return next(new AppError('No record found with that ID', 404));
    }

    // Check if record belongs to current user
    if (record.userId !== req.user.id) {
      return next(new AppError('You do not have permission to access this record', 403));
    }

    res.status(200).json({
      status: 'success',
      data: {
        record,
      },
    });
  })
);

// Create a new energy consumption record
router.post(
  '/',
  catchAsync(async (req, res, next) => {
    // Set userId to current user
    req.body.userId = req.user.id;

    const record = await energyModel.createRecord(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        record,
      },
    });
  })
);

// Update energy consumption record
router.patch(
  '/:id',
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    
    // Check if record exists and belongs to current user
    const existingRecord = await energyModel.getRecordById(id);
    if (!existingRecord) {
      return next(new AppError('No record found with that ID', 404));
    }

    if (existingRecord.userId !== req.user.id) {
      return next(new AppError('You do not have permission to update this record', 403));
    }

    const record = await energyModel.updateRecord(id, req.body);

    res.status(200).json({
      status: 'success',
      data: {
        record,
      },
    });
  })
);

// Delete energy consumption record
router.delete(
  '/:id',
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    
    // Check if record exists and belongs to current user
    const existingRecord = await energyModel.getRecordById(id);
    if (!existingRecord) {
      return next(new AppError('No record found with that ID', 404));
    }

    if (existingRecord.userId !== req.user.id) {
      return next(new AppError('You do not have permission to delete this record', 403));
    }

    await energyModel.deleteRecord(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  })
);

export default router;