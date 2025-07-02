import mongoose, { Document, Schema } from 'mongoose';

// Application interface for gig applications
export interface IGigApplication extends Document {
  gigId: mongoose.Types.ObjectId;
  workerId: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: Date;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Application interface for machine applications
export interface IMachineApplication extends Document {
  machineId: mongoose.Types.ObjectId;
  applicantId: mongoose.Types.ObjectId;
  applicantType: 'worker' | 'startup';
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: Date;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Gig Application schema
const GigApplicationSchema = new Schema<IGigApplication>(
  {
    gigId: {
      type: Schema.Types.ObjectId,
      ref: 'Gig',
      required: [true, 'Gig ID is required'],
    },
    workerId: {
      type: Schema.Types.ObjectId,
      ref: 'Worker',
      required: [true, 'Worker ID is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    message: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Machine Application schema
const MachineApplicationSchema = new Schema<IMachineApplication>(
  {
    machineId: {
      type: Schema.Types.ObjectId,
      ref: 'Machine',
      required: [true, 'Machine ID is required'],
    },
    applicantId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Applicant ID is required'],
    },
    applicantType: {
      type: String,
      enum: ['worker', 'startup'],
      required: [true, 'Applicant type is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    message: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
GigApplicationSchema.index({ gigId: 1, workerId: 1 }, { unique: true });
GigApplicationSchema.index({ workerId: 1 });
GigApplicationSchema.index({ status: 1 });
GigApplicationSchema.index({ appliedAt: -1 });

MachineApplicationSchema.index(
  { machineId: 1, applicantId: 1, applicantType: 1 },
  { unique: true }
);
MachineApplicationSchema.index({ applicantId: 1, applicantType: 1 });
MachineApplicationSchema.index({ machineId: 1 });
MachineApplicationSchema.index({ status: 1 });
MachineApplicationSchema.index({ appliedAt: -1 });

export const GigApplication =
  mongoose.models.GigApplication ||
  mongoose.model<IGigApplication>('GigApplication', GigApplicationSchema);
export const MachineApplication =
  mongoose.models.MachineApplication ||
  mongoose.model<IMachineApplication>(
    'MachineApplication',
    MachineApplicationSchema
  );
