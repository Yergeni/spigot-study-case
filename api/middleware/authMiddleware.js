import jwt from "jsonwebtoken";

import { JWT_NAME, JWT_SECRET } from "../common/constants.js";

/**
 * Verifies the token from cookies and add the user to the req based on the decoded token info
 */
const validateAuthorization = (req, res, next) => {
	const token = req.cookies[JWT_NAME];
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

export default validateAuthorization;
