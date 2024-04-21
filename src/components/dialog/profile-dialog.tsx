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
      <DialogContent className="dark:bg-gradient-to-br dark:from-sky-900 dark:to-gray-900">
        <LeftBar rootStyle="bg-transparent dark:bg-transparent" />
      </DialogContent>
    </Dialog>
  );
}
