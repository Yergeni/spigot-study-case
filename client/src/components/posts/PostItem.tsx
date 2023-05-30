import { Link } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

import { IPost } from "./post.types";
import { dateTimeFormatter } from "../../utils/date.utils";
import { API_BASE_URL, ALL_POSTS_PATH } from "../../common/constants";

import "./PostItem.css";

type PostItemProps = {
	post: IPost;
};

export default function PostItem({ post }: PostItemProps) {
	return (
		<div className="post_container">
			<div className="post_image">
				<Link to={`${ALL_POSTS_PATH}/${post.id}`}>
					<img src={`${API_BASE_URL}/${post.image}`} alt="post cover" />
				</Link>
			</div>
			<div className="post-info_container">
				{/* Banner */}
				{post.featured && (
					<div className="post-info_banner">
						<div className="post-info_banner-container">
							<div className="post-info_banner-element">Featured</div>
						</div>
					</div>
				)}
				<div className="post_title-container">
					<Link className="post_title" to={`${ALL_POSTS_PATH}/${post.id}`}>
						<h2>{post.title}</h2>
					</Link>
				</div>
				<p className="post_info">
					{/* TODO: profile page */}
					By{" "}
					<a href="" className="post_author">
						@{post.author.username}
					</a>
				</p>
				<p className="post_info">
					<time>Created on: {dateTimeFormatter(new Date(post.createdAt))}</time>
				</p>
				<div className="post_summary ">
					<p>{post.summary}</p>
				</div>
			</div>
		</div>
	);
}
