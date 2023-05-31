import fs from "fs";

import PostModel from "../models/Post.js";

import { createFileName } from "../utils.js";

/**
 * Get post by id route
 * @description Get a specific post based on provided id
 * @route  POST /api/posts/:id/post
 * @access Public
 */
async function getPostById(req, res) {
	try {
		const postDoc = await PostModel.findById(req.params.id).populate("author", [
			"username",
			"role",
		]);
		res.status(200).json(postDoc);
	} catch (error) {
		res.status(400).json(error);
	}
}

/**
 * Get all post route
 * @description Get all posts (currently limitted to 20)
 * @route  POST /api/posts/all
 * @access Public
 */
async function getAllPosts(_, res) {
	try {
		// pospulates with the author (user) information
		const postsDoc = await PostModel.find()
			.populate("author", ["username", "role"])
			.sort({ createdAt: -1 }) // sort by creation date DESC
			.limit(20); // Get the first 20
		res.status(200).json(postsDoc);
	} catch (error) {
		res.status(400).json(error);
	}
}

/**
 * Create post route
 * @description Create a new post
 * @route  POST /api/posts/create
 * @access Protected
 */
async function createPost(req, res) {
	const { originalname, path } = req.file;
	const newPath = createFileName(originalname, path);
	fs.renameSync(path, newPath); // add the extension to image

	// Save the post
	const { title, summary, description } = req.body;
	try {
		const postDoc = await PostModel.create({
			title,
			summary,
			description,
			image: newPath,
			featured: false, // by default on creation
			author: req.userId,
		});

		res.status(201).json(postDoc);
	} catch (error) {
		res.status(400).json(error);
	}
}

/**
 * Update post route
 * @description Delete a specified post
 * @route  DELETE /api/posts/:id/update
 * @access Protected
 */
async function updatePost(req, res) {
	const { id } = req.params;
	const { title, summary, description } = req.body;

	try {
		// Check if a file was sent
		let newPath = null;
		if (req.file) {
			const { originalname, path } = req.file;
			newPath = createFileName(originalname, path);
			fs.renameSync(path, newPath); // add the extension to image
		}

		// Get the post from DB
		const postDoc = await PostModel.findById(id);
		const isAuthor =
			JSON.stringify(req.userId) === JSON.stringify(postDoc.author);

		if (!isAuthor) {
			return res.sendStatus(403);
		} else {
			await postDoc.updateOne({
				title,
				summary,
				description,
				image: newPath || postDoc.image, // keep previous image if no image provided
			});
			await postDoc.save();
		}
		res.status(200).json(postDoc);
	} catch (error) {
		res.status(400).json(error);
	}
}

/**
 * Delete post route
 * @description Delete a specified post
 * @route  DELETE /api/posts/:id/delete
 * @access Protected
 */
async function deletePost(req, res) {
	const { id } = req.params;

	try {
		// Get the post from DB
		const postDoc = await PostModel.findById(id);
		const isAuthor =
			JSON.stringify(req.userId) === JSON.stringify(postDoc.author);

		if (!isAuthor) {
			return res.sendStatus(403);
		} else {
			await postDoc.deleteOne({ _id: id });
		}
		res.status(200).json("deleted");
	} catch (error) {
		res.status(400).json(error);
	}
}

/**
 * Featured post route
 * @description Mark as featured a specified post
 * @route  PATCH /api/posts/:id/featured
 * @access Public
 */
async function featuredPost(req, res) {
	const { id } = req.params;

	try {
		// Get the post from DB
		const postDoc = await PostModel.findById(id);
		postDoc.featured = !postDoc.featured;
		await postDoc.save();

		res.status(200).json(postDoc);
	} catch (error) {
		res.status(400).json(error);
	}
}

export {
	getAllPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,
	featuredPost,
};
