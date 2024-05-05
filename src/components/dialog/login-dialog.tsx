import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas/login-schema";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormInput } from "../form/form-input";
import { FormPassword } from "../form/form-password";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export function LoginDialog({ open, onClose }: LoginDialogProps) {
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
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
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
