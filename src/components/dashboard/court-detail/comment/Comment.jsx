"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CommentList } from "./CommentList";
import PadelApi from "@/lib/services/api/padelAPI";
import { toast } from "sonner";
import { errorStyle, successStyle, warningStyle } from "@/lib/toster-styles";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";

export const Comment = ({ id, comments, fetch }) => {
  const { data } = useSession();

  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const onAddComment = async (e) => {
    e.preventDefault();

    if (!data)
      return toast.warning("Login first to add comment!", {
        style: warningStyle,
      });

    try {
      setCommentLoading(true);
      const response = await PadelApi.addComment({ id, comment });
      if (response?.success) {
        fetch();
        toast.success(response.message, { style: successStyle });
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error(error.message, { style: errorStyle });
    } finally {
      setCommentLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <form className="grid w-full gap-3" onSubmit={onAddComment}>
        <h3 className="font-semibold font-itim text-lg ">
          Comments{" "}
          <span className="bg-main-theme text-secondary-theme p-1 ml-1 text-sm">
            {comments?.length ?? "0"}
          </span>
        </h3>
        <Textarea
          id="textarea-comment"
          placeholder="Type your comment here."
          rows="5"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <Button
          variant="outline"
          className="bg-main-theme hover:bg-accent hover:text-main-theme dark:bg-input/30 dark:hover:bg-input/50 text-secondary-theme dark:text-constant dark:border cursor-pointer rounded-md py-1 transition-colors duration-300 ease-in-out"
          type="submit"
        >
          {commentLoading && <Spinner />}
          Add Comment
        </Button>
      </form>

      <CommentList courtId={id} comments={comments} fetch={fetch} />
    </div>
  );
};
