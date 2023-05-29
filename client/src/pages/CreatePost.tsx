import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PostFormData } from "../components/posts/post.types";

import { CREATE_POST_PATH, ROUTES } from "../common/constants";

import Button from "../components/ui/Button";
import { ReactQuillEditor } from "../components/ui/ReactQuillEditor";

import axiosInstance from "../utils/http.utils";

import "./PagesCommon.css";

const inittialValues: PostFormData = {
	title: "",
	summary: "",
	image: null,
};

export default function CreatePost() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState<PostFormData>(inittialValues);
	const [description, setDescription] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]:
				e.target.name === "image" ? e.target.files : e.target.value,
		});
	};

	const handleCreatePost = async (e: React.FormEvent) => {
		const data = new FormData();

		data.set("title", formData.title);
		data.set("summary", formData.summary);
		data.set("postImage", formData.image ? formData.image[0] : "");
		data.set("description", description);

		e.preventDefault();

		// TODO: improve by adding validations on submit
		axiosInstance
			.post(CREATE_POST_PATH, data, {
				headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
			})
			.then(() => {
				navigate(ROUTES.HOME);
			})
			.catch((error) => {
				console.error("CREATE POST ERROR: ", error);
				alert("Create post failed!");
			});
	};

	return (
		<form onSubmit={handleCreatePost}>
			<input
				type="text"
				name="title"
				placeholder="Title"
				value={formData.title}
				onChange={handleChange}
        maxLength={60}
			/>
			<input
				type="text"
				name="summary"
				placeholder="Summary"
				value={formData.summary}
				onChange={handleChange}
			/>
			<input required type="file" name="image" onChange={handleChange} />
			<ReactQuillEditor
				value={description}
				onChange={(value) => setDescription(value)}
			/>
			<div className="post-form_btn-actions">
				<Button>Create Post</Button>
				<Button variant="secondary" onClick={() => navigate(ROUTES.HOME)}>
					Cancel
				</Button>
			</div>
		</form>
	);
}
