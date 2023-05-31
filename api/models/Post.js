import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema(
	{
		title: { type: String, required: true, min: 4 },
		summary: { type: String, required: true, min: 4 },
		description: { type: String, required: true },
		image: { type: String },
		featured: { type: Boolean },
		author: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
	}
);

const PostModel = model("Post", PostSchema);

export default PostModel;
