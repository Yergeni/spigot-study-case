import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { UPLOADS_PATH } from "./common/constants.js";
import { connectToDb, getDirName } from "./utils.js";

/* Routes */
import userRoutes from "./routes/user-routes.js";
import postRoutes from "./routes/post-routes.js";

const port = process.env.SERVER_PORT || 4000;
const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
};
const dirName = getDirName(import.meta.url);

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(UPLOADS_PATH, express.static(dirName + UPLOADS_PATH));

// Connect to MongoDB
connectToDb().catch((err) => console.log(err));

/* Routes */
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

console.log(`Server started at http://localhost:${port}`);
app.listen(port);
