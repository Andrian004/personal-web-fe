import { ReactNode } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type ContactCardProps = {
  logo: ReactNode;
  title: string;
  desc: string;
  iconStyle?: string;
};

export function LeftBar() {
  return (
    <div className="w-full flex flex-col items-center gap-y-6 bg-white/60 backdrop-blur rounded-2xl p-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Bar-Bar Code</h1>
        <h2 className="text-md font-medium text-neutral-700">Web Developer</h2>
      </div>
      <div className="flex justify-center gap-x-2">
        <Button variant="secondary" size="icon">
          <Github className="w-5 h-5" />
        </Button>
        <Button variant="secondary" size="icon">
          <Linkedin className="w-5 h-5 text-sky-700" />
        </Button>
        <Button variant="secondary" size="icon">
          <Instagram className="w-5 h-5 text-pink-700" />
        </Button>
        <Button variant="secondary" size="icon">
          <Youtube className="w-5 h-5 text-red-600" />
        </Button>
      </div>
      <div className="w-full bg-neutral-300/30 space-y-2 p-2 rounded-xl">
        <ContactCard
          logo={<Phone className="w-5 h-5" />}
          title="Phone"
          desc="+6283531175547"
          iconStyle="text-green-500"
        />
        <Separator />
        <ContactCard
          logo={<Mail className="w-5 h-5" />}
          title="Email"
          desc="barbarcode@gmail.com"
          iconStyle="text-indigo-500"
        />
        <Separator />
        <ContactCard
          logo={<MapPin className="w-5 h-5" />}
          title="Address"
          desc="Bandung, ID"
          iconStyle="text-rose-600"
        />
        <Separator />
        <ContactCard
          logo={<Languages className="w-5 h-5" />}
          title="Language"
          desc="Indonesia"
          iconStyle="text-sky-600"
        />
      </div>
      <Button>Download CV</Button>
    </div>
  );
}

function ContactCard({ logo, title, desc, iconStyle }: ContactCardProps) {
  return (
    <Button
      variant="ghost"
      className="relative flex w-full min-h-max justify-start hover:bg-transparent before:absolute before:w-0 before:h-full before:left-0 before:top-0 before:bg-white before:rounded-md before:hover:w-full before:duration-500 before:z-0 p-0 gap-x-2"
    >
      <span
        className={cn(
          "h-10 w-10 bg-white text-secondary-foreground hover:bg-white/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium z-10",
          iconStyle
        )}
      >
        {logo}
      </span>
      <div className="text-start z-10">
        <h1 className="text-xs font-normal text-neutral-700">{title}</h1>
        <p className="text-sm font-medium text-neutral-800">{desc}</p>
      </div>
    </Button>
  );
}
