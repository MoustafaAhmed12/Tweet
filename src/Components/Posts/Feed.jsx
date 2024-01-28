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
        <Alert
          sx={{ width: "80%", margin: "2rem auto", fontSize: "1.2rem" }}
          variant="filled"
          severity="error"
        >
          <AlertTitle>No Posts Yet</AlertTitle>
          You can create post!
        </Alert>
      )}
    </>
  );
};

export default Feed;
