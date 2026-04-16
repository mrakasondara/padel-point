import { CommentItem } from "./CommentItem";

export const CommentList = ({ comments }) => {
  console.log(comments);
  return (
    <div className="flex flex-col gap-3">
      {comments.length &&
        comments.map((comment, index) => {
          return <CommentItem {...comment} key={index} />;
        })}
    </div>
  );
};
