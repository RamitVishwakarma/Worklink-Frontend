import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Gig from '@/models/Gig';
import { GigApplication } from '@/models/Application';
import {
  handleApiError,
  createSuccessResponse,
  AuthenticationError,
  NotFoundError,
  AuthorizationError,
} from '@/middleware/errorHandler';
import { authenticateToken, extractTokenFromRequest } from '@/middleware/auth';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ gigId: string }> }
) {
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
      throw new AuthenticationError('Only startups can delete gigs');
    }

    const { gigId } = await context.params;

    // Find the gig
    const gig = await Gig.findById(gigId);
    if (!gig) {
      throw new NotFoundError('Gig not found');
    }

    // Verify ownership
    if (gig.startupId.toString() !== authResult.user.id) {
      throw new AuthorizationError('You can only delete your own gigs');
    }

    // Delete associated applications first
    await GigApplication.deleteMany({ gigId });

    // Delete the gig
    await Gig.findByIdAndDelete(gigId);

    return createSuccessResponse({
      message: 'Gig deleted successfully',
    });
  } catch (error) {
    return handleApiError(error);
  }
}
