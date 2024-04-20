import { AlignLeft, EllipsisVertical } from "lucide-react";
import { ProfileDialog } from "./dialog/profile-dialog";
import { NavDialog } from "./dialog/nav-dialog";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <ProfileDialog triggerStyle="lg:hidden mr-2">
          <AlignLeft />
        </ProfileDialog>
        <h1 className="text-2xl font-medium">{title}</h1>
      </div>
      <NavDialog triggerStyle="md:hidden">
        <EllipsisVertical />
      </NavDialog>
    </>
  );
}
