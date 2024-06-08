import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { postApi } from "@/lib/fetcher";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormInput } from "../form/form-input";
import { FormPassword } from "../form/form-password";

import { AxiosError } from "axios";
import { loginSchema } from "@/schemas/login-schema";
import { ErrorResponse } from "@/interfaces/api-interface";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export function LoginDialog({ open, onClose }: LoginDialogProps) {
  const { setToken } = useAuth();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: z.infer<typeof loginSchema>) =>
      postApi("/auth/login", formData),
    onSuccess: (data) => {
      setToken(data.token);
      onClose();
      window.location.reload();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        toast.error(error.response.data.message, {
          position: "top-center",
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-sky-300 to-sky-100 dark:from-sky-900 dark:to-gray-900">
        <DialogHeader>
          <h2 className="text-2xl font-bold">Login</h2>
        </DialogHeader>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormInput
              form={loginForm}
              name="username"
              label="Username"
              placeholder="Enter a username..."
              description="This is your public display name."
            />
            <FormPassword
              form={loginForm}
              name="password"
              label="Password"
              placeholder="Enter a password..."
            />
            <Button
              type="submit"
              className="w-full bg-sky-600 dark:bg-sky-500"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
