import fs from "fs";
import asyncHandler from "express-async-handler";

import PostModel from "../models/Post.js";

import createFileNameWithExtension from "../utils/createFilename.js";

/**
 * Get post by id route
 * @description Get a specific post based on provided id
 * @route  POST /api/posts/:id/post
 * @access Public
 */
const getPostById = asyncHandler(async (req, res) => {
	const postDoc = await PostModel.findById(req.params.id).populate("author", [
		"username",
		"role",
	]);

	if (postDoc) {
		res.status(200).json(postDoc);
	} else {
		res.status(400);
		throw new Error("Error fetching post");
	}
});

/**
 * Get all post route
 * @description Get all posts (currently limitted to 20)
 * @route  POST /api/posts/all
 * @access Public
 */
const getAllPosts = asyncHandler(async (_, res) => {
	// pospulates with the author (user) information
	const postsDoc = await PostModel.find()
		.populate("author", ["username", "role"])
		.sort({ createdAt: -1 }) // sort by creation date DESC
		.limit(20); // Get the first 20

	if (postsDoc) {
		res.status(200).json(postsDoc);
	} else {
		res.status(400);
		throw new Error("Error fetching posts");
	}
});

/**
 * Create post route
 * @description Create a new post
 * @route  POST /api/posts/create
 * @access Protected
 */
const createPost = asyncHandler(async (req, res) => {
	const { originalname, path } = req.file;
	const newPath = createFileNameWithExtension(originalname, path);
	fs.renameSync(path, newPath); // add the extension to image

	// Save the post
	const { title, summary, description } = req.body;
	const postDoc = await PostModel.create({
		title,
		summary,
		description,
		image: newPath,
		featured: false, // by default on creation
		author: req.userId,
	});

	if (postDoc) {
		res.status(201).json(postDoc);
	} else {
		res.status(400);
		throw new Error("Error creating post");
	}
});

/**
 * Update post route
 * @description Delete a specified post
 * @route  DELETE /api/posts/:id/update
 * @access Protected
 */
const updatePost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { title, summary, description } = req.body;

	// Check if a file was sent
	let newPath = null;
	if (req.file) {
		const { originalname, path } = req.file;
		newPath = createFileNameWithExtension(originalname, path);
		fs.renameSync(path, newPath); // add the extension to image
	}

	// Get the post from DB
	const postDoc = await PostModel.findById(id);
	const isAuthor =
		JSON.stringify(req.userId) === JSON.stringify(postDoc.author);

	if (!isAuthor) {
		res.sendStatus(403);
	} else {
		await postDoc.updateOne({
			title,
			summary,
			description,
			image: newPath || postDoc.image, // keep previous image if no image provided
		});
		await postDoc.save();

		res.status(200).json(postDoc);
	}
});

/**
 * Delete post route
 * @description Delete a specified post
 * @route  DELETE /api/posts/:id/delete
 * @access Protected
 */
const deletePost = asyncHandler(async (req, res) => {
	const { id } = req.params;

	// Get the post from DB
	const postDoc = await PostModel.findById(id);
	const isAuthor =
		JSON.stringify(req.userId) === JSON.stringify(postDoc.author);

	if (!isAuthor) {
		return res.sendStatus(403);
	} else {
		await postDoc.deleteOne({ _id: id });
		res.status(200).json("Post deleted");
	}
});

/**
 * Featured post route
 * @description Mark as featured a specified post
 * @route  PATCH /api/posts/:id/featured
 * @access Public
 */
const featuredPost = asyncHandler(async (req, res) => {
	const { id } = req.params;

	// Get the post from DB
	const postDoc = await PostModel.findById(id);
	if (!postDoc) {
		res.status(400);
		throw new Error("Bad request");
	} else {
		postDoc.featured = !postDoc.featured;
		await postDoc.save();
		res.status(200).json(postDoc);
	}
});

export {
	getAllPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,
	featuredPost,
};
