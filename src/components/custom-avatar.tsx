import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface CustomAvatarProps {
  src: string;
  fallback: string;
  className?: string;
  fallbackStyle?: string;
}

export function CustomAvatar({
  fallback,
  src,
  className,
  fallbackStyle,
}: CustomAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} />
      <AvatarFallback className={fallbackStyle}>{fallback}</AvatarFallback>
    </Avatar>
  );
}
