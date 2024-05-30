import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProjectDescription() {
  const [expand, setExpand] = useState(false);
  return (
    <div className="h-full bg-gray-200 dark:bg-gray-700/70 p-2 space-y-2 rounded-sm">
      <p
        className={cn(
          "text-normal line-clamp-3",
          expand && "line-clamp-none mb-3"
        )}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
        tempore ipsum ullam natus quasi provident maxime. Numquam libero aperiam
        excepturi expedita rerum repellat. Odio laudantium autem deleniti
        tempore reprehenderit dolorem fuga sed, rerum nisi necessitatibus iure
        cumque ullam error molestias quasi id, hic architecto laboriosam.
        Asperiores nulla commodi esse. Laboriosam?
      </p>
      <ul className={expand ? "inline" : "hidden"}>
        <li>
          Demo link:{" "}
          <span className="text-sky-600">https://examplelink.com</span>
        </li>
        <li>
          Github:{" "}
          <span className="text-sky-600">https://github.com/Andrian004</span>
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
