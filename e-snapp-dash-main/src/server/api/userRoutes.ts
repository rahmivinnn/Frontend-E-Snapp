import express from 'express';
import { userModel } from '../models/userModel.ts';
import { hashPassword, comparePassword, generateToken } from '../utils/auth.ts';
import { protect } from '../utils/authMiddleware.ts';
import { catchAsync, AppError } from '../utils/errorHandler.ts';

const router = express.Router();

// Register a new user
router.post(
  '/register',
  catchAsync(async (req, res, next) => {
    const { email, name, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return next(new AppError('User already exists with this email', 400));
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await userModel.createUser({
      email,
      name,
      password: hashedPassword,
    });

    // Create profile if provided
    if (req.body.profile) {
      await userModel.createProfile(user.id, req.body.profile);
    }

    // Generate token
    const token = generateToken(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: userWithoutPassword,
      },
    });
  })
);

// Login user
router.post(
  '/login',
  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // Check if user exists and password is correct
    const user = await userModel.getUserByEmail(email);
    if (!user || !(await comparePassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // Generate token
    const token = generateToken(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: userWithoutPassword,
      },
    });
  })
);

// Get current user
router.get(
  '/me',
  protect,
  catchAsync(async (req, res, next) => {
    // User is already available in req.user from protect middleware
    const user = req.user;

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutPassword,
      },
    });
  })
);

// Update user profile
router.patch(
  '/profile',
  protect,
  catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { name, email } = req.body;

    // Update user
    const updatedUser = await userModel.updateUser(userId, {
      name,
      email,
    });

    // Update profile if provided
    if (req.body.profile) {
      await userModel.updateProfile(userId, req.body.profile);
    }

    // Get updated user with profile
    const user = await userModel.getUserById(userId);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user!;

    res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutPassword,
      },
    });
  })
);

// Delete user account
router.delete(
  '/me',
  protect,
  catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    // Delete user
    await userModel.deleteUser(userId);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  })
);

export default router;