import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { auth } from "../../middleware/auth";

const router = Router();
router.post("/", auth("ADMIN"), doctorController.createDoctor);
router.get("/", auth("ADMIN"), doctorController.getAllDoctor);
router.get("/:id", auth("ADMIN"), doctorController.getSingleDoctor);
router.put("/:id", auth("ADMIN"), doctorController.updateDoctor);
router.delete("/:id", auth("ADMIN"), doctorController.deleteDoctor);
export const doctorRoutes = router;
