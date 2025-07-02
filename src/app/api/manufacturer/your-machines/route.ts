import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Machine from '@/models/Machine';
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

    if (authResult.user?.type !== 'manufacturer') {
      throw new AuthenticationError('Invalid user type');
    }

    const { searchParams } = new URL(request.url);
    const { page, limit, search, sort } = parseQueryParams(searchParams);

    // Build query
    const query: any = { manufacturerId: authResult.user.id };

    if (search) {
      const searchQuery = buildSearchQuery(search, [
        'name',
        'type',
        'description',
      ]);
      Object.assign(query, searchQuery);
    }

    const sortQuery = buildSortQuery(sort);

    // Get total count
    const total = await Machine.countDocuments(query);

    // Get machines with pagination
    const machines = await Machine.find(query)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const pagination = createPaginationInfo(page, limit, total);

    return createSuccessResponse({
      Machines: machines,
      pagination,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
