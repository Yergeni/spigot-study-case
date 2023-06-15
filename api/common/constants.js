import dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV;
const SERVER_PORT = process.env.PORT;
const MONGO_DB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_NAME = "auth_token";
const UPLOADS_PATH = "/uploads";

export {
	NODE_ENV,
	SERVER_PORT,
	MONGO_DB_URI,
	JWT_SECRET,
	JWT_NAME,
	UPLOADS_PATH,
};
