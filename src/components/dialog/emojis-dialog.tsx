import { ReactNode } from "react";
import { useTheme } from "@/hooks/use-theme";
import EmojiPicker, { PickerProps, Theme } from "emoji-picker-react";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";

interface EmojisDialogProps extends PickerProps {
  children: ReactNode;
  triggerStyle?: string;
}

export function EmojisDialog({
  children,
  triggerStyle,
  ...props
}: EmojisDialogProps) {
  const { theme } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild className={triggerStyle}>
        {children}
      </DialogTrigger>
      <DialogContent closeBtn={false} className="w-max h-max p-0">
        <EmojiPicker theme={theme as Theme} {...props} />
      </DialogContent>
    </Dialog>
  );
}
