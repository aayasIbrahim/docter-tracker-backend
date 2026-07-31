import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../config";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Error : ", err);

  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let errorMessage = err.message || "Internal Server Error";
  let errorName = err.name || "Internal Server Error";

  //  Mongoose Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    errorName = "MongooseValidationError";
    errorMessage = Object.values(err.errors)
      .map((val: any) => val.message)
      .join(", ");
  }

  //  Mongoose Cast Error
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = httpStatus.BAD_REQUEST;
    errorName = "MongooseCastError";
    errorMessage = `Invalid format for field '${err.path}': value '${err.value}' is not a valid ObjectId.`;
  }

  //  MongoDB Duplicate Key Error
  else if (err.code === 11000) {
    statusCode = httpStatus.BAD_REQUEST;
    errorName = "MongoDBDuplicateKeyError";
    const field = Object.keys(err.keyValue)[0];
    errorMessage = `Duplicate Key Error: A record with this ${field} already exists.`;
  }

  // Zod or Custom Validation Error
  else if (err.name === "ZodError" || err.name === "ValidationError") {
    statusCode = httpStatus.BAD_REQUEST;
    errorName = "ValidationError";
    errorMessage = err.issues
      ? err.issues.map((issue: any) => issue.message).join(", ")
      : err.message;
  }

  //  JWT Errors
  else if (err.name === "JsonWebTokenError") {
    statusCode = httpStatus.UNAUTHORIZED;
    errorName = "UnauthorizedError";
    errorMessage = "Your token is invalid or expired. Please login again.";
  }

  //  JWT Expired Error
  else if (err.name === "TokenExpiredError") {
    statusCode = httpStatus.UNAUTHORIZED;
    errorName = "TokenExpiredError";
    errorMessage = "Your login session has expired. Please login again.";
  }

  // Custom App Error
  else if (err.statusCode) {
    statusCode = err.statusCode;
    errorMessage = err.message;
    errorName = err.name || "AppError";
  }

  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    name: errorName,
    message: errorMessage,
    error: config.node_env === "production" ? null : err.stack,
  });
};
