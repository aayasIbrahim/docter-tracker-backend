import { Router } from "express";
import { patientController } from "./patient.controller";
import { auth } from "../../middleware/auth";

const router = Router();
router.get("/", auth("ADMIN"), patientController.getAllPatients);
router.get("/:id", auth("ADMIN"), patientController.getSinglePatient);
router.put("/:id", auth("ADMIN"), patientController.updatePatient);
router.delete("/:id", auth("ADMIN"), patientController.deletePatient);

export const patientRoutes = router;
