import { Types } from 'mongoose';

export interface IPatient {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  phone: string;
  doctorId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}