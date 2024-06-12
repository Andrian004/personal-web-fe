import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThumbsDown, ThumbsUp } from "lucide-react";

interface CommentContentProps {
  username: string;
  message: string;
  totalLikes: number;
  showReplyForm?: () => void;
}

export function CommentContent({
  username,
  message,
  totalLikes,
  showReplyForm,
}: CommentContentProps) {
  return (
    <>
      <h3 className="text-sm font-semibold">{username}</h3>
      <p className="text-neutral-900 dark:text-neutral-200 ">{message}</p>
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
        <Button variant="ghost" size="roundXs" onClick={showReplyForm}>
          Reply
        </Button>
      </div>
    </>
  );
}
