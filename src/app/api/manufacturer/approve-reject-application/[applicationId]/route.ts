import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { MachineApplication } from '@/models/Application';
import Machine from '@/models/Machine';
import {
  handleApiError,
  createSuccessResponse,
  AuthenticationError,
  NotFoundError,
  AuthorizationError,
} from '@/middleware/errorHandler';
import {
  validateSchema,
  applicationUpdateSchema,
} from '@/middleware/validation';
import { authenticateToken, extractTokenFromRequest } from '@/middleware/auth';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ applicationId: string }> }
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

    if (authResult.user?.type !== 'manufacturer') {
      throw new AuthenticationError(
        'Only manufacturers can approve/reject applications'
      );
    }

    const { applicationId } = await context.params;
    const body = await request.json();

    // Validate request body
    const validation = validateSchema(applicationUpdateSchema, body);
    if (!validation.success) {
      return createSuccessResponse(
        { error: 'Validation failed', details: validation.errors },
        undefined,
        400
      );
    }

    // Find the application
    const application =
      await MachineApplication.findById(applicationId).populate('machineId');
    if (!application) {
      throw new NotFoundError('Application not found');
    }

    // Verify that the manufacturer owns the machine
    const machine = application.machineId as any;
    if (machine.manufacturerId.toString() !== authResult.user.id) {
      throw new AuthorizationError(
        'You can only manage applications for your own machines'
      );
    }

    // Update application status
    const updatedApplication = await MachineApplication.findByIdAndUpdate(
      applicationId,
      { status: validation.data.status },
      { new: true, runValidators: true }
    ).populate('machineId', 'name type description location');

    return createSuccessResponse({
      message: `Application ${validation.data.status} successfully`,
      Application: updatedApplication,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
