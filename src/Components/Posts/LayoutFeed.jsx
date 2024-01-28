// import AddPost from "./AddPost";
import Feed from "./Feed";
import Header from "../Header";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import CreatePost from "./CreatePost";
import { Await, useLoaderData } from "react-router-dom";

const LayoutFeed = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { posts } = useLoaderData();
  // RTK Query

  const filterPosts = () => {
    const postsCurrentUser = posts?.filter(
      (post) => post.userId._id === currentUser._id
    );
    const usersPosts = posts.filter((post) =>
      currentUser.followings?.includes(post.userId._id)
    );
    const timelinePosts = [...postsCurrentUser, ...usersPosts];
    return timelinePosts.sort(
      (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
    );
  };

  const timeline = filterPosts();

  useEffect(() => {
    document.title = "Twitter | Home";
  }, []);

  return (
    <>
      <Header label="Home" />
      <CreatePost />

      <Suspense
        fallback={
          <div className="text-center mt-20 text-sky-700">
            <ClipLoader color="#1D9BF0" size={50} />
          </div>
        }
      >
        <Await resolve={timeline}>{(posts) => <Feed posts={posts} />}</Await>
      </Suspense>
    </>
  );
};

export default LayoutFeed;
