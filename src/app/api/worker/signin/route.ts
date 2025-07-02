import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Worker from '@/models/Worker';
import {
  handleApiError,
  createSuccessResponse,
  AuthenticationError,
} from '@/middleware/errorHandler';
import { validateSchema, workerSigninSchema } from '@/middleware/validation';
import { comparePassword, sanitizeUser } from '@/utils/helpers';
import { generateToken } from '@/middleware/auth';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate request body
    const validation = validateSchema(workerSigninSchema, body);
    if (!validation.success) {
      return createSuccessResponse(
        { error: 'Validation failed', details: validation.errors },
        undefined,
        400
      );
    }

    const { email, password } = validation.data;

    // Find worker by email
    const worker = await Worker.findOne({ email });
    if (!worker) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, worker.password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Generate JWT token
    const token = generateToken({
      id: worker._id.toString(),
      type: 'worker',
      email: worker.email,
    });

    // Return success response
    const sanitizedWorker = sanitizeUser(worker, 'worker');

    return createSuccessResponse(
      {
        token: `Bearer ${token}`,
        message: 'Worker SignIn successful',
        user: { ...sanitizedWorker, userType: 'worker' }, // Add userType field
      },
      undefined,
      200
    );
  } catch (error) {
    return handleApiError(error);
  }
}
