import express from "express";
import multer from "multer";
const uploadMiddleware = multer({ dest: "uploads/" });

import {
	createPost,
	deletePost,
	featuredPost,
	getAllPosts,
	getPostById,
	updatePost,
} from "../controllers/post-controller.js";

import { validateAuthorization } from "../utils.js";

const router = express.Router();

router.get("/all", getAllPosts);
router.get("/:id/post", getPostById);
router.post(
	"/create",
	validateAuthorization,
	uploadMiddleware.single("postImage"),
	createPost
);
router.put(
	"/:id/update",
	validateAuthorization,
	uploadMiddleware.single("postImage"),
	updatePost
);
router.delete("/:id/delete", validateAuthorization, deletePost);
router.patch("/:id/featured", featuredPost);

export default router;
