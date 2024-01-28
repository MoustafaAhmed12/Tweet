import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const CommentItem = ({ data }) => {
  const navigate = useNavigate();

  const goToUser = () => {
    navigate(`/tiwtter/profile/${username}`);
  };
  dayjs.extend(relativeTime);

  const { comment, createdAt } = data;
  const { name, surname, username, profilePicture } = data.userId;
  return (
    <div
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar src={profilePicture} alt="Img Profile" onClick={goToUser} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            "
            >
              {name} {surname}
            </p>
            <span
              onClick={goToUser}
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
            >
              @{username}
            </span>
            <span className="text-neutral-500 text-sm">
              {dayjs(createdAt).fromNow()}
            </span>
          </div>
          <div className="text-white mt-1">{comment}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
