import { Avatar, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../GlobalState/userSlice";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
const UserList = ({ user, username }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(
    currentUser.followings?.includes(user?._id)
  );

  const handleUnfollow = useCallback(async () => {
    try {
      if (followed) {
        dispatch(
          unfollowUser({ userId: user._id, currentId: currentUser._id })
        );
        toast.success(`You Unfollow ${user.name} ${user.surname}`);
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error.message);
    }
  }, [currentUser, dispatch, followed, user]);

  const handleFollow = useCallback(async () => {
    try {
      if (!followed) {
        dispatch(followUser({ userId: user._id, currentId: currentUser._id }));
        toast.success(`You Follow ${user.name} ${user.surname}`);
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error.message);
    }
  }, [currentUser, dispatch, followed, user]);

  return (
    <>
      {currentUser.username !== user?.username ? (
        <ul key={user._id} className="flex flex-col gap-5 mt-4">
          <li className="flex justify-between">
            <Link
              to={`/tweet/profile/${user?.username}`}
              className="flex min-w-0 gap-x-4"
            >
              <Avatar
                src={user.profilePicture}
                className="h-14 w-14 flex-none rounded-full bg-gray-50"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-md font-semibold leading-6 text-gray-100">
                  {`${user?.name} ${user?.surname}`}
                </p>
                <p className="truncate text-sm leading-5 text-gray-500">
                  @{user.username}
                </p>
              </div>
            </Link>
            {!username ? (
              <button
                onClick={handleFollow}
                className={`bg-transparent text-sky-700 py-1 text-sm font-medium rounded-full hover:text-sky-600 transition ${
                  followed ? "text-white" : ""
                }`}
              >
                {followed ? "Loading" : "Follow"}
              </button>
            ) : (
              <button
                onClick={handleUnfollow}
                className={`bg-transparent text-red-700 py-1 text-sm font-medium rounded-full hover:text-red-600 transition ${
                  !followed ? "text-white" : ""
                }`}
              >
                {!followed ? "Loading" : "unFollow"}
              </button>
            )}
          </li>
          <Divider variant="middle" />
        </ul>
      ) : null}
    </>
  );
};

export default UserList;
