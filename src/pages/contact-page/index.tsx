import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/schemas/contact-schema";
import { useAuth } from "@/hooks/use-auth";
import { Form } from "@/components/ui/form";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactPage() {
  const { user } = useAuth();

  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    if (user) {
      contactForm.setValue("name", user.username);
      contactForm.setValue("email", user.email);
    } else {
      contactForm.setValue("name", "");
    }
  }, [contactForm, user]);

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    console.log(data);
    toast.info("I'm sorry this feature is not available for now!");
  };

  return (
    <div className="w-full bg-white/70 dark:bg-white/25 backdrop-blur-lg rounded-2xl p-2 sm:p-4 space-y-5">
      <section className="w-full flex justify-between gap-x-4 border-b-2 border-sky-400 px-2 sm:px-0 pb-3">
        <Header title="Contact Me" />
      </section>
      <section className="bg-white dark:bg-gray-800 p-2 md:p-5 xl:p-10 rounded-md space-y-10">
        <h1 className="text-xl lg:text-2xl text-neutral-700 dark:text-neutral-300">
          I'm always open to discuss about{" "}
          <span className="text-sky-600 dark:text-sky-400 underline">
            Project
          </span>{" "}
          or{" "}
          <span className="text-sky-600 dark:text-sky-400 underline">
            Partnerships
          </span>
          .
        </h1>
        <Form {...contactForm}>
          <form
            onSubmit={contactForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormInput
              form={contactForm}
              name="name"
              label="Name"
              placeholder="Enter your name..."
              controlStyle="text-lg bg-neutral-200 dark:bg-neutral-900"
              labelStyle="text-lg lg:text-xl after:content-['*'] after:text-red-600"
            />
            <FormInput
              form={contactForm}
              name="email"
              label="Email"
              type="email"
              placeholder="example@example.com"
              controlStyle="text-lg bg-neutral-200 dark:bg-neutral-900"
              labelStyle="text-lg lg:text-xl after:content-['*'] after:text-red-600"
            />
            <FormTextarea
              form={contactForm}
              name="message"
              label="Message"
              placeholder="Enter your message here..."
              rootStyle="space-y-2"
              labelStyle="text-lg lg:text-xl after:content-['*'] after:text-red-600"
              textareaStyle="resize-y text-lg bg-neutral-200 dark:bg-neutral-900"
            />
            <Button type="submit" className="bg-sky-700 dark:bg-sky-400">
              Send
            </Button>
          </form>
        </Form>
      </section>
      <Footer />
    </div>
  );
}
