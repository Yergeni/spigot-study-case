import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

import UserModel from "../models/User.js";

import { JWT_NAME } from "../common/constants.js";

import generateToken from "../utils/generateToken.js";

const salt = bcrypt.genSaltSync(10);

/**
 * Register user route
 * @description Register a new user and set the access token
 * @route  POST /api/users/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	const userExist = await UserModel.findOne({ username });
	if (userExist) {
		res.status(400);
		throw new Error("Username already exist");
	}

	const userDoc = await UserModel.create({
		username,
		password: bcrypt.hashSync(password, salt),
		role: "user",
	});

	if (userDoc) {
		generateToken(res, userDoc);
		res.status(201).json({
			id: userDoc._id,
			username: userDoc.username,
			role: userDoc.role,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

/**
 * Login user route
 * @description Login user and set the access token
 * @route  POST /api/users/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	const userDoc = await UserModel.findOne({
		username,
	});

	let validatePassword = false;
	if (userDoc) {
		validatePassword = bcrypt.compareSync(password, userDoc.password);
	}

	if (!validatePassword) {
		res.status(401);
		throw new Error("Invalid username or password");
	} else {
		generateToken(res, userDoc);
		res.status(200).json({
			id: userDoc._id,
			username,
			role: userDoc.role,
		});
	}
});

/**
 * Logout user route
 * @description Logout a new user and set the access token
 * @route  POST /api/users/logout
 * @access Public
 */
const logoutUser = asyncHandler(async (_, res) => {
	res.cookie(JWT_NAME, "", { httpOnly: true, expires: new Date(0) });
	res.status(200).json({ message: "User logged out" });
});

/**
 * Profile user route
 * @description Profile a new user and set the access token
 * @route  GET /api/users/profile
 * @access Protected
 */
const userProfile = asyncHandler(async (req, res) => {
	const userInfo = {
		id: req.userId,
		username: req.username,
		role: req.userRole,
	};
	res.json({ user: userInfo });
});

export { loginUser, registerUser, logoutUser, userProfile };
