import { Fragment, useState } from "react";
import { ChevronDown, CornerDownRight } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getApi } from "@/lib/fetcher";
import { cn } from "@/lib/utils";

import { CustomAvatar } from "@/components/custom-avatar";
import { Button } from "@/components/ui/button";
import { CommentContent } from "./comment-content";
import { ReplyForm } from "./reply-form";
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
    isFetching,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["child-reply", projectId, commentId],
    queryFn: ({ pageParam }) =>
      getApi(`/comment/${projectId}/${commentId}?page=${pageParam}`),
    refetchOnWindowFocus: false,
    enabled: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.pagination.hasNextPage) return lastPageParam + 1;
      return undefined;
    },
  });

  const getReplies = () => {
    setOpenReplies((openReplies) => !openReplies);
    refetch();
  };

  const handleShowMainReplyForm = () => setShowMainReplyForm(true);
  const handleCloseMainReplyForm = () => setShowMainReplyForm(false);

  return (
    <div className="w-full flex gap-x-2">
      <CustomAvatar
        src={sender.avatar.imgUrl}
        fallback={sender.username.charAt(0)}
        className="size-8 sm:size-10"
      />
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
          isFetching && !isFetchingNextPage ? (
            <Loader className="min-h-max p-4" childStyle="size-6" />
          ) : error ? (
            <ConnectionsError />
          ) : (
            <>
              {data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.body.map((reply: Comment) => (
                    <ReplyCard
                      key={reply._id}
                      commentId={commentId}
                      reply={reply}
                      refetch={refetch}
                    />
                  ))}
                </Fragment>
              ))}
              {hasNextPage &&
                (isFetchingNextPage ? (
                  <Loader className="min-h-max p-4" childStyle="size-6" />
                ) : (
                  <Button
                    variant="ghost"
                    size="roundSm"
                    className="text-sky-500"
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                  >
                    <CornerDownRight className="size-4 mr-2" />
                    Load more
                  </Button>
                ))}
            </>
          )
        ) : null}
      </div>
    </div>
  );
}
