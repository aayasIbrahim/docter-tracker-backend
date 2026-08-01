import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.sevice";
import { sendResponse } from "../../utils/sendResponse";
import config from "../../config";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const { accessToken, refreshToken } =
    await authService.loginUserIntoDB(payload);
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
const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    const { newAccessToken } = await authService.refreshToken(refreshToken);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Token Refreshed Successfully",
      data: {
        newAccessToken,
      },
    });
  },
);
export const authController = {
  loginUser,
  refreshToken
};
