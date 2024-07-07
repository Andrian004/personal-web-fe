import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { patchFormApi } from "@/lib/fetcher";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CustomAvatar } from "../custom-avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

interface AvatarDialogProps {
  children: ReactNode;
}

export function AvatarDialog({ children }: AvatarDialogProps) {
  const { user, token, refreshToken, invalidateAuth } = useAuth();
  const [picture, setPicture] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileSize, setFileSize] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      patchFormApi(`/user/picture/${user?._id}`, formData, token),
    onSuccess: (data) => {
      invalidateAuth();
      toast.success(data.message);
      setDialogOpen(false);
    },
    onError: (error) => {
      if (error.message === "jwt expired") {
        refreshToken();
      } else {
        toast.error("Failed upload an image.");
      }
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (!file) return;
    if (fileSize > 1048576) return;
    formData.append("image", file);
    mutation.mutate(formData);
  };

  const onChangePicture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPicture(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
      setFileSize(e.target.files[0].size);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm max-h-screen overflow-y-auto">
        <DialogHeader className="font-semibold">Profile Picture</DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-y-4"
        >
          <CustomAvatar
            src={picture ? picture : user?.avatar.imgUrl || ""}
            fallback={user?.username.charAt(0) || ""}
            className="size-auto"
            fallbackStyle="size-60 text-white font-platypi"
          />
          <div className="w-full space-y-1">
            <Input
              type="file"
              onChange={onChangePicture}
              className="file:text-black dark:file:text-white file:border-r file:border-gray-300 file:mr-2 bg-neutral-100 dark:bg-gray-800 border border-gray-400"
            />
            {fileSize > 1048576 && (
              <p className="w-full text-start text-xs font-platypi text-rose-500">
                File size must be under 1 MB
              </p>
            )}
          </div>
          <div className="w-full flex gap-x-2">
            <DialogClose asChild>
              <Button
                type="button"
                size="sm"
                variant="gray"
                className="flex-1"
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              size="sm"
              className="flex-1 bg-sky-600 text-white dark:hover:text-gray-700"
              disabled={mutation.isPending || !file}
            >
              {mutation.isPending && (
                <LoaderCircle className="size-5 mr-2 animate-spin" />
              )}
              Upload
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
