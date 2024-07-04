import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Comment } from "@/interfaces/comment-interface";
import { AdditionalLikeComment } from "@/types";
import { deleteApi, postApi } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { relativeTime } from "@/lib/relative-time";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";

interface CommentContentProps {
  commentData: Comment;
  showReplyForm?: () => void;
}

export function CommentContent({
  commentData,
  showReplyForm,
}: CommentContentProps) {
  const { token, user, refreshToken } = useAuth();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState<boolean>(commentData.liked);
  const [totalLike, setTotalLike] = useState<number>(commentData.totalLikes);

  const likeMutation = useMutation({
    mutationFn: (formData: AdditionalLikeComment) =>
      postApi("/like/comment", formData, token),
    onSuccess: () => {
      setIsLiked(true);
      setTotalLike((prev) => prev + 1);
    },
    onError: (error) => {
      if (error.message === "jwt expired") refreshToken();
      toast.error("Something went wrong");
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: (formData: AdditionalLikeComment) =>
      deleteApi("/like/comment", token, formData),
    onSuccess: () => {
      setIsLiked(false);
      setTotalLike((prev) => prev - 1);
    },
    onError: (error) => {
      if (error.message === "jwt expired") refreshToken();
      toast.error("Something went wrong");
    },
  });

  const handleCommentLike = () => {
    if (!token) return navigate("/account");
    if (!commentData._id || !user) return;

    if (!isLiked) {
      return likeMutation.mutate({ cid: commentData._id, uid: user._id });
    }
    return unlikeMutation.mutate({ cid: commentData._id, uid: user._id });
  };

  return (
    <>
      <h3 className="text-sm font-bold">
        {commentData.sender.username}{" "}
        <span className="text-xs font-light text-neutral-700 dark:text-neutral-300 ml-2">
          {relativeTime(commentData.createdAt)}
        </span>
      </h3>
      <p className="text-neutral-900 dark:text-neutral-200 ">
        {commentData.message}
      </p>
      <div className="flex items-center gap-x-1">
        <Button
          variant="ghost"
          size="roundXs"
          className="text-neutral-700 dark:text-neutral-300"
          onClick={handleCommentLike}
          disabled={likeMutation.isPending || unlikeMutation.isPending}
        >
          <ThumbsUp
            className={cn(
              "size-4 mr-2",
              isLiked && "fill-blue-600 text-transparent"
            )}
          />{" "}
          {totalLike}
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
