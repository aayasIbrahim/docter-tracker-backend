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
    data: result,
  });
});
const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
  const doctorId = req.params.id;
  const result = await doctorService.getSingleDoctorFromDB(doctorId as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Doctor Retrived  Successfully",
    data: result,
  });
});
const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const updateBody = req.body;
  const doctorId = req.params.id;
  const result = await doctorService.updateDoctorIntoDB(
    doctorId as string,
    updateBody,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Doctor Upddate  Successfully",
    data: result,
  });
});
export const doctorController = {
  createDoctor,
  getAllDoctor,
  getSingleDoctor,
  updateDoctor,
};
