import mongoose from "mongoose";

async function connectToDb() {
	await mongoose.connect(
		`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`
	);
}

/* -------------------------------------------------------------------- */

function createFileName(name, path) {
	let extension = "";
	if (name) {
		const lastIndexOfDot = name.lastIndexOf(".");
		extension = name.substring(lastIndexOfDot);
	}
	return path + extension;
}

/* -------------------------------------------------------------------- */

import path from "path";
import { fileURLToPath } from "url";

function getDirName(moduleUrl) {
	const filename = fileURLToPath(moduleUrl);
	return path.dirname(filename);
}

/* -------------------------------------------------------------------- */

import jwt from "jsonwebtoken";
import { AUTH_TOKEN, JWT_SECRET } from "./common/constants.js";

/* Checks the JWT coming from cookies */
const validateAuthorization = (req, res, next) => {
	const token = req.cookies[AUTH_TOKEN];
	if (!token) {
		return res.sendStatus(403);
	}
	try {
		const data = jwt.verify(token, JWT_SECRET);
		req.userId = data.id;
		req.userRole = data.role;
		req.username = data.username;
		return next();
	} catch {
		return res.sendStatus(403);
	}
};

export { connectToDb, createFileName, getDirName, validateAuthorization };
