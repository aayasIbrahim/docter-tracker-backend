import httpStatus from "http-status";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { patientService } from "./patient.service";

const getAllPatients = catchAsync(async (req: Request, res: Response) => {
  const q = req.query;
  const result = await patientService.getAllPatientsFromDB(q);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Patients retrieved  Successfully!",
    data: result.data,
    meta: result.meta,
  });
});
const getSinglePatient = catchAsync(async (req: Request, res: Response) => {
  const { id: patientId } = req.params;
  if (!patientId) {
    throw new Error("Patient Id Required In Params");
  }
  const result = await patientService.getSinglePatientFromDB(
    patientId as string,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Patient retrieved  Successfully!",
    data: result,
  });
});
const updatePatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const { id: patientId } = req.params;
  if (!patientId) {
    throw new Error("Patient Id Required In Params");
  }
  const result = await patientService.updatePatientIntoDB(
    patientId as string,
    payload,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Patient Upddate  Successfully",
    data: result,
  });
});

const deletePatient = catchAsync(async (req: Request, res: Response) => {
  const { id: patientId } = req.params;
  if (!patientId) {
    throw new Error("Doctor Id Required In Params");
  }
  await patientService.deletePatientIntoDB(patientId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Patient Delete  Successfully",
    data: null,
  });
});
export const patientController = {
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
};
