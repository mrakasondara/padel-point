import { CommentItem } from "./CommentItem";

export const CommentList = () => {
  return (
    <div className="flex flex-col gap-3">
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </div>
  );
};
