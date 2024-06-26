import { useState } from "react";
import { Comment } from "@/interfaces/comment-interface";

import { CustomAvatar } from "@/components/custom-avatar";
import { CommentContent } from "./comment-content";
import { ReplyForm } from "./reply-form";

interface ReplyCardProps {
  commentId: string;
  reply: Comment;
  refetch?: () => void;
}

export function ReplyCard({ commentId, reply, refetch }: ReplyCardProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleShowReplyForm = () => setShowReplyForm(true);
  const handleCloseReplyForm = () => setShowReplyForm(false);
  return (
    <div className="w-full flex gap-x-2">
      <CustomAvatar
        src={reply.sender.avatar.imgUrl}
        fallback={reply.sender.username.charAt(0)}
        className="size-7"
      />
      <div className="w-full space-y-1">
        <CommentContent
          commentData={reply}
          showReplyForm={handleShowReplyForm}
        />
        {showReplyForm && (
          <ReplyForm
            commentId={commentId}
            tag={reply.sender.username}
            handleClose={handleCloseReplyForm}
            refetch={refetch}
          />
        )}
      </div>
    </div>
  );
}
