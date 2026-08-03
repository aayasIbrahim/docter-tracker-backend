import httpStatus from "http-status";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { doctorService } from "./doctor.service";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await doctorService.createDoctorIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Doctor Created  Successfully",
    data: result,
  });
});
const getAllDoctor = catchAsync(async (req: Request, res: Response) => {
  const q = req.query;
  const result = await doctorService.getAllDoctorFromDB(q);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Doctor Retrival successfully",
    data: result.data,
    meta: result.meta,
  });
});
const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id: doctorId } = req.params;
  if (!doctorId) {
    throw new Error("Doctor Id Required In Params");
  }
  const result = await doctorService.getSingleDoctorFromDB(doctorId as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Doctor Retrived  Successfully",
    data: result,
  });
});
const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const { id: doctorId } = req.params;
  if (!doctorId) {
    throw new Error("Doctor Id Required In Params");
  }
  const result = await doctorService.updateDoctorIntoDB(
    doctorId as string,
    payload,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Doctor Upddate  Successfully",
    data: result,
  });
});
const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id: doctorId } = req.params;
  if (!doctorId) {
    throw new Error("Doctor Id Required In Params");
  }
  await doctorService.deleteDoctorIntoDB(doctorId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Doctor Delete  Successfully",
    data: null,
  });
});


//Controller layer to Doctor-Patient Nested Routes

const getDoctorPatients = catchAsync(async (req: Request, res: Response) => {
  const { id: doctorId } = req.params;
  if (!doctorId) {
    throw new Error("Doctor Id Required In Params");
  }
  const result = await doctorService.getDoctorPatientsIntoDB(
    doctorId as string,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Patients retrieved successfully for the specified doctor!",
    data: result,
  });
});
const addPatientUnderDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const { id: doctorId } = req.params;
    if (!doctorId) {
      throw new Error("Doctor Id Required In Params");
    }
    const patientData = req.body;
    const result = await doctorService.addPatientUnderDoctor(
      doctorId as string,
      patientData,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Patient successfully assigned under the doctor!",
      data: result,
    });
  },
);

const removePatientFromDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const { doctorId, patientId } = req.params;

    if (!doctorId && !patientId) {
      throw new Error("Doctor Id & Patient Id Required In Params");
    }
    const result = await doctorService.removePatientFromDoctorInDB(
      doctorId as string,
      patientId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Patient successfully removed from doctor list!",
      data: result,
    });
  },
);

export const doctorController = {
  createDoctor,
  getAllDoctor,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorPatients,
  addPatientUnderDoctor,
  removePatientFromDoctor,
};
