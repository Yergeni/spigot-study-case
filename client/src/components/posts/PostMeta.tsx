import { HeartIcon } from "@heroicons/react/24/outline";

import "./PostMeta.css";

// Component just for ilustration purposes
export default function PostMeta() {
	return (
		<>
			<div className="post-meta_divider" />
			<div className="post-meta_flex-container">
				<div className="post-meta_flex-container post-meta_flex-container-gap">
					<p>0 view</p>
					<p>0 comments</p>
				</div>
				<div className="post-meta_flex-container" style={{ gap: ".3rem" }}>
					<span style={{ fontSize: "1.25rem" }}>0</span>
					<HeartIcon style={{ width: 24, height: 24, color: "magenta" }} />
				</div>
			</div>
			<div className="post-meta_divider" />
		</>
	);
}
