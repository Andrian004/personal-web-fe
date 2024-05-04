import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "@/schemas/signup-schema";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormInput } from "../form/form-input";

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
}

export function SignupDialog({ open, onClose }: SignupModalProps) {
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    console.log(values);
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
            <FormInput
              form={signupForm}
              name="password"
              label="Password"
              placeholder="Enter a password..."
              type="password"
              description="Password must be at least 8 characters."
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
