import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Header from "./../Components/Header";
import Post from "../Components/Posts/Post";
import { useSelector } from "react-redux";
import CreateComment from "../Components/Comments/CreateComment";
import CommentFeed from "../Components/Comments/CommentFeed";
import { ClipLoader } from "react-spinners";
import { axiosInstance } from "../Utils/config";

const PostDetails = () => {
  const { currentUser } = useSelector((state) => state.user);
  const post = useLoaderData();

  // console.log(post.comments);

  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [dep, setDep] = useState(0);

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);
      await axiosInstance
        .get(`/comment/${post._id}`)
        .then(({ data }) => {
          setComments(() => {
            return data.sort(
              (c1, c2) => new Date(c2.createdAt) - new Date(c1.createdAt)
            );
          });
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    };
    getComments();
  }, [post, dep]);

  // console.log(comments);

  return (
    <>
      <Header label="Tweet" />
      <Post post={post} currentUser={currentUser} />
      <CreateComment
        currentUser={currentUser}
        postCom={post}
        setDep={setDep}
        dep={dep}
      />
      {isLoading ? (
        <div className="text-center mt-10">
          <ClipLoader color="lightblue" size={30} />
        </div>
      ) : (
        <CommentFeed comments={comments} />
      )}
    </>
  );
};

export default PostDetails;
