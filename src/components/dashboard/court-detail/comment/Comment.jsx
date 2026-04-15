import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CommentList } from "./CommentList";

export const Comment = ({ reviews }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid w-full gap-3">
        <h3 className="font-semibold font-itim text-lg ">
          Comments{" "}
          <span className="bg-main-theme text-secondary-theme p-1 ml-1 text-sm">
            {reviews?.length ?? "0"}
          </span>
        </h3>
        <Textarea
          id="textarea-comment"
          placeholder="Type your comment here."
          rows="5"
        />
        <Button
          variant="outline"
          className="bg-main-theme hover:bg-accent hover:text-main-theme dark:bg-input/30 dark:hover:bg-input/50 text-secondary-theme dark:text-constant dark:border cursor-pointer rounded-md py-1 transition-colors duration-300 ease-in-out"
        >
          Add Comment
        </Button>
      </div>

      <CommentList />
    </div>
  );
};
