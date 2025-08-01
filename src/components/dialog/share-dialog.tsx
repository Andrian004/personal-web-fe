import { ReactNode } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import {
  XIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  VKShareButton,
  VKIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TumblrShareButton,
  TumblrIcon,
  LineShareButton,
  LineIcon,
  ThreadsShareButton,
  ThreadsIcon,
} from "react-share";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ShareDialogProps {
  children: ReactNode;
  defaultLink: string;
  title: string;
}

export function ShareDialog({
  children,
  defaultLink,
  title,
}: ShareDialogProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(defaultLink);
      toast.success("Link has been copied");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to visit this project.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={defaultLink}
              readOnly
              className="font-semibold"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={handleCopyLink}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="w-full h-min">
          <div className="flex gap-2 py-1">
            <WhatsappShareButton url={defaultLink} title={title}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <TwitterShareButton url={defaultLink} title={title}>
              <XIcon size={40} round />
            </TwitterShareButton>
            <FacebookShareButton url={defaultLink}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TelegramShareButton url={defaultLink} title={title}>
              <TelegramIcon size={40} round />
            </TelegramShareButton>
            <LinkedinShareButton url={defaultLink} source={defaultLink}>
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
            <ThreadsShareButton url={defaultLink} title={title}>
              <ThreadsIcon size={40} round />
            </ThreadsShareButton>
            <VKShareButton url={defaultLink} title={title}>
              <VKIcon size={40} round />
            </VKShareButton>
            <LineShareButton url={defaultLink} title={title}>
              <LineIcon size={40} round />
            </LineShareButton>
            <TumblrShareButton url={defaultLink} title={title}>
              <TumblrIcon size={40} round />
            </TumblrShareButton>
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
