import * as mongoose from "mongoose";
import { IDoctor, IDoctorQuery } from "./doctor.interface";
import Doctor from "./doctor.model";
import { doctorController } from "./doctor.controller";

const createDoctorIntoDB = async (payload: IDoctor) => {
  const { name, specialization, hospital, phone, email } = payload;
  const isDoctorExist = await Doctor.findOne({
    $or: [{ email }, { phone }],
  } as any);

  if (isDoctorExist) {
    throw new Error("A doctor with this email or phone number already exists.");
  }
  const result = await Doctor.create(payload);
  return result;
};
const getAllDoctorFromDB = async (q: IDoctorQuery) => {
  const limit = q.limit ? Number(q.limit) : 5;
  const page = q.page ? Number(q.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = q.sortBy ? q.sortBy : "createdAt";
  const sortOrder = q.sortOrder === "asc" ? 1 : -1;

  const andConditions: Record<string, any>[] = [];
  if (q.searchTerm) {
    andConditions.push({
      $or: [
        { name: { $regex: q.searchTerm, $options: "i" } },
        { hospital: { $regex: q.searchTerm, $options: "i" } },
        { email: { $regex: q.searchTerm, $options: "i" } },
        { phone: { $regex: q.searchTerm, $options: "i" } },
      ],
    });
  }
  if (q.specialization) {
    andConditions.push({
      specialization: { $regex: q.specialization, $options: "i" },
    });
  }
  const whereConditions =
    andConditions.length > 0 ? ({ $and: andConditions } as any) : {};

  const doctors = await Doctor.find(whereConditions)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
  const totalDoctorsCount = await Doctor.countDocuments(whereConditions);
  return {
    data: doctors,
    meta: {
      page,
      limit,
      total: totalDoctorsCount,
      totalPages: Math.ceil(totalDoctorsCount / limit),
    },
  };
};
const getSingleDoctorFromDB = async (doctorId: string) => {
  const doctor = await Doctor.findOne({ _id: doctorId } as any);
  if (!doctor) {
    throw new Error("Doctor not found");
  }
  return doctor;
};
const updateDoctorIntoDB = async (doctorId: string, updateBody: any) => {
  const updatedDoctor = await Doctor.findOneAndUpdate(
    { _id: doctorId } as any, 
    updateBody,
    {
      new: true,
      runValidators: true,
    } as any
  );
  return updatedDoctor;
};
export const doctorService = {
  createDoctorIntoDB,
  getAllDoctorFromDB,
  getSingleDoctorFromDB,
  updateDoctorIntoDB,
};
