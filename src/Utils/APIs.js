import { axiosInstance } from "./config";
import { slow } from "./slow";
export const GET_POSTS = async () => {
  slow(Math.random() * 6000 + 500);
  const { data } = await axiosInstance.get("/posts");
  return data;
};

export const GET_POST = async (postId) => {
  const { data } = await axiosInstance.get(`/post/${postId}`);
  return data;
};

export const Edit_Profile = async (newData) => {
  if (
    newData.name.trim().length < 3 ||
    newData.surname.trim().length < 3 ||
    newData.bio.trim().length < 2
  ) {
    throw { message: "Must Length More then 3", status: 401 };
  }
  const res = await axiosInstance.patch(`/user/${newData.userId}`, newData);
  if (!res.ok) {
    throw { message: "Could not update profile", status: 500 };
  }
};
