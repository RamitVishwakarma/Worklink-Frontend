import mongoose, { Document, Schema } from 'mongoose';
import { ILocation } from './Worker';

// Gig interface
export interface IGig extends Document {
  title: string;
  description: string;
  skillsRequired: string[];
  location: ILocation;
  salary: number;
  duration: string;
  startupId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Gig schema
const GigSchema = new Schema<IGig>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    skillsRequired: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    salary: {
      type: Number,
      required: [true, 'Salary is required'],
      min: [0, 'Salary must be positive'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
    },
    startupId: {
      type: Schema.Types.ObjectId,
      ref: 'Startup',
      required: [true, 'Startup ID is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
GigSchema.index({ startupId: 1 });
GigSchema.index({ skillsRequired: 1 });
GigSchema.index({ 'location.city': 1, 'location.state': 1 });
GigSchema.index({ salary: 1 });
GigSchema.index({ createdAt: -1 });

export default mongoose.models.Gig || mongoose.model<IGig>('Gig', GigSchema);
