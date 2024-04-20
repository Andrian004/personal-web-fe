import { ReactNode } from "react";
import { X } from "lucide-react";
import { RightBar } from "../bar/right-bar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface NavDialogProps {
  children: ReactNode;
  triggerStyle?: string;
}

export function NavDialog({ children, triggerStyle }: NavDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className={triggerStyle}>{children}</DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center bg-transparent border-none shadow-none py-20">
        <RightBar rootStyle="bg-transparent grid grid-cols-2 place-items-center backdrop-blur-none gap-y-10" />
        <DialogClose className="w-max text-sky-400 border-2 border-sky-400 rounded-full p-2">
          <X className="w-10 h-10" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
