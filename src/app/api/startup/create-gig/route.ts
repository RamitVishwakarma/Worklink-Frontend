import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Gig from '@/models/Gig';
import {
  handleApiError,
  createSuccessResponse,
  AuthenticationError,
} from '@/middleware/errorHandler';
import { validateSchema, gigCreateSchema } from '@/middleware/validation';
import { authenticateToken, extractTokenFromRequest } from '@/middleware/auth';

export async function POST(request: NextRequest) {
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

    if (authResult.user?.type !== 'startup') {
      throw new AuthenticationError('Only startups can create gigs');
    }

    const body = await request.json();

    // Validate request body
    const validation = validateSchema(gigCreateSchema, body);
    if (!validation.success) {
      return createSuccessResponse(
        { error: 'Validation failed', details: validation.errors },
        undefined,
        400
      );
    }

    // Create new gig
    const gig = new Gig({
      ...validation.data,
      startupId: authResult.user.id,
    });

    await gig.save();

    return createSuccessResponse(
      {
        message: 'Gig created successfully',
        Gig: gig,
      },
      undefined,
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
