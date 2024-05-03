import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  rootClass?: string;
  image: string;
  link: string;
  linkPrev: string;
  title: string;
  likes: number;
  comments: number;
}

export function ProjectCard({
  rootClass,
  image,
  link,
  linkPrev,
  title,
  likes,
  comments,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 p-3 rounded-lg hover:scale-105 duration-200 cursor-default shadow hover:shadow-md space-y-2",
        rootClass
      )}
    >
      <img
        src={image}
        alt="nugas"
        className="h-[150px] rounded-sm border border-sky-200 dark:border-sky-950"
      />
      <div className="space-y-2">
        <div className="flex flex-row-reverse gap-x-2">
          <Button
            variant="ghost"
            size="xs"
            className="bg-transparent hover:bg-transparent hover:text-sky-500"
          >
            <Share2 className="w-5 h-5 mr-1" />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className="bg-transparent hover:bg-transparent hover:text-sky-500"
          >
            <MessageCircle className="w-5 h-5 mr-1" />
            {comments}
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className="bg-transparent hover:bg-transparent hover:text-sky-500"
          >
            <Heart className="w-5 h-5 mr-1" />
            {likes}
          </Button>
        </div>
        <div className="space-y-2">
          <Link
            to={link}
            target="_blank"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-sky-500 hover:underline"
          >
            {linkPrev}
          </Link>
          <h1 className="text-xl font-semibold">{title}</h1>
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
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-6 w-[100px]" />
      </div>
    </div>
  );
};
