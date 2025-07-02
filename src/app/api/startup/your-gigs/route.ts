import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Gig from '@/models/Gig';
import {
  handleApiError,
  createSuccessResponse,
  AuthenticationError,
} from '@/middleware/errorHandler';
import { authenticateToken, extractTokenFromRequest } from '@/middleware/auth';
import {
  parseQueryParams,
  createPaginationInfo,
  buildSearchQuery,
  buildSortQuery,
} from '@/utils/helpers';

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

    if (authResult.user?.type !== 'startup') {
      throw new AuthenticationError('Invalid user type');
    }

    const { searchParams } = new URL(request.url);
    const { page, limit, search, sort } = parseQueryParams(searchParams);

    // Build query
    const query: any = { startupId: authResult.user.id };

    if (search) {
      const searchQuery = buildSearchQuery(search, [
        'title',
        'description',
        'skillsRequired',
      ]);
      Object.assign(query, searchQuery);
    }

    const sortQuery = buildSortQuery(sort);

    // Get total count
    const total = await Gig.countDocuments(query);

    // Get gigs with pagination
    const gigs = await Gig.find(query)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const pagination = createPaginationInfo(page, limit, total);

    return createSuccessResponse({
      Gigs: gigs,
      pagination,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
