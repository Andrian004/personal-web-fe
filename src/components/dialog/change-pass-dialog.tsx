import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassSchema } from "@/schemas/change-pass-schema";
import { useMutation } from "@tanstack/react-query";
import { patchApi } from "@/lib/fetcher";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { FormPassword } from "../form/form-password";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

interface ChangePasswordDialogProps {
  children: ReactNode;
}

export function ChangePasswordDialog({ children }: ChangePasswordDialogProps) {
  const { user, token } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);

  const changePassForm = useForm<z.infer<typeof changePassSchema>>({
    resolver: zodResolver(changePassSchema),
    defaultValues: {
      newPassword: "",
      oldPassword: "",
    },
  });

  const changePassMutation = useMutation({
    mutationFn: (formData: z.infer<typeof changePassSchema>) =>
      patchApi(`/auth/changePassword/${user?._id}`, formData, token),
    onSuccess: (data) => {
      changePassForm.reset();
      setDialogOpen(false);
      toast.success(data.message);
    },
    onError: (error) => toast.error(error.message),
  });

  const handleChangePassword = (values: z.infer<typeof changePassSchema>) => {
    changePassMutation.mutate(values);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-sky-300 to-sky-100 dark:from-sky-900 dark:to-gray-900">
        <DialogHeader>
          <h2 className="text-2xl font-bold">Change Password</h2>
        </DialogHeader>
        <Form {...changePassForm}>
          <form
            onSubmit={changePassForm.handleSubmit(handleChangePassword)}
            className="space-y-4"
          >
            <FormPassword
              name="newPassword"
              form={changePassForm}
              label="New Password"
              placeholder="Enter new password"
            />
            <FormPassword
              name="oldPassword"
              form={changePassForm}
              label="Old Password"
              placeholder="Enter old password"
            />
            <div className="w-full flex gap-x-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  size="sm"
                  variant="gray"
                  className="flex-1"
                  disabled={changePassMutation.isPending}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                size="sm"
                className="flex-1 bg-sky-600 text-white dark:hover:text-gray-700"
                disabled={changePassMutation.isPending}
              >
                {changePassMutation.isPending && (
                  <LoaderCircle className="size-5 mr-2 animate-spin" />
                )}
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
