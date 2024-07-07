import { cn } from "@/lib/utils";

interface TodoListProps {
  rootClass?: string;
  img: string;
  title: string;
  desc: string;
  imgStyle?: string;
}

export function TodoList({
  rootClass,
  img,
  title,
  desc,
  imgStyle,
}: TodoListProps) {
  return (
    <div
      className={cn(
        "flex gap-x-2 bg-white p-2 rounded-md hover:scale-105 duration-200 cursor-default shadow hover:shadow-md",
        rootClass
      )}
    >
      <img src={img} alt="img" className={cn("size-7 mt-1", imgStyle)} />
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="font-normal">{desc}</p>
      </div>
    </div>
  );
}
