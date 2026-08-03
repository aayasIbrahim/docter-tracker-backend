import { Types } from "mongoose";

export interface IPatient {
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  condition: string;
  phone: string;
  doctorId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPatientQuery {
  searchTerm?: string;
  gender?: "Male" | "Female" | "Other";
  condition?: string;
  doctorId?: string;
  startDate?: string; 
  endDate?: string;   
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}