import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { MachineApplication } from '@/models/Application';
import Machine from '@/models/Machine';
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

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ machineId: string }> }
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
      throw new AuthenticationError('Only workers can apply to machines');
    }

    const { machineId } = await context.params;
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

    // Check if machine exists and is available
    const machine = await Machine.findById(machineId);
    if (!machine) {
      throw new NotFoundError('Machine not found');
    }

    if (!machine.available) {
      throw new ConflictError('Machine is not available');
    }

    // Check if worker has already applied
    const existingApplication = await MachineApplication.findOne({
      machineId,
      applicantId: authResult.user.id,
      applicantType: 'worker',
    });

    if (existingApplication) {
      throw new ConflictError('You have already applied to this machine');
    }

    // Create application
    const application = new MachineApplication({
      machineId,
      applicantId: authResult.user.id,
      applicantType: 'worker',
      message: validation.data.message,
    });

    await application.save();

    return createSuccessResponse(
      {
        message: 'Machine application submitted successfully',
        Application: application,
      },
      undefined,
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
