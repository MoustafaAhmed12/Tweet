import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../Utils/config";
import { useNavigate } from "react-router-dom";

import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";

import { AiOutlineMessage } from "react-icons/ai";
import PostAction from "../Posts/PostAction";

const PostUser = ({ post, currentUser, user }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes?.includes(currentUser._id));
  const navigate = useNavigate();

  useEffect(() => {
    setIsLiked(post.likes?.includes(currentUser._id));
  }, [post.userId, currentUser._id, post.likes]);

  const likeHandler = () => {
    try {
      axiosInstance.put(`/post/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);

    setIsLiked(!isLiked);
  };
  const { desc, createdAt } = post;
  const { name, surname, username, profilePicture } = user;

  const goToPost = () => {
    navigate(`/tweet/post/${post._id}`);
  };

  dayjs.extend(relativeTime);

  return (
    <>
      <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
        <div className="flex flex-row items-start gap-3">
          <Avatar src={profilePicture} alt="Img Profile" />
          <div>
            <div className="flex flex-row items-center gap-2 relative">
              <p className="text-white max-sm:text-sm font-semibold cursor-pointer hover:underline">
                {name} {surname}
              </p>
              <span className=" text-neutral-500 cursor-pointer hover:underline hidden md:block">
                @{username}
              </span>
              <span className="text-neutral-500 text-sm">
                {dayjs(createdAt).fromNow().slice(0, 3)}
              </span>

              <PostAction post={post} currentUser={currentUser} />
            </div>
            <div onClick={goToPost} className="text-white mt-1 max-sm:text-xs">
              {desc}
            </div>
            <div className="flex flex-row items-center mt-3 gap-10">
              <div
                onClick={likeHandler}
                className="flex flex-row items-center gap-2 cursor-pointer transition hover:text-[#D2156D]"
              >
                {isLiked ? (
                  <FaHeart className="text-[#D2156D]" size={20} />
                ) : (
                  <BiHeart
                    className="text-[#555] hover:text-[#D2156D]"
                    size={22}
                  />
                )}
                <p>{like || 0}</p>
              </div>
              <div
                onClick={goToPost}
                className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500"
              >
                <AiOutlineMessage size={20} />
                <p>{post.comments?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostUser;
