import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";

import { ROUTES, API_BASE_URL, ALL_POSTS_PATH } from "../common/constants";

import { IPost } from "../components/posts/post.types";

import Button from "../components/ui/Button";

import axiosInstance from "../utils/http.utils";
import { dateTimeFormatter } from "../utils/date.utils";
import { convertToPost } from "../components/posts/post.utils";

import "./PostPage.css";
import PostMeta from "../components/posts/PostMeta";

export default function PostPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useUserContext();

	const [post, setPost] = useState<IPost>();
	const [loading, setLoading] = useState(false);

	const imageURL = `${API_BASE_URL}/${post?.image}`;
	const featuredText = post?.featured ? "Unfeatured" : "Featured";

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true);
			axiosInstance
				.get(`${ALL_POSTS_PATH}/${id}`)
				.then((response) => {
					setPost(convertToPost(response.data));
				})
				.catch((error) => {
					console.error("GET POST ERROR: ", error);
					navigate(ROUTES.HOME);
				})
				.finally(() => setLoading(false));
		};

		fetchPost();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleFeaturedPost = async () => {
		axiosInstance
			.patch(`${ALL_POSTS_PATH}/${id}/featured`)
			.then((response) => {
				setPost({ ...(post as IPost), featured: response.data.featured });
			})
			.catch((error) => {
				console.error("FEATURED POST ERROR: ", error);
			});
	};

	const handleDeletePost = async () => {
		const selection = confirm("Are you sure you want to delete this post?");

		if (selection) {
			axiosInstance
				.delete(`${ALL_POSTS_PATH}/${id}/delete`, { withCredentials: true })
				.then((response) => {
					if (response.status === 200) {
						navigate(ROUTES.HOME);
					} else {
						alert("Delete post failed!");
					}
				})
				.catch((error) => {
					console.error("DELETE POST ERROR: ", error);
					alert("Delete post failed!");
				});
		}
	};

	return (
		<>
			{loading ? (
				<div className="post-page_loading">
					<h2>Loading...</h2>
				</div>
			) : (
				post && (
					<div className="post-page_container">
						<div className="post-page_title-container">
							{post.featured && (
								<div>
									<CheckBadgeIcon className="post-page_featured-icon" />
								</div>
							)}
							<h1 className="post-page_title">{post.title}</h1>
						</div>
						<div className="post-page_post-info">
							<span>By </span>
							{/* TODO: profile page */}
							<Link to="">@{post.author.username}</Link>
							<time> on {dateTimeFormatter(new Date(post.createdAt))}</time>
							<div className="post-page_actions">
								{user?.id === post.author.id && (
									<Button
										variant="terciary"
										onClick={() =>
											navigate(`${ALL_POSTS_PATH}/${post.id}/edit`)
										}
									>
										<div className="post-page_icon-container">
											<PencilSquareIcon className="post-page_btn-icon" />
											<span>Edit</span>
										</div>
									</Button>
								)}
								<Button variant="primary" onClick={handleFeaturedPost}>
									{featuredText}
								</Button>
								{user?.id === post.author.id && (
									// TODO: delete post
									<Button variant="secondary" onClick={handleDeletePost}>
										<div className="post-page_icon-container">
											<TrashIcon className="post-page_btn-icon" />
											<span>Delete</span>
										</div>
									</Button>
								)}
							</div>
						</div>
						<div className="post-page_image">
							<img src={imageURL} alt="post cover" />
						</div>

						<div className="post-page_divider" />
						<div
							className="post-page_description"
							dangerouslySetInnerHTML={{ __html: post.description }}
						/>
          <PostMeta />
					</div>
				)
			)}
		</>
	);
}
