import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";

import { ROUTES, POSTS_ROUTE, API_POST_PATH } from "../common/constants";

import { PostFormData } from "../components/posts/post.types";
import { convertToPost } from "../components/posts/post.utils";

import Button from "../components/ui/Button";
import { ReactQuillEditor } from "../components/ui/ReactQuillEditor";
import axiosInstance from "../utils/http.utils";

import "./PagesCommon.css";

const inittialValues: PostFormData = {
	title: "",
	summary: "",
	image: null,
};

export default function EditPostPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useUserContext();

	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState<PostFormData>(inittialValues);
	const [description, setDescription] = useState("");

	const postRoute = `${POSTS_ROUTE}/${id}`;

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true);
			axiosInstance
				.get(`${API_POST_PATH}/${id}/post`)
				.then((response) => {
					const post = convertToPost(response.data);
					if (user?.id === post.author.id) {
						setFormData({
							title: post.title,
							summary: post.summary,
							image: null,
						});
						setDescription(post.description);
					} else {
						navigate(ROUTES.HOME);
					}
				})
				.catch((error) => {
					console.error("GET POST (on edit) ERROR: ", error);
					navigate(ROUTES.HOME);
				})
				.finally(() => setLoading(false));
		};

		fetchPost();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]:
				e.target.name === "image" ? e.target.files : e.target.value,
		});
	};

	const handleUpdatePost = async (e: React.FormEvent) => {
		const data = new FormData();

		data.set("title", formData.title);
		data.set("summary", formData.summary);
		data.set("postImage", formData.image ? formData.image[0] : "");
		data.set("description", description);

		e.preventDefault();

		axiosInstance
			.put(`${API_POST_PATH}/${id}/update`, data, {
				headers: { "Content-Type": "multipart/form-data" },
				withCredentials: true,
			})
			.then(() => {
				navigate(postRoute);
			})
			.catch((error) => {
				console.error("CREATE POST ERROR: ", error);
				alert("Update post failed!");
			});
	};

	return loading ? (
		<div className="post_loading">
			<h2>Loading...</h2>
		</div>
	) : (
		<form onSubmit={handleUpdatePost}>
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
			<input type="file" name="image" onChange={handleChange} />
			<ReactQuillEditor
				value={description}
				onChange={(value) => setDescription(value)}
			/>
			<div className="post-form_btn-actions">
				<Button>Update Post</Button>
				<Button variant="secondary" onClick={() => navigate(postRoute)}>
					Cancel
				</Button>
			</div>
		</form>
	);
}
