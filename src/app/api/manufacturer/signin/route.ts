import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Manufacturer from '@/models/Manufacturer';
import {
  handleApiError,
  createSuccessResponse,
  AuthenticationError,
} from '@/middleware/errorHandler';
import {
  validateSchema,
  manufacturerSigninSchema,
} from '@/middleware/validation';
import { comparePassword, sanitizeUser } from '@/utils/helpers';
import { generateToken } from '@/middleware/auth';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate request body
    const validation = validateSchema(manufacturerSigninSchema, body);
    if (!validation.success) {
      return createSuccessResponse(
        { error: 'Validation failed', details: validation.errors },
        undefined,
        400
      );
    }

    const { companyEmail, password } = validation.data;

    // Find manufacturer by email
    const manufacturer = await Manufacturer.findOne({ companyEmail });
    if (!manufacturer) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await comparePassword(
      password,
      manufacturer.password
    );
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Generate JWT token
    const token = generateToken({
      id: manufacturer._id.toString(),
      type: 'manufacturer',
      email: manufacturer.companyEmail,
    });

    // Return success response
    const sanitizedManufacturer = sanitizeUser(manufacturer, 'manufacturer');

    return createSuccessResponse(
      {
        token: `Bearer ${token}`,
        message: 'Manufacturer SignIn successful',
        user: { ...sanitizedManufacturer, userType: 'manufacturer' }, // Add userType field
      },
      undefined,
      200
    );
  } catch (error) {
    return handleApiError(error);
  }
}
