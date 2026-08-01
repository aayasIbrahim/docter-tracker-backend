import express, { Application, Request, Response } from "express";
import config from "./config/";
import cors from "cors";
import cookieParse from "cookie-parser";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { userRoutes } from "./modules/user/user.route";
import { authroutes } from "./modules/auth/auh.route";
import { doctorRoutes } from "./modules/doctor/doctor.route";

const app: Application = express();
app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Doctor Tracker Server Running",
    author: "Ayas Ibrahim",
  });
});
app.use("/api/user", userRoutes);
app.use("/api/auth", authroutes);
app.use("/api/doctors", doctorRoutes);
app.use(notFound);
app.use(globalErrorHandler);
export default app;
