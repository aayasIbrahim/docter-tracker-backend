import express, { Application, Request, Response } from "express";
import config from "./config/";
import cors from "cors";
import cookieParse from "cookie-parser";

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

export default app;
