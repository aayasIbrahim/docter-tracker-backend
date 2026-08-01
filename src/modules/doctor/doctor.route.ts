import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { auth } from "../../middleware/auth";

const router = Router();
router.post("/", auth("ADMIN"), doctorController.createDoctor);
router.get("/", auth("ADMIN"), doctorController.getAllDoctor);
export const doctorRoutes = router;
