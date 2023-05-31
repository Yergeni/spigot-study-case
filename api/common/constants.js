import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const AUTH_TOKEN = "auth_token";
const UPLOADS_PATH = "/uploads";

export { JWT_SECRET, AUTH_TOKEN, UPLOADS_PATH };
