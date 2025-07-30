import express from 'express';
import { billModel } from '../models/billModel.ts';
import { protect } from '../utils/authMiddleware.ts';
import { catchAsync, AppError } from '../utils/errorHandler.ts';

const router = express.Router();

// Protect all routes in this router
router.use(protect);

// Get all bills for current user
router.get(
  '/',
  catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const bills = await billModel.getBillsByUserId(userId);

    res.status(200).json({
      status: 'success',
      results: bills.length,
      data: {
        bills,
      },
    });
  })
);

// Get current bill
router.get(
  '/current',
  catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const bill = await billModel.getCurrentBill(userId);

    if (!bill) {
      return next(new AppError('No current bill found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        bill,
      },
    });
  })
);

// Get billing history
router.get(
  '/history',
  catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const bills = await billModel.getBillingHistory(userId);

    res.status(200).json({
      status: 'success',
      results: bills.length,
      data: {
        bills,
      },
    });
  })
);

// Get bill by ID
router.get(
  '/:id',
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const bill = await billModel.getBillById(id);

    if (!bill) {
      return next(new AppError('No bill found with that ID', 404));
    }

    // Check if bill belongs to current user
    if (bill.userId !== req.user.id) {
      return next(new AppError('You do not have permission to access this bill', 403));
    }

    res.status(200).json({
      status: 'success',
      data: {
        bill,
      },
    });
  })
);

// Create a new bill
router.post(
  '/',
  catchAsync(async (req, res, next) => {
    // Set userId to current user
    req.body.userId = req.user.id;

    const bill = await billModel.createBill(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        bill,
      },
    });
  })
);

// Update bill
router.patch(
  '/:id',
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    
    // Check if bill exists and belongs to current user
    const existingBill = await billModel.getBillById(id);
    if (!existingBill) {
      return next(new AppError('No bill found with that ID', 404));
    }

    if (existingBill.userId !== req.user.id) {
      return next(new AppError('You do not have permission to update this bill', 403));
    }

    const bill = await billModel.updateBill(id, req.body);

    res.status(200).json({
      status: 'success',
      data: {
        bill,
      },
    });
  })
);

// Mark bill as paid
router.patch(
  '/:id/pay',
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    
    // Check if bill exists and belongs to current user
    const existingBill = await billModel.getBillById(id);
    if (!existingBill) {
      return next(new AppError('No bill found with that ID', 404));
    }

    if (existingBill.userId !== req.user.id) {
      return next(new AppError('You do not have permission to update this bill', 403));
    }

    const bill = await billModel.markBillAsPaid(id);

    res.status(200).json({
      status: 'success',
      data: {
        bill,
      },
    });
  })
);

// Delete bill
router.delete(
  '/:id',
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    
    // Check if bill exists and belongs to current user
    const existingBill = await billModel.getBillById(id);
    if (!existingBill) {
      return next(new AppError('No bill found with that ID', 404));
    }

    if (existingBill.userId !== req.user.id) {
      return next(new AppError('You do not have permission to delete this bill', 403));
    }

    await billModel.deleteBill(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  })
);

export default router;