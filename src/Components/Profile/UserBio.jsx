import { BiCalendar } from "react-icons/bi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";
import { useState } from "react";
import EditProfile from "./../EditProfile";

const UserBio = ({ user, handleFollow, followed }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  console.log(followed);

  console.log(user._id);
  console.log(currentUser.followings);

  dayjs.extend(relativeTime);
  return (
    <>
      <EditProfile open={open} setOpen={setOpen} currentUser={currentUser} />
      <div className="border-b-[1px] border-neutral-800 pb-4">
        <div className="flex justify-end p-2">
          {currentUser?._id === user._id ? (
            <button
              className=" disabled:opacity-70
              max-sm:text-sm
        disabled:cursor-not-allowed
        rounded-full
        font-bold
        hover:opacity-80
        transition
        border-[1px]
        w-fit
        bg-transparent
        text-white
        border-white
        text-md
        px-5
        py-2
        mt-1
        mr-2
        hover:bg-white hover:text-black hover:border-black
        "
              onClick={handleClickOpen}
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition border-[.5px] w-fit ${
                followed
                  ? "bg-transparent text-white"
                  : "bg-white text-black border-black"
              }  text-md px-5 py-2 mr-2 mt-1 max-sm:text-sm`}
            >
              {followed ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div className="mt-8 px-4">
          <div className="flex flex-col">
            <p className="text-white text-2xl font-semibold">{`${user?.name} ${user?.surname}`}</p>
            <p className="text-md text-neutral-500">@{user?.username}</p>
          </div>
          <div className="flex flex-col mt-4">
            <p className="text-white">{user?.bio}</p>
            <div
              className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          "
            >
              <BiCalendar size={24} />
              <p>Joined {dayjs(user.createdAt).fromNow()}</p>
            </div>
          </div>
          <div className="flex flex-row items-center mt-4 gap-6">
            <div className="flex flex-row items-center gap-1">
              <p className="text-white">{user?.followings?.length}</p>
              <p className="text-sky-700">Followings</p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <p className="text-white">{user?.followers?.length || 0}</p>
              <p className="text-sky-700">Followers</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBio;
