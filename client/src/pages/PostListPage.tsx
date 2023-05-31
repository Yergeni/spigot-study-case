import { useEffect, useState } from "react";
import { GET_ALL_POSTS_PATH } from "../common/constants";

import Post from "../components/posts/PostItem";

import { IPost } from "../components/posts/post.types";

import axiosInstance from "../utils/http.utils";
import { convertToPost } from "../components/posts/post.utils";

import "./PagesCommon.css";

export default function PostListPage() {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			axiosInstance
				.get(GET_ALL_POSTS_PATH)
				.then((response) => {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const posts: IPost[] = response.data.map((post: any) => {
						return convertToPost(post);
					});

					setPosts(posts);
				})
				.catch((error) => {
					console.error("GET ALL POSTS ERROR: ", error);
				})
				.finally(() => setLoading(false));
		};

		fetchPosts();
	}, []);

	return (
		<>
			{loading ? (
				<div className="post_loading">
					<h2>Loading...</h2>
				</div>
			) : posts.length > 0 ? (
				posts.map((post) => <Post key={post.id} post={post} />)
			) : (
				<div className="post_no-post">
					<h2>There are no posts added yet</h2>
				</div>
			)}
		</>
	);
}
