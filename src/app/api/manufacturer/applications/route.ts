import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { MachineApplication } from '@/models/Application';
import Machine from '@/models/Machine';
import Worker from '@/models/Worker';
import Startup from '@/models/Startup';
import {
  handleApiError,
  createSuccessResponse,
  AuthenticationError,
} from '@/middleware/errorHandler';
import { authenticateToken, extractTokenFromRequest } from '@/middleware/auth';
import {
  parseQueryParams,
  createPaginationInfo,
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
    const { page, limit, sort } = parseQueryParams(searchParams);
    const status = searchParams.get('status');
    const applicantType = searchParams.get('applicantType');

    // Get manufacturer's machines
    const manufacturerMachines = await Machine.find(
      { manufacturerId: authResult.user.id },
      '_id'
    );
    const machineIds = manufacturerMachines.map((machine) => machine._id);

    // Build query
    const query: any = { machineId: { $in: machineIds } };

    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      query.status = status;
    }

    if (applicantType && ['worker', 'startup'].includes(applicantType)) {
      query.applicantType = applicantType;
    }

    const sortQuery = buildSortQuery(sort);

    // Get total count
    const total = await MachineApplication.countDocuments(query);

    // Get applications with pagination and population
    const applications = await MachineApplication.find(query)
      .populate('machineId', 'name type description location')
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Populate applicant details based on type
    const populatedApplications = await Promise.all(
      applications.map(async (app: any) => {
        if (app.applicantType === 'worker') {
          const worker = await Worker.findById(
            app.applicantId,
            'name email skills location'
          ).lean();
          return { ...app, applicant: worker };
        } else if (app.applicantType === 'startup') {
          const startup = await Startup.findById(
            app.applicantId,
            'companyName companyEmail workSector location'
          ).lean();
          return { ...app, applicant: startup };
        }
        return app;
      })
    );

    const pagination = createPaginationInfo(page, limit, total);

    return createSuccessResponse({
      Applications: populatedApplications,
      pagination,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
