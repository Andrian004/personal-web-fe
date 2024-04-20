import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
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
        "bg-white p-3 rounded-lg hover:scale-105 duration-200 cursor-default shadow hover:shadow-md space-y-2",
        rootClass
      )}
    >
      <img src={image} alt="nugas" className="rounded-sm" />
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
            className="text-sm text-neutral-600 hover:text-sky-500 hover:underline"
          >
            {linkPrev}
          </Link>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
      </div>
    </div>
  );
}
