import { IPost } from "./post.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertToPost = (rawPost: any) => {
  return {
    id: rawPost._id,
    title: rawPost.title,
    summary: rawPost.summary,
    description: rawPost.description,
    image: rawPost.image,
    featured: rawPost.featured,
    createdAt: rawPost.createdAt,
    updatedAt: rawPost.updatedAt,
    author: {
      id: rawPost.author._id,
      username: rawPost.author.username,
      role: rawPost.author.role,
    },
  } as IPost;
}