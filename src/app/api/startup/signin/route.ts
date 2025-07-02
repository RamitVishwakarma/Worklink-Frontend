import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Startup from '@/models/Startup';
import {
  handleApiError,
  createSuccessResponse,
  AuthenticationError,
} from '@/middleware/errorHandler';
import { validateSchema, startupSigninSchema } from '@/middleware/validation';
import { comparePassword, sanitizeUser } from '@/utils/helpers';
import { generateToken } from '@/middleware/auth';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate request body
    const validation = validateSchema(startupSigninSchema, body);
    if (!validation.success) {
      return createSuccessResponse(
        { error: 'Validation failed', details: validation.errors },
        undefined,
        400
      );
    }

    const { companyEmail, password } = validation.data;

    // Find startup by email
    const startup = await Startup.findOne({ companyEmail });
    if (!startup) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, startup.password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Generate JWT token
    const token = generateToken({
      id: startup._id.toString(),
      type: 'startup',
      email: startup.companyEmail,
    });

    // Return success response
    const sanitizedStartup = sanitizeUser(startup, 'startup');

    return createSuccessResponse(
      {
        token: `Bearer ${token}`,
        message: 'Startup SignIn successful',
        user: { ...sanitizedStartup, userType: 'startup' }, // Add userType field
      },
      undefined,
      200
    );
  } catch (error) {
    return handleApiError(error);
  }
}
