import httpStatus from "http-status";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./auth.sevice";
import { sendResponse } from "../../utils/sendResponse";
import config from "../../config";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const { accessToken, refreshToken } =
    await userService.loginUserIntoDB(payload);
  const isProduction = config.node_env === "production";
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: { accessToken, refreshToken },
  });
});
export const authController = {
  loginUser,
};
