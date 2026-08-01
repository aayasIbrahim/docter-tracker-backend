import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userSevice } from "./user.service";
import { Request, Response } from "express";

const regierterUser = catchAsync(async (req:Request, res:Response) => {
  const payload = req.body;
  const result = await userSevice.registerUserIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Registation Successfully",
    data: result,
  });
});

export const userController = {
  regierterUser,
};
