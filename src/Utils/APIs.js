import { axiosInstance } from "./config";
// import { slow } from "./slow";
export const GET_POSTS = async () => {
  // slow(Math.random() * 6000 + 500);

  try {
    const { data } = await axiosInstance.get("/posts");
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const GET_TIMELINE = async (userId) => {
  try {
    const { data } = await axiosInstance.get(`/posts/timeline/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GET_POST = async (postId) => {
  try {
    const { data } = await axiosInstance.get(`/post/${postId}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GET_USER = async (username) => {
  try {
    const { data } = await axiosInstance.get(`/user?username=${username}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
