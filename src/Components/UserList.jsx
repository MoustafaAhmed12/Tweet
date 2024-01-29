import { Avatar, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../GlobalState/userSlice";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
const UserList = ({ user, username }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(
    currentUser.followings?.includes(user?._id)
  );

  const handleFollow = useCallback(async () => {
    setIsLoading(true);
    try {
      if (followed) {
        dispatch(
          unfollowUser({ userId: user._id, currentId: currentUser._id })
        );
        toast.success(`You Unfollow ${user.name} ${user.surname}`);
        setIsLoading(false);
      } else {
        dispatch(followUser({ userId: user._id, currentId: currentUser._id }));
        toast.success(`You Follow ${user.name} ${user.surname}`);
        setIsLoading(false);
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  }, [currentUser, dispatch, followed, user]);

  return (
    <>
      {currentUser.username !== user?.username ? (
        <div key={user._id} className="flex flex-col gap-6 mt-4">
          <div className="flex flex-row justify-between">
            <Link to={`/tweet/profile/${user?.username}`} className="flex">
              <Avatar
                src={user.profilePicture}
                sx={{ width: "40px", height: "40px" }}
              />
              <div className="flex flex-col ms-3">
                <span className="text-white font-semibold text-md">
                  {`${user?.name} ${user?.surname}`}
                </span>
                <span className="text-neutral-400 text-sm">
                  @{user.username}
                </span>
              </div>
            </Link>
            {!username ? (
              <button
                onClick={handleFollow}
                className={`${
                  followed
                    ? "bg-transparent text-white"
                    : "bg-white text-black border-black"
                } rounded-full font-semibold hover:opacity-80 transition border-[1px] bg-white text-black border-black text-sm px-4`}
              >
                {isLoading ? "Loading" : followed ? "Following" : "Follow"}
              </button>
            ) : null}
          </div>
          <Divider variant="middle" />
        </div>
      ) : null}
    </>
  );
};

export default UserList;
