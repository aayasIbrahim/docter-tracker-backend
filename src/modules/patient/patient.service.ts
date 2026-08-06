import { isValidDate } from "../../utils/getValidDate";
import { IPatient, IPatientQuery } from "./patient.interface";
import Patient from "./patient.model";

const getAllPatientsFromDB = async (q: IPatientQuery) => {
  const limit = q.limit ? Number(q.limit) : 5;
  const page = q.page ? Number(q.page) : 1;
  const skip = (page - 1) * limit;

  const sortBy = q.sortBy ? q.sortBy : "createdAt";
  const sortOrder = q.sortOrder === "asc" ? 1 : -1;

  const andConditions: Record<string, any>[] = [];

  //  Search (Name, Phone, Condition)
  if (q.searchTerm) {
    andConditions.push({
      $or: [
        { name: { $regex: q.searchTerm, $options: "i" } },
        { phone: { $regex: q.searchTerm, $options: "i" } },
        { condition: { $regex: q.searchTerm, $options: "i" } },
      ],
    });
  }

  //  Exact Filters (date,Gender, DoctorId)
  if (q.condition) {
    andConditions.push({
      condition: { $regex: q.condition, $options: "i" },
    });
  }

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
  if (q.gender) {
    andConditions.push({ gender: q.gender });
  }

  if (q.doctorId) {
    andConditions.push({ doctorId: q.doctorId });
  }

  const whereConditions =
    andConditions.length > 0 ? ({ $and: andConditions } as any) : {};

  const patients = await Patient.find(whereConditions)
    .populate({
      path: "doctorId",
      select: "name specialization hospital email phone",
    })
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .select("-__v");

  const totalPatientsCount = await Patient.countDocuments(whereConditions);

  return {
    data: patients,
    meta: {
      page,
      limit,
      total: totalPatientsCount,
      totalPages: Math.ceil(totalPatientsCount / limit),
    },
  };
};
const getSinglePatientFromDB = async (patientId: string) => {
  const patient = await Patient.findOne({ _id: patientId } as any);
  if (!patient) {
    throw new Error("Patient not found");
  }
  return patient;
};
const updatePatientIntoDB = async (
  patientId: string,
  payload: Partial<IPatient>,
) => {
  const isExistPatient = await Patient.findOne({ _id: patientId } as any);
  if (!isExistPatient) {
    throw new Error("Patient not found");
  }
  const updatedPatient = await Patient.findOneAndUpdate(
    { _id: patientId } as any,
    { $set: payload },
    {
      new: true,
      runValidators: true,
    } as any,
  ).select("-__v");

  return updatedPatient;
};

const deletePatientIntoDB = async (patientId: string) => {
  const isPatientExist = await Patient.findOne({ _id: patientId } as any);

  if (!isPatientExist) {
    throw new Error("Patients Not found! ");
  }
  const patientDoctor = await Patient.findOneAndDelete({
    _id: patientId,
  } as any);
  return patientDoctor;
};

export const patientService = {
  getAllPatientsFromDB,
  getSinglePatientFromDB,
  updatePatientIntoDB,
  deletePatientIntoDB,
};
