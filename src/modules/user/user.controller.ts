import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";
import { NextFunction, Request, Response } from "express";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";

const regierterUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userService.registerUserIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Registation Successfully",
    data: result,
  });
});
const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    const token = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);
    const { id } = token.data as JwtPayload;

    const profile = await userService.getMyProfileIntoDB(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Profile Retrieved Successfully",
      data: profile,
    });
  },
);

export const userController = {
  regierterUser,
  getMyProfile,
};
