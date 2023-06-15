import express from "express";

import {
	createPost,
	deletePost,
	featuredPost,
	getAllPosts,
	getPostById,
	updatePost,
} from "../controllers/postController.js";

import validateAuthorization from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";

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
