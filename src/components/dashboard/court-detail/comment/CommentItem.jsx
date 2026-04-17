"use client";
import "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import PadelApi from "@/lib/services/api/padelAPI";
import { toast } from "sonner";
import { errorStyle, successStyle } from "@/lib/toster-styles";

export const CommentItem = ({
  courtId,
  fullName,
  createdAt,
  comment,
  likes,
  dislikes,
  email,
  _id,
  fetch,
}) => {
  const timeAgo = new TimeAgo("en");
  const { data } = useSession();
  let sessionEmail = data?.user.email;

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [dislikeLoading, setDislikeLoading] = useState(false);

  const onDeleteComment = async () => {
    try {
      setDeleteLoading(true);
      const response = await PadelApi.deleteComment({
        courtId,
        commentId: _id,
      });
      if (response?.success) {
        toast.success(response.message, { style: successStyle });
        fetch();
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error(error.message, { style: errorStyle });
    } finally {
      setDeleteLoading(false);
    }
  };

  const onLikeComment = async () => {
    try {
      setLikeLoading(true);
      const response = await PadelApi.likeComment({
        courtId,
        commentId: _id,
      });
      if (response?.success) {
        fetch();
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error(error.message, { style: errorStyle });
    } finally {
      setLikeLoading(false);
    }
  };

  const onDislikeComment = async () => {
    try {
      setDislikeLoading(true);
      const response = await PadelApi.dislikeComment({
        courtId,
        commentId: _id,
      });
      if (response?.success) {
        fetch();
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error(error.message, { style: errorStyle });
    } finally {
      setDislikeLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-3 border-b-2">
      <div className="flex gap-3 text-[14px] items-center">
        <Avatar size="md">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>

        <h6 className="font-semibold text-main-theme">
          {fullName || email} <span className="ml-2">•</span>
        </h6>

        <span className="text-slate-400 text-[11px]">
          {timeAgo.format(new Date(createdAt), "twitter")}
        </span>

        {sessionEmail === email && (
          <Button
            variant="outline"
            size="xs"
            className="ml-auto hover:bg-red-500/90 text-red-500/90 dark:hover:text-constant cursor-pointer transition ease-in-out hover:text-constant font-poppins text-[12px]"
            onClick={onDeleteComment}
          >
            {deleteLoading ? <Spinner /> : "Delete Comment"}
          </Button>
        )}
      </div>
      <p className="text-[14px] mt-3 dark:text-white/60 ">{comment}</p>
      <div className="flex mt-2 gap-2">
        <div className="flex gap-2 pr-5 border-secondary">
          <Badge
            variant="outline"
            className={`cursor-pointer ${
              likes.filter((like) => like.email == sessionEmail).length
                ? "bg-main-theme text-white dark:bg-white/60 font-semibold"
                : ""
            }  `}
            onClick={onLikeComment}
          >
            {likeLoading ? <Spinner /> : <ThumbsUp size="14" />}

            {likes.length ?? 0}
          </Badge>
          <Badge
            variant="outline"
            className={`cursor-pointer ${
              dislikes.filter((dislike) => dislike.email == sessionEmail).length
                ? "bg-red-600 text-white dark:bg-white/60 font-semibold"
                : ""
            }  `}
            onClick={onDislikeComment}
          >
            {dislikeLoading ? <Spinner /> : <ThumbsDown size="14" />}
            {dislikes.length ?? 0}
          </Badge>
        </div>
      </div>
    </div>
  );
};
