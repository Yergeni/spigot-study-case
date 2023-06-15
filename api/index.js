import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

/* Constants */
import { SERVER_PORT, UPLOADS_PATH } from "./common/constants.js";

/* Utils */
import { getDirName } from "./utils.js";

/* Routes */
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/post-routes.js";

/* Error Handler Middlewares */
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

/* MongDB Connection */
import connectDB from "./config/db.js";
connectDB();

const port = SERVER_PORT || 4000;

const app = express();

/* CORS Configuration */
const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

/* Static files */
const dirName = getDirName(import.meta.url);
app.use(UPLOADS_PATH, express.static(dirName + UPLOADS_PATH));

/* Routes */
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

console.log(`Server started at http://localhost:${port}`);
app.listen(port);
