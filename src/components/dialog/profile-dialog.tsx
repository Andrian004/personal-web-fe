import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LeftBar } from "../bar/left-bar";

interface ProfileDialogProps {
  children: ReactNode;
  triggerStyle?: string;
}

export function ProfileDialog({ children, triggerStyle }: ProfileDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className={triggerStyle}>{children}</DialogTrigger>
      <DialogContent>
        <LeftBar rootStyle="bg-transparent" />
      </DialogContent>
    </Dialog>
  );
}
