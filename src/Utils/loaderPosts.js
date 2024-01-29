import { defer } from "react-router-dom";
import { GET_POST, GET_POSTS, GET_TIMELINE } from "./APIs";
// import { slow } from "./slow";

export const loaderPost = async () => {
  // await slow(Math.random() * 6000 + 5000);

  // const postsData = await GET_POSTS();

  return defer({ posts: GET_POSTS() });
};
export const loaderTimeline = async ({ params }) => {
  // await slow(Math.random() * 6000 + 5000);

  // const postsData = await GET_TIMELINE(params.userId);

  return defer({ timeline: GET_TIMELINE(params.userId) });
};

export const loaderPostById = async ({ params }) => {
  const post = await GET_POST(params.postId);
  return post;
};
