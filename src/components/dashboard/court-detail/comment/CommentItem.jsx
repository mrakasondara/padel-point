import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export const CommentItem = () => {
  return (
    <div className="flex flex-col  p-3 border-b-2">
      <div className="flex gap-3 text-[14px] items-center">
        <Avatar size="md">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
        <h6 className="font-semibold text-main-theme">
          Jane Doe <span className="ml-2">•</span>
        </h6>
        <span className="text-slate-400 text-[11px]">53 Min ago</span>
      </div>
      <p className="text-[14px] mt-3 dark:text-white/60 ">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam,
        esse, enim consectetur est consequuntur qui eius, accusamus odio
        consequatur dolorem dolorum sunt doloremque temporibus vel alias fugit
        facilis culpa cum quas ex. Quasi consequatur eligendi dolores nobis
        dicta suscipit dolorem.
      </p>
      <div className="flex mt-2 gap-2">
        <div className="flex gap-2 border-r-2 pr-5 border-secondary">
          <Badge
            variant="outline"
            className="cursor-pointer bg-main-theme dark:bg-white/60 text-white"
          >
            <ThumbsUp size="14" />1
          </Badge>
          <Badge
            variant="outline"
            className="cursor-pointer bg-transparent text-main-theme"
          >
            <ThumbsDown size="14" />1
          </Badge>
        </div>
      </div>
    </div>
  );
};
