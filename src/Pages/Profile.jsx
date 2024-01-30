import Header from "./../Components/Header";
import UserHero from "./../Components/Profile/UserHero";
import UserBio from "./../Components/Profile/UserBio";
import { useLoaderData, useParams } from "react-router-dom";
import FeedUserPost from "../Components/Profile/FeedUserPost";
import { useEffect } from "react";
const User = () => {
  const { username } = useParams();
  const user = useLoaderData();
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
      <UserBio user={user} />
      <FeedUserPost />
    </>
  );
};

export default User;
