import express from "express";
import {
	loginUser,
	logoutUser,
	registerUser,
  userProfile,
} from "../controllers/userController.js";

import validateAuthorization from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get("/profile", validateAuthorization, userProfile);

export default router;
