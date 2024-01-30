import Feed from "../Components/Posts/Feed";
import Header from "../Components/Header";
import CreatePost from "../Components/Posts/CreatePost";
import { Suspense, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { Await, useLoaderData } from "react-router-dom";

const Home = () => {
  const { timeline } = useLoaderData();
  useEffect(() => {
    document.title = "Tweet / Home";
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
        <Await resolve={timeline}>
          {(posts) => {
            const timeline = posts.sort(
              (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
            );
            return <Feed posts={timeline} />;
          }}
        </Await>
      </Suspense>
    </>
  );
};

export default Home;
