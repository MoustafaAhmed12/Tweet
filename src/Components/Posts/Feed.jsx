import Post from "./Post";
import { useSelector } from "react-redux";
import { Alert, AlertTitle } from "@mui/material";
const Feed = ({ posts }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post._id} post={post} currentUser={currentUser} />
        ))
      ) : (
        <Alert severity="warning" className="w-[80%] my-8 mx-auto">
          <AlertTitle>No Posts Yet</AlertTitle>
          You can create post or follow people
        </Alert>
      )}
    </>
  );
};

export default Feed;
