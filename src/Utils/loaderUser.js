import { redirect } from "react-router-dom";
import { axiosInstance } from "./config";
// import { Edit_Profile } from "./APIs";
import toast from "react-hot-toast";

export const loaderUser = async ({ params }) => {
  const { data: user } = await axiosInstance.get(
    `/user?username=${params.username}`
  );
  return user;
};

export const editUser = async ({ params, request }) => {
  const formData = await request.formData();
  const newData = {
    userId: formData.get("userId"),
    name: formData.get("name"),
    surname: formData.get("surname"),
    bio: formData.get("bio"),
  };
  const loadingToastId = toast.loading("Processing...");
  try {
    await axiosInstance.patch(`/user/${newData.userId}`, newData);
    toast.dismiss(loadingToastId);
    toast.success("The Profile has been updated");
  } catch (err) {
    toast.dismiss(loadingToastId);
    toast.error(err.response.data.msg);
  }
  return redirect(`/tiwtter/profile/${params.username}`);
};
