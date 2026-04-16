"use client";
import "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const CommentItem = ({
  fullName,
  createdAt,
  comment,
  liked,
  disliked,
}) => {
  const timeAgo = new TimeAgo("en");

  return (
    <div className="flex flex-col p-3 border-b-2">
      <div className="flex gap-3 text-[14px] items-center">
        <Avatar size="md">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
        <h6 className="font-semibold text-main-theme">
          {fullName} <span className="ml-2">•</span>
        </h6>
        <span className="text-slate-400 text-[11px]">
          {timeAgo.format(new Date(createdAt), "twitter")}
        </span>
      </div>
      <p className="text-[14px] mt-3 dark:text-white/60 ">{comment}</p>
      <div className="flex mt-2 gap-2">
        <div className="flex gap-2 pr-5 border-secondary">
          <Badge
            variant="outline"
            className={`cursor-pointer ${
              liked
                ? "bg-main-theme text-white dark:bg-white/60 font-semibold"
                : ""
            }  `}
          >
            <ThumbsUp size="14" />
            {liked ?? 0}
          </Badge>
          <Badge
            variant="outline"
            className={`cursor-pointer ${
              liked
                ? "bg-red-600 text-white dark:bg-white/60 font-semibold"
                : ""
            }  `}
          >
            <ThumbsDown size="14" />
            {disliked ?? 0}
          </Badge>
        </div>
      </div>
    </div>
  );
};
