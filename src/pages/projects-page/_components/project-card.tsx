import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { deleteApi, postApi } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { AdditionalLikeData } from "@/types";
import { ShareDialog } from "@/components/dialog/share-dialog";

interface ProjectCardProps {
  projectId: string;
  userId: string | undefined;
  token: string | undefined;
  rootClass?: string;
  image: string;
  link: string;
  linkPrev: string;
  title: string;
  likes: number;
  comments: number;
  liked: boolean;
  desc: string;
}

export function ProjectCard({
  projectId,
  userId = "",
  token,
  rootClass,
  image,
  link,
  linkPrev,
  title,
  likes = 0,
  comments,
  liked,
  desc,
}: ProjectCardProps) {
  const { refreshToken } = useAuth();
  const navigate = useNavigate();
  const [onHover, setOnHover] = useState(false);
  const [totalLikes, setTotalLikes] = useState<number>(likes);
  const [isLiked, setIsLiked] = useState<boolean>(liked);

  const postMutation = useMutation({
    mutationFn: (formData: AdditionalLikeData) =>
      postApi("/like", formData, token),
    onSuccess: () => {
      setIsLiked(true);
      setTotalLikes(totalLikes + 1);
    },
    onError: (error) => {
      if (error.message === "jwt expired") refreshToken();
      toast.error("Something went wrong");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (formData: AdditionalLikeData) =>
      deleteApi("/like", token, formData),
    onSuccess: () => {
      setIsLiked(false);
      setTotalLikes(totalLikes - 1);
    },
    onError: (error) => {
      if (error.message === "jwt expired") refreshToken();
      toast.error("Something went wrong");
    },
  });

  const handleLike = () => {
    if (!token) return navigate("/account");

    if (!isLiked) {
      return postMutation.mutate({ pid: projectId, uid: userId });
    }
    return deleteMutation.mutate({ pid: projectId, uid: userId });
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 p-3 rounded-lg cursor-default shadow hover:bg-neutral-100/90 dark:hover:bg-gray-900/80 space-y-2 duration-300",
        rootClass
      )}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <div className="box-border overflow-hidden rounded-sm border border-sky-200 dark:border-sky-950">
        <img
          src={image}
          alt="nugas"
          className={cn(
            "w-full aspect-video rounded-sm duration-200",
            onHover && "scale-125"
          )}
        />
      </div>
      <div className="space-y-2">
        <div className="flex flex-row-reverse gap-x-2">
          <ShareDialog defaultLink={link}>
            <Button
              variant="ghost"
              size="xs"
              className="bg-transparent hover:bg-transparent hover:text-sky-500"
            >
              <Share2 className="w-5 h-5 mr-1" />
            </Button>
          </ShareDialog>
          <Button
            variant="ghost"
            size="xs"
            className="bg-transparent hover:bg-transparent hover:text-sky-500"
            onClick={() => navigate(`/project/${projectId}`)}
          >
            <MessageCircle className="w-5 h-5 mr-1" />
            {comments}
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className="bg-transparent hover:bg-transparent hover:text-sky-500"
            onClick={handleLike}
            disabled={postMutation.isPending || deleteMutation.isPending}
          >
            {isLiked ? (
              <Heart className="w-6 h-6 mr-1 fill-rose-500 text-transparent" />
            ) : (
              <Heart className="w-5 h-5 mr-1" />
            )}
            {totalLikes}
          </Button>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="text-xs flex flex-wrap">
            <p className="overflow-hidden text-nowrap">{desc}</p>
            <Link
              to={`/project/${projectId}`}
              className="text-sky-600 hover:underline"
            >
              ...more
            </Link>
          </div>
          <Link
            to={link}
            target="_blank"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-sky-500 hover:underline"
          >
            {linkPrev}
          </Link>
          <Link to={`/project/${projectId}`} className="text-xl font-semibold">
            {title}
          </Link>
        </div>
      </div>
    </div>
  );
}

ProjectCard.Skeleton = function ProjectCardSkeleton() {
  return (
    <div className="w-full flex flex-col space-y-3 p-3 bg-gray-700/60 rounded-xl">
      <Skeleton className="h-[150px] w-full rounded-md" />
      <div className="w-full flex justify-end gap-x-2">
        <Skeleton className="h-6 w-[30px]" />
        <Skeleton className="h-6 w-[30px]" />
        <Skeleton className="h-6 w-[30px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-6 w-[100px]" />
      </div>
    </div>
  );
};
