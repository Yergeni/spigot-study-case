require("dotenv").config();
const paths = require("./paths");
const {connectToDb, createFileName} = require("./utils");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const multer = require("multer");

const uploadMiddleware = multer({ dest: "uploads/" });

/* Models */
const UserModel = require("./models/User");
const PostModel = require("./models/Post");

const port = process.env.SERVER_PORT || 4000;
const AUTH_TOKEN = "auth_token";
const salt = bcrypt.genSaltSync(10);

const secret = process.env.JWT_SECRET;
const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(paths.UPLOADS_PATH, express.static(__dirname + paths.UPLOADS_PATH));

// Connect to MongoDB
connectToDb().catch((err) => console.log(err));

/* Checks the JWT coming from cookies */
const validateAuthorization = (req, res, next) => {
	const token = req.cookies[AUTH_TOKEN];
	if (!token) {
		return res.sendStatus(403);
	}
	try {
		const data = jwt.verify(token, secret);
		req.userId = data.id;
		req.userRole = data.role;
		req.username = data.username;
		return next();
	} catch {
		return res.sendStatus(403);
	}
};

// TODO: move to their own file
// Register endpoint
app.post(paths.REGISTER_PATH, async (req, res) => {
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
			secret,
			{},
			(err, token) => {
				if (err) throw err;
				res
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
});

// Login endpoint
app.post(paths.LOGIN_PATH, async (req, res) => {
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
				secret,
				{},
				(err, token) => {
					if (err) throw err;
					res
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
});

// Logout endpoint
app.post(paths.LOGOUT_PATH, async (req, res) => {
	res.clearCookie(AUTH_TOKEN).json("ok");
});

// Profile endpoint
app.get(paths.PROFILE_PATH, validateAuthorization, (req, res) => {
	const userInfo = {
		id: req.userId,
		username: req.username,
		role: req.userRole,
	};
	res.json({ user: userInfo });
});

/*------------------ POSTS ENDPOINTS ------------------*/
// Create post endpoint
app.post(
	paths.CREATE_POST_PATH,
	validateAuthorization,
	uploadMiddleware.single("postImage"),
	async (req, res) => {
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

			// res.json(postDoc);
			res.status(201).json(postDoc);
		} catch (error) {
			res.status(400).json(error);
		}
	}
);

// Update post endpoint
app.put(
	paths.UPDATE_POST_PATH,
	validateAuthorization,
	uploadMiddleware.single("postImage"),
	async (req, res) => {
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
			}
			res.json(postDoc);
		} catch (error) {
			res.status(400).json(error);
		}
	}
);

// Update post endpoint
app.delete(
	paths.DELETE_POST_PATH,
	validateAuthorization,
	async (req, res) => {
		const { id } = req.params;

		try {
			// Get the post from DB
			const postDoc = await PostModel.findById(id);
			const isAuthor =
				JSON.stringify(req.userId) === JSON.stringify(postDoc.author);

			if (!isAuthor) {
				return res.sendStatus(403);
			} else {
				await postDoc.deleteOne({_id: id});
			}
			res.json("deleted");
		} catch (error) {
			res.status(400).json(error);
		}
	}
);

// Featured post endpoint
app.patch(paths.FEATURED_POST_PATH, async (req, res) => {
	const { id } = req.params;

	try {
		// Get the post from DB
		const postDoc = await PostModel.findById(id);
		postDoc.featured = !postDoc.featured;
		await postDoc.save();

		res.json(postDoc);
	} catch (error) {
		res.status(400).json(error);
	}
});

// Get All posts endpoint
app.get(paths.ALL_POSTS_PATH, async (_, res) => {
	try {
		// pospulates with the author (user) information
		const postsDoc = await PostModel.find()
			.populate("author", ["username", "role"])
			.sort({ createdAt: -1 })
			.limit(20);
		res.json(postsDoc);
	} catch (error) {
		res.status(400).json(error);
	}
});

// Get post by id endpoint
app.get(paths.GET_POST_PATH, async (req, res) => {
	try {
		const postDoc = await PostModel.findById(req.params.id).populate("author", [
			"username",
			"role",
		]);
		res.json(postDoc);
	} catch (error) {
		res.status(400).json(error);
	}
});

console.log(`Server started at http://localhost:${port}`);
app.listen(port);
