import { Alert, AlertTitle } from "@mui/material";
import PostUser from "./PostsUser";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

const FeedUserPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const user = useLoaderData();
  return (
    <>
      {user.posts.length > 0 ? (
        user.posts
          .sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
          .map((post) => (
            <PostUser
              key={post._id}
              post={post}
              currentUser={currentUser}
              user={user}
            />
          ))
      ) : (
        <Alert Alert severity="warning" className="w-[80%] my-8 mx-auto">
          <AlertTitle>No Posts Yet</AlertTitle>
          {user.name} {user.surname} does not has posts
        </Alert>
      )}
    </>
  );
};

export default FeedUserPost;
