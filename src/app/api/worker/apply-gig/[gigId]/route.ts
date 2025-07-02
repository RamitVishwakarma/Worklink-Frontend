import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { GigApplication } from '@/models/Application';
import Gig from '@/models/Gig';
import {
  handleApiError,
  createSuccessResponse,
  AuthenticationError,
  ConflictError,
  NotFoundError,
} from '@/middleware/errorHandler';
import {
  validateSchema,
  applicationCreateSchema,
} from '@/middleware/validation';
import { authenticateToken, extractTokenFromRequest } from '@/middleware/auth';
import {
  parseQueryParams,
  createPaginationInfo,
  buildSortQuery,
} from '@/utils/helpers';

export async function POST(
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

    if (authResult.user?.type !== 'worker') {
      throw new AuthenticationError('Only workers can apply to gigs');
    }

    const { gigId } = await context.params;
    const body = await request.json();

    // Validate request body
    const validation = validateSchema(applicationCreateSchema, body);
    if (!validation.success) {
      return createSuccessResponse(
        { error: 'Validation failed', details: validation.errors },
        undefined,
        400
      );
    }

    // Check if gig exists
    const gig = await Gig.findById(gigId);
    if (!gig) {
      throw new NotFoundError('Gig not found');
    }

    // Check if worker has already applied
    const existingApplication = await GigApplication.findOne({
      gigId,
      workerId: authResult.user.id,
    });

    if (existingApplication) {
      throw new ConflictError('You have already applied to this gig');
    }

    // Create application
    const application = new GigApplication({
      gigId,
      workerId: authResult.user.id,
      message: validation.data.message,
    });

    await application.save();

    return createSuccessResponse(
      {
        message: 'Application submitted successfully',
        Application: application,
      },
      undefined,
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}

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

    const { searchParams } = new URL(request.url);
    const { page, limit, sort } = parseQueryParams(searchParams);

    // Build query
    const query = { workerId: authResult.user.id };
    const sortQuery = buildSortQuery(sort);

    // Get total count
    const total = await GigApplication.countDocuments(query);

    // Get applications with pagination
    const applications = await GigApplication.find(query)
      .populate('gigId', 'title description salary location duration startupId')
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const pagination = createPaginationInfo(page, limit, total);

    return createSuccessResponse({
      Applications: applications,
      pagination,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
