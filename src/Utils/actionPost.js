import { redirect } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "./config";

export const PostActions = async ({ request }) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      let post = {
        desc: formData.get("decs"),
        userId: formData.get("userId"),
      };
      const loadingToastId = toast.loading("Processing...");

      try {
        const { data } = await axiosInstance.post("/post", post);
        toast.dismiss(loadingToastId);
        toast.success("Created Your Post");

        const updatePosts = { userId: post.userId, postId: data._id };
        await axiosInstance.patch(`/user/${post.userId}/posts`, updatePosts);
      } catch (error) {
        console.log(error);
      }
      return redirect(`/tweet/${post.userId}`);
    }
    case "DELETE": {
      const formData = await request.formData();
      let post = {
        postId: formData.get("postId"),
      };
      const userId = formData.get("userId");
      const loadingToastId = toast.loading("Processing...");
      try {
        await axiosInstance.delete(`/post/${post.postId}`);
        toast.dismiss(loadingToastId);
        toast.success("Deleted Your Post");
      } catch (error) {
        console.log(error);
      }
      return redirect(`/tweet/${userId}`);
    }
    case "PATCH": {
      const formData = await request.formData();
      let post = {
        userId: formData.get("userId"),
        desc: formData.get("desc"),
      };
      let postId = formData.get("postId");
      const loadingToastId = toast.loading("Processing...");
      try {
        await axiosInstance.patch(`/post/${postId}`, post);

        toast.dismiss(loadingToastId);
        toast.success("The post has been updated");
      } catch (err) {
        toast.dismiss(loadingToastId);
        toast.error(err.response.data.msg);
      }
      return redirect(`/tweet/${post.userId}`);
    }
  }
};
