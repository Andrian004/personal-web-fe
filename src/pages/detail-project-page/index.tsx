import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, Share2 } from "lucide-react";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { deleteApi, getApi, postApi } from "@/lib/fetcher";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

import { CustomAvatar } from "@/components/custom-avatar";
import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { CommentCard } from "./_components/comment-card";
import { ProjectDescription } from "./_components/project-description";
import { CommentForm } from "./_components/comment-form";

import { SuccessResponse } from "@/interfaces/api-interface";
import { Project } from "@/interfaces/project-interface";
import { Comment } from "@/interfaces/comment-interface";
import { AdditionalLikeData } from "@/types";

export default function DetailProjectPage() {
  const { id: paramsId } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const { data, isLoading, error }: UseQueryResult<SuccessResponse<Project>> =
    useQuery({
      queryKey: ["project", paramsId],
      queryFn: async () => {
        const response = await getApi(`/project/${paramsId}`);
        setIsLiked(response.body.liked);
        setTotalLikes(response.body.totalLikes);
        return response;
      },
    });

  const comments: UseQueryResult<SuccessResponse<Comment[]>> = useQuery({
    queryKey: ["reply", paramsId],
    queryFn: () => getApi(`/comment/${paramsId}`),
  });

  const postMutation = useMutation({
    mutationFn: (formData: AdditionalLikeData) =>
      postApi("/like", formData, token),
    onSuccess: () => {
      setIsLiked(true);
      setTotalLikes(totalLikes + 1);
    },
    onError: (error) => console.log(error),
  });

  const deleteMutation = useMutation({
    mutationFn: (formData: AdditionalLikeData) =>
      deleteApi("/like", token, formData),
    onSuccess: () => {
      setIsLiked(false);
      setTotalLikes(totalLikes - 1);
    },
    onError: (error) => console.log(error),
  });

  const handleLike = () => {
    if (!token) return navigate("/account");
    if (!paramsId || !user) return;

    if (!isLiked) {
      return postMutation.mutate({ pid: paramsId, uid: user.userId });
    }
    return deleteMutation.mutate({ pid: paramsId, uid: user.userId });
  };

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-2xl">Error!</h1>
      </div>
    );
  }

  return (
    <div className="w-full bg-white/70 dark:bg-white/25 backdrop-blur-lg rounded-2xl p-4 space-y-5">
      {isLoading || data === undefined ? (
        <Loader />
      ) : (
        <>
          <section className="w-full border-b-2 border-sky-400 pb-3">
            <CustomBreadcrumb title={data.body.title} />
          </section>
          <section className="bg-white dark:bg-gray-800 p-2 rounded-md space-y-3">
            <img
              src={data.body.image.imgUrl}
              alt="image"
              className="aspect-video rounded-sm border border-sky-200 dark:border-sky-950"
            />
            <h1 className="text-xl lg:text-2xl text-neutral-700 dark:text-neutral-300 truncate">
              {data.body.title}
            </h1>
            <div className="flex justify-between flex-wrap gap-2">
              <div className="flex gap-x-2 justify-start items-center">
                <CustomAvatar
                  src="https://avatars.githubusercontent.com/u/128672158?s=400&u=3b5a63f174ccfe0a6b401d0a515756adba20e8eb&v=4"
                  fallback="A"
                />
                <div>
                  <h3 className="font-medium">Andrian004</h3>
                  <h4 className="text-xs text-neutral-600 dark:text-neutral-400">
                    Creator
                  </h4>
                </div>
              </div>
              <div className="flex gap-x-2 justify-start items-center">
                <Button
                  variant="gray"
                  size="roundSm"
                  className="text-xs sm:text-base"
                  onClick={handleLike}
                  disabled={postMutation.isPending || deleteMutation.isPending}
                >
                  <Heart
                    className={cn(
                      "size-4 sm:size-5 mr-2",
                      isLiked && "fill-rose-500 text-transparent"
                    )}
                  />
                  {totalLikes}
                </Button>
                <Button
                  variant="gray"
                  size="roundSm"
                  className="text-xs sm:text-base"
                >
                  <Share2 className="size-4 sm:size-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            <ProjectDescription
              desc={data.body.description}
              github={data.body.github}
              url={data.body.url}
            />
            <div id="comments">
              <h2 className="text-md lg:text-md text-neutral-700 dark:text-neutral-300">
                {data.body.totalComments} Comments
              </h2>
              <div className="space-y-5 mt-4">
                <CommentForm />
                <div className="space-y-2">
                  {comments.isLoading ? (
                    <Loader className="min-h-max p-4" />
                  ) : comments.error || comments.data?.body.length === 0 ? (
                    <h1 className="text-center mb-4">No comments yet😴</h1>
                  ) : (
                    comments.data?.body.map((comment) => (
                      <CommentCard
                        key={comment._id}
                        commentId={comment._id}
                        projectId={comment.projectId}
                        username={comment.sender.username}
                        message={comment.message}
                        totalLikes={comment.totalLikes}
                        hasReply={comment.hasReply}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </div>
  );
}
