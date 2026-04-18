import { CommentItem } from "./CommentItem";

export const CommentList = ({ courtId, comments, fetch }) => {
  return (
    <div className="flex flex-col gap-3">
      {comments.length >= 1 &&
        comments.map((comment, index) => {
          return (
            <CommentItem
              courtId={courtId}
              {...comment}
              fetch={fetch}
              key={index}
            />
          );
        })}
    </div>
  );
};
