import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Comment } from "@/interfaces/comment-interface";

import { CommentCard } from "./comment-card";
import { CommentForm } from "./comment-form";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getApi } from "@/lib/fetcher";
import { Loader } from "@/components/loader";

interface CommentSectionProps {
  projectId: string | undefined;
  totalComments: number;
}

export function CommentSection({
  projectId,
  totalComments,
}: CommentSectionProps) {
  const { ref, inView } = useInView();

  const comments = useInfiniteQuery({
    queryKey: ["reply", projectId],
    queryFn: ({ pageParam }) =>
      getApi(`/comment/${projectId}?page=${pageParam}`),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.pagination.hasNextPage) return lastPageParam + 1;
      return undefined;
    },
  });

  useEffect(() => {
    // get the next data when inView state changes
    if (inView) {
      comments.fetchNextPage();
    }
  }, [comments, inView]);

  return (
    <div id="comments">
      <h2 className="text-md lg:text-md text-neutral-700 dark:text-neutral-300">
        {totalComments} Comments
      </h2>
      <div className="space-y-5 mt-4">
        <CommentForm />
        <div className="space-y-2">
          {comments.status === "pending" ? (
            <Loader className="min-h-max p-4" />
          ) : comments.status === "error" ? (
            <h1 className="text-center mb-4">No comments yet😴</h1>
          ) : (
            <>
              {comments.data?.pages.map((group, i) =>
                group.body.length === 0 ? (
                  <h1 className="text-center mb-4">No comments yet😴</h1>
                ) : (
                  <Fragment key={i}>
                    {group.body.map((comment: Comment) => (
                      <CommentCard key={comment._id} commentData={comment} />
                    ))}
                  </Fragment>
                )
              )}
              {comments.hasNextPage && (
                <div ref={ref}>
                  {comments.isFetchingNextPage ? (
                    <Loader className="min-h-max p-4" />
                  ) : null}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
