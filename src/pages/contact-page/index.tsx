import { Footer } from "@/components/footer";
import { FormInput } from "./_components/form-input";
import { FormTextarea } from "./_components/form-textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="w-full bg-white/70 backdrop-blur-lg rounded-2xl p-4 space-y-5">
      <section className="w-full flex gap-x-4 border-b-2 border-sky-400 pb-3">
        <h1 className="text-2xl font-medium">Contact Me</h1>
      </section>
      <section className="bg-white p-2 md:p-5 xl:p-10 rounded-md space-y-10">
        <h1 className="text-xl lg:text-2xl text-neutral-700">
          I'm always open to discuss about{" "}
          <span className="text-sky-600 underline">Project</span> or{" "}
          <span className="text-sky-600 underline">Partnerships</span>.
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
          <Button type="submit" className="bg-sky-700">
            Send
          </Button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
