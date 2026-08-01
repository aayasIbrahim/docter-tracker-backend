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
    statusCode: httpStatus.CREATED,
    message: "Doctor Retrival successfully",
    data: result,
  });
});
export const doctorController = {
  createDoctor,
  getAllDoctor,
};
