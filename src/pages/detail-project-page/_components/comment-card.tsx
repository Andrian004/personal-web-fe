import { CustomAvatar } from "@/components/custom-avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ThumbsDown, ThumbsUp } from "lucide-react";

export function CommentCard() {
  return (
    <div className="flex gap-x-2">
      <CustomAvatar src="https://github.com/shadcn.png" fallback="A" />
      <div className="space-y-1">
        <h3 className="text-sm font-medium">Asep123</h3>
        <p className="text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id ipsum sit
          tempora maiores iure adipisci
        </p>
        <div className="flex items-center gap-x-1">
          <Button
            variant="ghost"
            size="roundXs"
            className="text-neutral-700 dark:text-neutral-300"
          >
            <ThumbsUp className="size-4 mr-2" /> 20
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
        <Button variant="ghost" size="roundSm" className="text-sky-500">
          <ChevronDown className="size-5 mr-2" />4 Replies
        </Button>
      </div>
    </div>
  );
}
