import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { AlignLeft, EllipsisVertical, UserRound } from "lucide-react";
import { ProfileDialog } from "./dialog/profile-dialog";
import { NavDialog } from "./dialog/nav-dialog";
import { CustomAvatar } from "./custom-avatar";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuth();
  return (
    <>
      <div className="flex items-center gap-x-2">
        <ProfileDialog triggerStyle="lg:hidden mr-2">
          <AlignLeft />
        </ProfileDialog>
        <h1 className="text-2xl font-medium">{title}</h1>
      </div>
      <div className="flex items-center gap-x-2 md:gap-x-0">
        <Link to={"/account"} className="md:hidden">
          {user ? (
            <CustomAvatar
              src={user.avatar.imgUrl}
              fallback={user.username.charAt(0)}
              className="size-7"
              fallbackStyle="bg-neutral-600 text-4xl font-bold"
            />
          ) : (
            <UserRound className="size-6" />
          )}
        </Link>
        <NavDialog triggerStyle="md:hidden">
          <EllipsisVertical />
        </NavDialog>
      </div>
    </>
  );
}
