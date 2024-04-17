import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TodoListProps = {
  rootClass?: string;
  icon: ReactNode;
  title: string;
  desc: string;
};

export function TodoList({ rootClass, icon, title, desc }: TodoListProps) {
  return (
    <div
      className={cn(
        "flex gap-x-4 bg-white p-2 rounded-md hover:scale-105 duration-200 cursor-default shadow hover:shadow-md",
        rootClass
      )}
    >
      <span>{icon}</span>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="font-normal">{desc}</p>
      </div>
    </div>
  );
}
