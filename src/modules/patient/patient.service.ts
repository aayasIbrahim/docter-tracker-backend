import { IPatient, IPatientQuery } from "./patient.interface";
import Patient from "./patient.model";

const getAllPatientsFromDB = async (q: IPatientQuery) => {
  const limit = q.limit ? Number(q.limit) : 5;
  const page = q.page ? Number(q.page) : 1;
  const skip = (page - 1) * limit;

  const sortBy = q.sortBy ? q.sortBy : "createdAt";
  const sortOrder = q.sortOrder === "asc" ? 1 : -1;

  const andConditions: any[] = [];

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

  if (q.startDate && q.endDate) {
    andConditions.push({
      createdAt: {
        $gte: new Date(q.startDate),
        $lte: new Date(q.endDate),
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
    throw new Error(" Doctor Not found! ");
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
