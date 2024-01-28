import { useState } from "react";
import { Avatar, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../Utils/config";
import toast from "react-hot-toast";

const CreateComment = ({ postCom, setDep, dep }) => {
  const { currentUser } = useSelector((state) => state.user);
  // Comment
  const [createCom, setCreateComment] = useState({
    userId: "",
    postId: "",
    comment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      ...createCom,
      userId: currentUser._id,
      postId: postCom._id,
    };
    try {
      const { data } = await axiosInstance.post("/comment", newComment);
      await axiosInstance.patch(`/post/${data.postId}/comment`, {
        commentId: data._id,
      });
      setCreateComment({ comment: "" });
      setDep(dep + 1);
      toast.success("Created Your Comment");
    } catch (error) {
      console.log(error);
      setCreateComment({ comment: "" });
    }
  };

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      <div className="flex flex-row gap-4">
        <div className="mt-2">
          <Link to={`/tiwtter/profile/${currentUser.username}`}>
            <Avatar
              src={currentUser.profilePicture}
              alt="Img Profile"
              sx={{ width: "35px", height: "35px" }}
            />
          </Link>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <TextField
            name="createCom.comment"
            onChange={(e) => {
              setCreateComment({ comment: e.target.value });
            }}
            value={createCom.comment}
            id="outlined-multiline-flexible"
            placeholder={`Tweet your reply ${currentUser.username}?`}
            variant="standard"
            multiline
            fullWidth
            minRows={2}
            maxRows={5}
            margin="dense"
          />

          <div className="my-2 flex flex-row justify-end">
            <button
              disabled={!createCom.comment}
              className=" disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        font-semibold
        hover:opacity-80
        transition
        border-[1px]
        w-fit
        bg-sky-500
        text-white
        border-sky-500
        text-md
        text-md
        px-3
        py-1
        "
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
