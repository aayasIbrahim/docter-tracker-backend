import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    condition: {
      type: String, // e.g., 'Stable', 'Critical', 'Under Observation
      required: [true, 'Patient condition is required'],
      index: true, 
    },
    phone: {
      type: String,
      trim: true,
    },
    // Doctor Relationship (One-to-Many)
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'Assigned Doctor is required'],
      index: true,
    },
  },
  {
    timestamps: true, 
  }
);

PatientSchema.index({ name: 'text' });

export default mongoose.models.Patient || mongoose.model('Patient', PatientSchema);