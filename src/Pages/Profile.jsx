import Header from "./../Components/Header";
import UserHero from "./../Components/Profile/UserHero";
import UserBio from "./../Components/Profile/UserBio";
import { useLoaderData, useParams } from "react-router-dom";
import FeedUserPost from "../Components/Profile/FeedUserPost";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../GlobalState/userSlice";
import toast from "react-hot-toast";

const User = () => {
  const { username } = useParams();
  const user = useLoaderData();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(
    currentUser.followings?.includes(user?._id)
  );

  const handleFollow = useCallback(async () => {
    try {
      if (followed) {
        dispatch(
          unfollowUser({ userId: user._id, currentId: currentUser._id })
        );
        toast.success(`You Unfollow ${user.name} ${user.surname}`);
      } else {
        dispatch(followUser({ userId: user._id, currentId: currentUser._id }));
        toast.success(`You Follow ${user.name} ${user.surname}`);
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  }, [currentUser, dispatch, followed, user]);

  useEffect(() => {
    document.title = `Tweet / Profile | ${username}`;
  }, [username]);
  return (
    <>
      <Header
        showBackArrow
        label={`${user?.name} ${user?.surname}`}
        postsLength={user.posts.length}
      />
      <UserHero user={user} />
      <UserBio user={user} handleFollow={handleFollow} followed={followed} />
      <FeedUserPost />
    </>
  );
};

export default User;
