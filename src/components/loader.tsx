import { cn } from "@/lib/utils";
import { Aperture } from "lucide-react";

interface LoaderProps {
  className?: string;
  childStyle?: string;
}

export function Loader({ className, childStyle }: LoaderProps) {
  return (
    <div
      className={cn(
        "w-full min-h-96 flex items-center justify-center",
        className
      )}
    >
      <Aperture className={cn("size-10 animate-spin", childStyle)} />
    </div>
  );
}
