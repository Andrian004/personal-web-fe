import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface CustomAvatarProps {
  src: string;
  fallback: string;
  className?: string;
}

export function CustomAvatar({ fallback, src, className }: CustomAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
