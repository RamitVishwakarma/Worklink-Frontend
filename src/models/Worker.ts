import mongoose, { Document, Schema } from 'mongoose';

// Location interface and schema
export interface ILocation {
  city: string;
  state: string;
}

const LocationSchema = new Schema<ILocation>({
  city: { type: String, required: true },
  state: { type: String, required: true },
});

// Worker interface
export interface IWorker extends Document {
  name: string;
  email: string;
  password: string;
  skills: string[];
  location?: ILocation; // Make location optional
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Worker schema
const WorkerSchema = new Schema<IWorker>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    skills: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    location: {
      type: LocationSchema,
      required: false, // Make location optional
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

// Index for faster queries (email index is already created by unique: true)
WorkerSchema.index({ 'location.city': 1, 'location.state': 1 });
WorkerSchema.index({ skills: 1 });

export default mongoose.models.Worker ||
  mongoose.model<IWorker>('Worker', WorkerSchema);
