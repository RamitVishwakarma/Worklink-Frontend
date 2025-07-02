import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Manufacturer from '@/models/Manufacturer';
import {
  handleApiError,
  createSuccessResponse,
  AuthenticationError,
  NotFoundError,
} from '@/middleware/errorHandler';
import {
  validateSchema,
  manufacturerUpdateSchema,
} from '@/middleware/validation';
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

    if (authResult.user?.type !== 'manufacturer') {
      throw new AuthenticationError('Invalid user type');
    }

    // Find manufacturer
    const manufacturer = await Manufacturer.findById(authResult.user.id);
    if (!manufacturer) {
      throw new NotFoundError('Manufacturer not found');
    }

    const sanitizedManufacturer = sanitizeUser(manufacturer, 'manufacturer');

    return createSuccessResponse({
      Manufacturer: sanitizedManufacturer,
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

    if (authResult.user?.type !== 'manufacturer') {
      throw new AuthenticationError('Invalid user type');
    }

    const body = await request.json();

    // Validate request body
    const validation = validateSchema(manufacturerUpdateSchema, body);
    if (!validation.success) {
      return createSuccessResponse(
        { error: 'Validation failed', details: validation.errors },
        undefined,
        400
      );
    }

    // Update manufacturer
    const manufacturer = await Manufacturer.findByIdAndUpdate(
      authResult.user.id,
      validation.data,
      { new: true, runValidators: true }
    );

    if (!manufacturer) {
      throw new NotFoundError('Manufacturer not found');
    }

    const sanitizedManufacturer = sanitizeUser(manufacturer, 'manufacturer');

    return createSuccessResponse({
      message: 'Profile updated successfully',
      Manufacturer: sanitizedManufacturer,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
