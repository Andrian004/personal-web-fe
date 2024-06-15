import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getApi } from "@/lib/fetcher";
import { cn } from "@/lib/utils";

import { CustomAvatar } from "@/components/custom-avatar";
import { Button } from "@/components/ui/button";
import { CommentContent } from "./comment-content";
import { ReplyForm } from "./reply-form";
import { SuccessResponse } from "@/interfaces/api-interface";
import { Comment } from "@/interfaces/comment-interface";
import { Loader } from "@/components/loader";
import { ConnectionsError } from "@/components/error/connections-error";
import { ReplyCard } from "./reply-card";

interface CommentCardProps {
  commentData: Comment;
}

export function CommentCard({ commentData }: CommentCardProps) {
  const { projectId, _id: commentId, hasReply, sender } = commentData;
  const [openReplies, setOpenReplies] = useState(false);
  const [showMainReplyForm, setShowMainReplyForm] = useState(false);

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

  const handleShowMainReplyForm = () => setShowMainReplyForm(true);
  const handleCloseMainReplyForm = () => setShowMainReplyForm(false);

  return (
    <div className="w-full flex gap-x-2">
      <CustomAvatar src="" fallback={sender.username.charAt(0)} />
      <div className="w-full space-y-1">
        <CommentContent
          commentData={commentData}
          showReplyForm={handleShowMainReplyForm}
        />

        {showMainReplyForm && (
          <ReplyForm
            commentId={commentId}
            handleClose={handleCloseMainReplyForm}
            refetch={refetch}
          />
        )}

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
              <ReplyCard
                key={reply._id}
                commentId={commentId}
                reply={reply}
                refetch={refetch}
              />
            ))
          )
        ) : null}
      </div>
    </div>
  );
}
