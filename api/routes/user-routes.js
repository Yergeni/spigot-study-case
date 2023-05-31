import express from "express";
import {
	loginUser,
	logoutUser,
	registerUser,
  userProfile,
} from "../controllers/user-controller.js";
import { validateAuthorization } from "../utils.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", validateAuthorization, logoutUser);
router.get("/profile", validateAuthorization, userProfile);

export default router;
