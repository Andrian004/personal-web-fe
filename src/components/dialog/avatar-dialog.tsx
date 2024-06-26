/* NOTE: https://stackoverflow.com/questions/61744385/preview-of-uploaded-image-in-react-js-using-react-hooks */

import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { patchFormApi } from "@/lib/fetcher";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

interface AvatarDialogProps {
  children: ReactNode;
}

export function AvatarDialog({ children }: AvatarDialogProps) {
  const { user, token } = useAuth();
  const [picture, setPicture] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      patchFormApi(`/user/picture/${user?.userId}`, formData, token),
    onSuccess: (data) => {
      toast.success(data.message);
      setDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed upload an image.");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (!file) return;
    formData.append("image", file);
    mutation.mutate(formData);
  };

  const onChangePicture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPicture(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
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
          <img
            className="aspect-square rounded-full"
            src={picture && picture}
            alt="img"
          />
          <Input
            type="file"
            onChange={onChangePicture}
            className="file:text-black dark:file:text-white file:border-r file:border-gray-300 file:mr-2 bg-neutral-100 dark:bg-gray-800 border border-gray-400"
          />
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
              className="flex-1 bg-sky-600 text-white"
              disabled={mutation.isPending}
            >
              Upload
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
