import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { FormInput } from "./_components/form-input";
import { FormTextarea } from "./_components/form-textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="w-full bg-white/70 dark:bg-white/25 backdrop-blur-lg rounded-2xl p-4 space-y-5">
      <section className="w-full flex justify-between gap-x-4 border-b-2 border-sky-400 pb-3">
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
        <form className="space-y-6">
          <FormInput
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your name..."
          />
          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="example@example.com"
          />
          <FormTextarea
            id="message"
            label="Message"
            placeholder="Enter your message here..."
          />
          <Button type="submit" className="bg-sky-700 dark:bg-sky-400">
            Send
          </Button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
