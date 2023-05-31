import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/User.js";

import { JWT_SECRET, AUTH_TOKEN } from "../common/constants.js";

const salt = bcrypt.genSaltSync(10);

/**
 * Login user route
 * @description Login user and set the access token
 * @route  POST /api/users/login
 * @access Public
 */
async function loginUser(req, res) {
	const { username, password } = req.body;
	try {
		const userDoc = await UserModel.findOne({
			username,
		});

		let validatePassword = false;
		if (userDoc) {
			validatePassword = bcrypt.compareSync(password, userDoc.password);
		}

		if (!validatePassword) {
			res
				.status(400)
				.json({ error: { message: "Invalid Username or Password!" } });
		} else {
			// TODO: move to a sepearate function
			jwt.sign(
				{ id: userDoc._id, username, role: userDoc.role },
				JWT_SECRET,
				{},
				(err, token) => {
					if (err) throw err;
					res
						.status(200)
						.cookie(AUTH_TOKEN, token, {
							httpOnly: process.env.NODE_ENV === "production",
							secure: process.env.NODE_ENV === "production",
						})
						.json({
							id: userDoc._id,
							username,
							role: userDoc.role,
						});
				}
			);
		}
	} catch (err) {
		res.status(400).json(err);
	}
}

/**
 * Register user route
 * @description Register a new user and set the access token
 * @route  POST /api/users/register
 * @access Public
 */
async function registerUser(req, res) {
	const { username, password } = req.body;
	try {
		const userDoc = await UserModel.create({
			username,
			password: bcrypt.hashSync(password, salt),
			role: "user",
		});

    
		// TODO: move to a sepearate function
		jwt.sign(
			{ id: userDoc._id, username: userDoc.username, role: userDoc.role },
			JWT_SECRET,
			{},
			(err, token) => {
				if (err) throw err;
				res
					.status(200)
					.cookie(AUTH_TOKEN, token, {
						httpOnly: process.env.NODE_ENV === "production",
						secure: process.env.NODE_ENV === "production",
					})
					.json({
						id: userDoc._id,
						username: userDoc.username,
						role: userDoc.role,
					});
			}
		);
	} catch (err) {
		res.status(400).json(err);
	}
}

/**
 * Logout user route
 * @description Logout a new user and set the access token
 * @route  POST /api/users/logout
 * @access Protected
 */
async function logoutUser (req, res) {
	res.clearCookie(AUTH_TOKEN).json("ok");
};


/**
 * Profile user route
 * @description Profile a new user and set the access token
 * @route  GET /api/users/profile
 * @access Protected
 */
async function userProfile (req, res) {
	const userInfo = {
		id: req.userId,
		username: req.username,
		role: req.userRole,
	};
	res.json({ user: userInfo });
};

export { loginUser, registerUser, logoutUser, userProfile };
