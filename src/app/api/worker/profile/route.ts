import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Worker from '@/models/Worker';
import {
  handleApiError,
  createSuccessResponse,
  AuthenticationError,
  NotFoundError,
} from '@/middleware/errorHandler';
import { validateSchema, workerUpdateSchema } from '@/middleware/validation';
import { authenticateToken, extractTokenFromRequest } from '@/middleware/auth';
import { sanitizeUser } from '@/utils/helpers';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Authenticate user
    const token = extractTokenFromRequest(request);
    if (!token) {
      throw new AuthenticationError('No token provided');
    }

    const authResult = authenticateToken(token);
    if (!authResult.success) {
      throw new AuthenticationError(authResult.error);
    }

    if (authResult.user?.type !== 'worker') {
      throw new AuthenticationError('Invalid user type');
    }

    // Find worker
    const worker = await Worker.findById(authResult.user.id);
    if (!worker) {
      throw new NotFoundError('Worker not found');
    }

    const sanitizedWorker = sanitizeUser(worker, 'worker');

    return createSuccessResponse({
      Worker: sanitizedWorker,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    // Authenticate user
    const token = extractTokenFromRequest(request);
    if (!token) {
      throw new AuthenticationError('No token provided');
    }

    const authResult = authenticateToken(token);
    if (!authResult.success) {
      throw new AuthenticationError(authResult.error);
    }

    if (authResult.user?.type !== 'worker') {
      throw new AuthenticationError('Invalid user type');
    }

    const body = await request.json();

    // Validate request body
    const validation = validateSchema(workerUpdateSchema, body);
    if (!validation.success) {
      return createSuccessResponse(
        { error: 'Validation failed', details: validation.errors },
        undefined,
        400
      );
    }

    // Update worker
    const worker = await Worker.findByIdAndUpdate(
      authResult.user.id,
      validation.data,
      { new: true, runValidators: true }
    );

    if (!worker) {
      throw new NotFoundError('Worker not found');
    }

    const sanitizedWorker = sanitizeUser(worker, 'worker');

    return createSuccessResponse({
      message: 'Profile updated successfully',
      Worker: sanitizedWorker,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
