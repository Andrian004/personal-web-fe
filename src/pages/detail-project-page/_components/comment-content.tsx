import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThumbsDown, ThumbsUp } from "lucide-react";

interface CommentContentProps {
  username: string;
  message: string;
  totalLikes: number;
}

export function CommentContent({
  username,
  message,
  totalLikes,
}: CommentContentProps) {
  return (
    <>
      <h3 className="text-md font-semibold">{username}</h3>
      <p className="text-sm text-neutral-700 dark:text-neutral-200 ">
        {message}
      </p>
      <div className="flex items-center gap-x-1">
        <Button
          variant="ghost"
          size="roundXs"
          className="text-neutral-700 dark:text-neutral-300"
        >
          <ThumbsUp className="size-4 mr-2" /> {totalLikes}
        </Button>
        <Separator orientation="vertical" className="h-4 bg-neutral-500" />
        <Button
          variant="ghost"
          size="roundXs"
          className="text-neutral-700 dark:text-neutral-300"
        >
          <ThumbsDown className="size-4 mr-2" />
        </Button>
        <Separator orientation="vertical" className="h-4 bg-neutral-500" />
        <Button variant="ghost" size="roundXs">
          Reply
        </Button>
      </div>
    </>
  );
}
