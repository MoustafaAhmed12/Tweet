import { useState } from "react";
import { Avatar, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Form, Link } from "react-router-dom";
const CreatePost = () => {
  const { currentUser } = useSelector((state) => state.user);

  // Post
  const [post, setPost] = useState({
    desc: "",
    userId: "",
  });

  //RTK

  return (
    <div className="border-neutral-800 px-5 py-2">
      <div className="flex flex-row gap-4">
        <div className="mt-2">
          <Link to={`/tweet/profile/${currentUser.username}`}>
            <Avatar
              src={currentUser.profilePicture}
              alt="Img Profile"
              sx={{ width: "35px", height: "35px" }}
            />
          </Link>
        </div>
        <Form
          className="w-full"
          method="POST"
          action={`/tweet/${currentUser._id}`}
        >
          <input
            type="text"
            name="userId"
            defaultValue={currentUser._id}
            className="hidden"
          />
          <TextField
            name="decs"
            onChange={(e) => {
              setPost({ desc: e.target.value });
            }}
            value={post.desc}
            id="outlined-multiline-flexible"
            placeholder={`What is happening?!`}
            variant="standard"
            multiline
            fullWidth
            minRows={2}
            maxRows={5}
            margin="dense"
          />

          <div className="my-3 flex flex-row justify-end">
            <button
              disabled={!post.desc}
              className=" disabled:opacity-70 disabled:cursor-not-allowed rounded-lg font-bold hover:opacity-80 transition border-[1px] w-fit bg-[#177BBE] text-white border-sky-500 text-md text-md px-3 py-1"
              onClick={() => (post.desc = "")}
            >
              Tweet
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreatePost;
