import { defer } from "react-router-dom";
import { GET_POST, GET_POSTS, GET_TIMELINE } from "./APIs";
// import { slow } from "./slow";

export const loaderPosts = async () => {
  return defer({ posts: GET_POSTS() });
};
export const loaderTimeline = async ({ params }) => {
  return defer({ timeline: GET_TIMELINE(params.userId) });
};

export const loaderPostById = async ({ params }) => {
  const post = await GET_POST(params.postId);
  return post;
};
