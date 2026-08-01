import { Role } from "./user.interface";
import { Router } from "express";

import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";

const router = Router();
router.post("/register", userController.regierterUser);
router.get(
  "/me",
  auth("ADMIN"),
    userController.getMyProfile,
);
export const userRoutes = router;
