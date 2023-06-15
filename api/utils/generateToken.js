import jwt from "jsonwebtoken";
import { JWT_NAME, JWT_SECRET, NODE_ENV } from "../common/constants.js";

/**
 * Generates a token based on the user ID and set it to the browser cookies
 * @param {*} res The response
 * @param {UserModel} user The user to validate
 */
const generateToken = (res, user) => {
	const token = jwt.sign(
		{ id: user._id, username: user.username, role: user.role },
		JWT_SECRET,
		{
			expiresIn: "30d",
		}
	);

	res.cookie(JWT_NAME, token, {
		httpOnly: true,
		secure: NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
	});
};

export default generateToken;
