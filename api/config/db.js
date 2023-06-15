import mongoose from "mongoose";
import { exit } from "process";

import { MONGO_DB_URI } from "../common/constants.js";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(MONGO_DB_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error ${error.message}`);
		exit(1);
	}
};

export default connectDB;