import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
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
import { Link } from "react-router-dom";

interface LeftBarProps {
  rootStyle?: string;
}

interface ContactCardProps {
  logo: ReactNode;
  title: string;
  desc: string;
  iconStyle?: string;
}

export function LeftBar({ rootStyle }: LeftBarProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center gap-y-6 bg-white/70 dark:bg-white/25 backdrop-blur-lg rounded-2xl p-4",
        rootStyle
      )}
    >
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Andrian004</h1>
        <h2 className="text-md font-medium text-neutral-700 dark:text-neutral-300">
          Web Developer
        </h2>
      </div>
      <div className="flex justify-center gap-x-2">
        <Link
          to="https://github.com/Andrian004/"
          target="_blank"
          className="h-10 w-10 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <Github className="w-5 h-5" />
        </Link>
        <Link
          to="https://www.linkedin.com/in/andri-adhi-nugroho-44934a285/"
          target="_blank"
          className="h-10 w-10 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <Linkedin className="w-5 h-5 text-sky-700" />
        </Link>
        <Link
          to="/"
          className="h-10 w-10 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <Instagram className="w-5 h-5 text-pink-700" />
        </Link>
        <Link
          to="/"
          className="h-10 w-10 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <Youtube className="w-5 h-5 text-red-600" />
        </Link>
      </div>
      <div className="w-full divide-y divide-white bg-neutral-400/30 dark:bg-gray-950/30 px-2 rounded-xl">
        <div className="py-2">
          <ContactCard
            logo={<Phone className="w-5 h-5" />}
            title="Phone"
            desc="+987654321098"
            iconStyle="text-green-500"
          />
        </div>
        <div className="py-2">
          <ContactCard
            logo={<Mail className="w-5 h-5" />}
            title="Email"
            desc="justexample@email.xyz"
            iconStyle="text-indigo-500"
          />
        </div>
        <div className="py-2">
          <ContactCard
            logo={<MapPin className="w-5 h-5" />}
            title="Address"
            desc="Yogyakarta, ID"
            iconStyle="text-rose-600"
          />
        </div>
        <div className="py-2">
          <ContactCard
            logo={<Languages className="w-5 h-5" />}
            title="Language"
            desc="Indonesia"
            iconStyle="text-sky-600"
          />
        </div>
      </div>
      <Button className="bg-sky-700 dark:bg-gray-900 dark:text-white">
        Download CV
      </Button>
    </div>
  );
}

function ContactCard({ logo, title, desc, iconStyle }: ContactCardProps) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Button
      variant="ghost"
      className="relative flex w-full min-h-max justify-start hover:bg-transparent before:absolute before:w-10 before:h-full before:left-0 before:top-0 before:bg-white dark:before:bg-gray-900 before:rounded-md before:hover:w-full before:duration-500 before:z-0 p-0 gap-x-2"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span
        className={cn(
          "h-10 w-10 bg-white dark:bg-gradient-to-r dark:from-sky-950 dark:to-gray-900 text-secondary-foreground hover:bg-white/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium z-10",
          iconStyle
        )}
      >
        {logo}
      </span>
      <div className="text-start z-10">
        <h1
          className={cn(
            "text-xs font-normal text-neutral-700 dark:text-neutral-200 duration-300",
            isHover && "dark:text-sky-500"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-sm font-medium text-neutral-800 dark:text-white duration-300",
            isHover && "dark:text-sky-400"
          )}
        >
          {desc}
        </p>
      </div>
    </Button>
  );
}
