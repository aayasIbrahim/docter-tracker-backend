import { Router } from "express";
import { statsController } from "./stats.controller";
import { auth } from "../../middleware/auth";

const router = Router();
router.get("/dashboard", auth("ADMIN"), statsController.getDashboardStats);

export const statsRoutes = router;
