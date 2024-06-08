import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getApi } from "@/lib/fetcher";
import { cn } from "@/lib/utils";

import { CustomAvatar } from "@/components/custom-avatar";
import { Button } from "@/components/ui/button";
import { CommentContent } from "./comment-content";
import { SuccessResponse } from "@/interfaces/api-interface";
import { Comment } from "@/interfaces/comment-interface";
import { Loader } from "@/components/loader";
import { ConnectionsError } from "@/components/error/connections-error";

interface CommentCardProps {
  commentId: string;
  projectId: string;
  username: string;
  message: string;
  avatarSrc?: string;
  totalLikes: number;
  hasReply: boolean;
}

export function CommentCard({
  commentId,
  projectId,
  username,
  message,
  avatarSrc = "",
  totalLikes,
  hasReply,
}: CommentCardProps) {
  const [openReplies, setOpenReplies] = useState(false);

  const {
    data,
    isLoading,
    error,
    refetch,
  }: UseQueryResult<SuccessResponse<Comment[]>> = useQuery({
    queryKey: ["child-reply", projectId, commentId],
    queryFn: () => getApi(`/comment/${projectId}/${commentId}`),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const getReplies = () => {
    setOpenReplies((openReplies) => !openReplies);
    refetch();
  };

  return (
    <div className="flex gap-x-2">
      <CustomAvatar src={avatarSrc} fallback={username.charAt(0)} />
      <div className="space-y-1">
        <CommentContent
          username={username}
          message={message}
          totalLikes={totalLikes}
        />
        {hasReply && (
          <Button
            variant="ghost"
            size="roundSm"
            className="text-sky-500"
            onClick={getReplies}
          >
            <ChevronDown
              className={cn(
                "size-5 mr-2 duration-300",
                openReplies && "-rotate-180"
              )}
            />
            {openReplies ? "Hide replies" : "Show replies"}
          </Button>
        )}
        {openReplies ? (
          isLoading ? (
            <Loader className="min-h-max p-4" childStyle="size-6" />
          ) : error ? (
            <ConnectionsError />
          ) : (
            data?.body.map((reply) => (
              <div key={reply._id} className="flex gap-x-2">
                <CustomAvatar
                  src=""
                  fallback={reply.sender.username.charAt(0)}
                  className="size-8"
                />
                <div className="space-y-1">
                  <CommentContent
                    username={reply.sender.username}
                    message={reply.message}
                    totalLikes={reply.totalLikes}
                  />
                </div>
              </div>
            ))
          )
        ) : null}
      </div>
    </div>
  );
}
