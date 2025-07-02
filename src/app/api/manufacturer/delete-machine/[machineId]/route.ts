import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Machine from '@/models/Machine';
import { MachineApplication } from '@/models/Application';
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

    if (authResult.user?.type !== 'manufacturer') {
      throw new AuthenticationError('Only manufacturers can delete machines');
    }

    const { machineId } = await context.params;

    // Find the machine
    const machine = await Machine.findById(machineId);
    if (!machine) {
      throw new NotFoundError('Machine not found');
    }

    // Verify ownership
    if (machine.manufacturerId.toString() !== authResult.user.id) {
      throw new AuthorizationError('You can only delete your own machines');
    }

    // Delete associated applications first
    await MachineApplication.deleteMany({ machineId });

    // Delete the machine
    await Machine.findByIdAndDelete(machineId);

    return createSuccessResponse({
      message: 'Machine deleted successfully',
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
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

    if (authResult.user?.type !== 'manufacturer') {
      throw new AuthenticationError('Only manufacturers can update machines');
    }

    const { machineId } = await context.params;
    const body = await request.json();

    // Find the machine
    const machine = await Machine.findById(machineId);
    if (!machine) {
      throw new NotFoundError('Machine not found');
    }

    // Verify ownership
    if (machine.manufacturerId.toString() !== authResult.user.id) {
      throw new AuthorizationError('You can only update your own machines');
    }

    // Toggle availability
    const updatedMachine = await Machine.findByIdAndUpdate(
      machineId,
      { available: body.available },
      { new: true, runValidators: true }
    );

    return createSuccessResponse({
      message: 'Machine availability updated successfully',
      Machine: updatedMachine,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
