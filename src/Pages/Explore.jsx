import Header from "../Components/Header";
import Feed from "../Components/Posts/Feed";
import { Suspense, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { Await, useLoaderData } from "react-router-dom";

const Explore = () => {
  const { posts } = useLoaderData();
  useEffect(() => {
    document.title = "Twitter | Explore";
  }, []);

  return (
    <>
      <Header label="Explore" />
      <Suspense
        fallback={
          <div className="text-center mt-20 text-sky-700">
            <ClipLoader color="#1D9BF0" size={50} />
          </div>
        }
      >
        <Await resolve={posts}>{(posts) => <Feed posts={posts} />}</Await>
      </Suspense>
    </>
  );
};

export default Explore;
