import { Request, Response } from "express";

import httpStatus from "http-status";
import { statsService } from "./stats.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
  const result = await statsService.getDashboardStatsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Dashboard analytics retrieved successfully!",
    data: result,
  });
});

export const statsController = {
  getDashboardStats,
};
