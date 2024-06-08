import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectDescriptionProps {
  desc: string;
  github: string;
  url: string;
}

export function ProjectDescription({
  desc,
  github,
  url,
}: ProjectDescriptionProps) {
  const [expand, setExpand] = useState(false);
  return (
    <div className="h-full bg-gray-200 dark:bg-gray-700/70 p-2 space-y-2 rounded-sm">
      <p
        className={cn(
          "text-normal line-clamp-3",
          expand && "line-clamp-none mb-3"
        )}
      >
        {desc}
      </p>
      <ul className={expand ? "inline" : "hidden"}>
        <li>
          Demo link:{" "}
          <a
            href={url}
            target="_blank"
            className="text-sky-600 hover:underline"
          >
            {url}
          </a>
        </li>
        <li>
          Github:{" "}
          <a
            href={github}
            target="_blank"
            className="text-sky-600 hover:underline"
          >
            {github}
          </a>
        </li>
      </ul>
      <Button
        variant="ghost"
        size="min"
        className="text-base text-sky-500 hover:text-sky-500 hover:underline hover:bg-transparent"
        onClick={() => setExpand(!expand)}
      >
        {expand ? "hide" : "show more"}
      </Button>
    </div>
  );
}
