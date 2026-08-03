import * as mongoose from "mongoose";
import { IDoctor, IDoctorQuery } from "./doctor.interface";
import Doctor from "./doctor.model";
import { doctorController } from "./doctor.controller";
import { IPatient } from "../patient/patient.interface";
import patientModel from "../patient/patient.model";

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
  //date filter
  if (q.startDate && q.endDate) {
    andConditions.push({
      createdAt: {
        $gte: new Date(q.startDate), // From Start Date
        $lte: new Date(q.endDate), // To End Date
      },
    });
  } else if (q.startDate) {
    andConditions.push({
      createdAt: { $gte: new Date(q.startDate) },
    });
  } else if (q.endDate) {
    andConditions.push({
      createdAt: { $lte: new Date(q.endDate) },
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
const updateDoctorIntoDB = async (
  doctorId: string,
  payload: Partial<IDoctor>,
) => {
  const isDoctorExist = await Doctor.findOne({ _id: doctorId } as any);

  if (!isDoctorExist) {
    throw new Error(" Doctor Not found! ");
  }
  const updatedDoctor = await Doctor.findOneAndUpdate(
    { _id: doctorId } as any,
    { $set: payload },
    {
      new: true,
      runValidators: true,
    } as any,
  );
  console.log({
    updatedDoctor,
  });
  return updatedDoctor;
};
const deleteDoctorIntoDB = async (doctorId: string) => {
  const isDoctorExist = await Doctor.findOne({ _id: doctorId } as any);

  if (!isDoctorExist) {
    throw new Error(" Doctor Not found! ");
  }
  const deleteDoctor = await Doctor.findOneAndDelete({ _id: doctorId } as any);
  return deleteDoctor;
};

const addPatientUnderDoctor = async (
  doctorId: string,
  payload: Omit<IPatient, "doctorId">,
) => {
  const isDoctorExist = await Doctor.findOne({ _id: doctorId } as any);

  if (!isDoctorExist) {
    throw new Error("Doctor not found with the provided ID!");
  }
  const newPatient = await patientModel.create({
    ...payload,
    doctorId: doctorId,
  });
  if (!newPatient) {
    throw new Error("Failed to create and assign patient under the doctor.");
  }
  const populatedPatient = await newPatient.populate({
    path: "doctorId",
    select: "name specialization hospital email ",
  });

  return populatedPatient;
};

const getDoctorPatientsIntoDB = async (doctorId: string) => {
  const isDoctorExist = await Doctor.findOne({ _id: doctorId } as any);
  if (!isDoctorExist) {
    throw new Error("Doctor not found with the provided ID!");
  }

  const patients = await patientModel
    .find({ doctorId: doctorId } as any)
    // .populate({
    //   path: "doctorId",
    //   select: "name specialization hospital email phone",
    // })
    .sort({ createdAt: -1 });

  return {
    doctor: {
      id: isDoctorExist._id,
      name: isDoctorExist.name,
      specialization: isDoctorExist.specialization,
      hospital: isDoctorExist.hospital,
    },
    totalPatients: patients.length,
    patients: patients,
  };
};
export const doctorService = {
  createDoctorIntoDB,
  getAllDoctorFromDB,
  getSingleDoctorFromDB,
  updateDoctorIntoDB,
  deleteDoctorIntoDB,
  getDoctorPatientsIntoDB,
  addPatientUnderDoctor,
};
