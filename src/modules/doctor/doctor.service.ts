import { IDoctor, IDoctorQuery } from "./doctor.interface";
import Doctor from "./doctor.model";
import Patient from "../patient/patient.model";
import { IPatient } from "../patient/patient.interface";
import { isValidDate } from "../../utils/getValidDate";
// import patientModel from "../patient/patient.model";

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
   const hasValidStart = isValidDate(q.startDate);
    const hasValidEnd = isValidDate(q.endDate);
  
    if (hasValidStart || hasValidEnd) {
      const dateQuery: Record<string, any> = {};
  
      if (hasValidStart) {
        const startDate = new Date(q.startDate!);
        startDate.setHours(0, 0, 0, 0);
        dateQuery.$gte = startDate;
      }
  
      if (hasValidEnd) {
        const endDate = new Date(q.endDate!);
        endDate.setHours(23, 59, 59, 999);
        dateQuery.$lte = endDate;
      }
  
      andConditions.push({ createdAt: dateQuery });
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
//service Layer of Doctor-Patient Nested Routes
const addPatientUnderDoctor = async (
  doctorId: string,
  payload: Omit<IPatient, "doctorId">,
) => {
  const isDoctorExist = await Doctor.findOne({ _id: doctorId } as any);

  if (!isDoctorExist) {
    throw new Error("Doctor not found with the provided ID!");
  }
  const newPatient = await Patient.create({
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

  const patients = await Patient
    .find({ doctorId: doctorId } as any)
   
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
//soft delete remove Patient
const removePatientFromDoctorInDB = async (
  doctorId: string,
  patientId: string,
) => {
  const isDoctorExist = await Doctor.findOne({ _id: doctorId } as any);
  if (!isDoctorExist) {
    throw new Error("Doctor not found!");
  }

  const unassignedPatient = await Patient.findOneAndUpdate(
    { _id: patientId, doctorId: doctorId } as any,
    { $unset: { doctorId: 1 } }, // doctorId set to null
    // { new: true , lean: true},
     { returnDocument: 'after',lean: true }
  );

  if (!unassignedPatient) {
    throw new Error("Patient not found under this specific doctor!");
  }

  return unassignedPatient;
};
export const doctorService = {
  createDoctorIntoDB,
  getAllDoctorFromDB,
  getSingleDoctorFromDB,
  updateDoctorIntoDB,
  deleteDoctorIntoDB,
  getDoctorPatientsIntoDB,
  addPatientUnderDoctor,
  removePatientFromDoctorInDB,
};
