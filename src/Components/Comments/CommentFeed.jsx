import CommentItem from "./CommentItem.JSX";

const CommentFeed = ({ comments }) => {
  console.log(comments);
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment._id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
