import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "@/schemas/signup-schema";
import { LoaderCircle } from "lucide-react";
import { postApi } from "@/lib/fetcher";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormInput } from "../form/form-input";
import { FormPassword } from "../form/form-password";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
}

export function SignupDialog({ open, onClose }: SignupModalProps) {
  const { setToken } = useAuth();
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mutation: UseMutationResult<any> = useMutation({
    mutationFn: (formData) => postApi("/auth/signup", formData),
    onSuccess: (data) => {
      setToken(data.token);
      onClose();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    mutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-sky-300 to-sky-100 dark:from-sky-900 dark:to-gray-900">
        <DialogHeader>
          <h2 className="text-2xl font-bold">Sign Up</h2>
        </DialogHeader>
        <Form {...signupForm}>
          <form
            onSubmit={signupForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormInput
              form={signupForm}
              name="username"
              label="Username"
              placeholder="Enter a username..."
              description="This is your public display name."
            />
            <FormInput
              form={signupForm}
              name="email"
              label="Email"
              placeholder="example@example.com"
              type="email"
            />
            <FormPassword
              form={signupForm}
              name="password"
              label="Password"
              placeholder="Enter a password..."
            />
            <Button
              type="submit"
              className="w-full"
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
