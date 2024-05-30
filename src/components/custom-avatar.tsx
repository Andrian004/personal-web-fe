import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface CustomAvatarProps {
  src: string;
  fallback: string;
}

export function CustomAvatar({ fallback, src }: CustomAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
