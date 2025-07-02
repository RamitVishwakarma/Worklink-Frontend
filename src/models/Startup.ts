import mongoose, { Document, Schema } from 'mongoose';
import { ILocation } from './Worker';

// Startup interface
export interface IStartup extends Document {
  companyName: string;
  companyEmail: string;
  password: string;
  workSector: string;
  location: ILocation;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Startup schema
const StartupSchema = new Schema<IStartup>(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    companyEmail: {
      type: String,
      required: [true, 'Company email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    workSector: {
      type: String,
      required: [true, 'Work sector is required'],
      trim: true,
    },
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    profilePicture: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries (companyEmail index is already created by unique: true)
StartupSchema.index({ 'location.city': 1, 'location.state': 1 });
StartupSchema.index({ workSector: 1 });

export default mongoose.models.Startup ||
  mongoose.model<IStartup>('Startup', StartupSchema);
