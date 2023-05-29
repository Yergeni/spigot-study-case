const mongoose = require("mongoose");

async function connectToDb() {
	await mongoose.connect(
		`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`
	);
}

function createFileName(name, path) {
	let extension = "";
	if (name) {
		const lastIndexOfDot = name.lastIndexOf(".");
		extension = name.substring(lastIndexOfDot);
	}
	return path + extension;
}

module.exports = { connectToDb, createFileName };
