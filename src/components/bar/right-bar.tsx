import { ReactNode, useState } from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { Home, Send, BriefcaseBusiness, Sun, MoonStar } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: string;
  title: string;
  to: string;
}

type IconListType = {
  name: string;
  node: ReactNode;
};

export function RightBar({ rootStyle }: { rootStyle?: string }) {
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center gap-y-6 bg-white/70 dark:bg-white/25  backdrop-blur-lg rounded-2xl p-4",
        rootStyle
      )}
    >
      <NavItem icon="Home" title="Home" to="/" />
      <NavItem icon="BriefcaseBusiness" title="Projects" to="/projects" />
      <NavItem icon="Send" title="Contact" to="/contact" />
      <NavItem
        icon={theme === "light" ? "Sun" : "MoonStar"}
        title="Themes"
        to="/themes"
      />
    </div>
  );
}

function NavItem({ icon, title, to }: NavItemProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  const [isHover, setIsHover] = useState(false);

  const icons: IconListType[] = [
    {
      name: "Home",
      node: (
        <Home
          className={cn(
            "w-8 h-8 duration-200",
            match || isHover ? "w-5 h-5" : ""
          )}
        />
      ),
    },
    {
      name: "Send",
      node: (
        <Send
          className={cn(
            "w-8 h-8 duration-200",
            match || isHover ? "w-5 h-5" : ""
          )}
        />
      ),
    },
    {
      name: "BriefcaseBusiness",
      node: (
        <BriefcaseBusiness
          className={cn(
            "w-8 h-8 duration-200",
            match || isHover ? "w-5 h-5" : ""
          )}
        />
      ),
    },
    {
      name: "Sun",
      node: (
        <Sun
          className={cn(
            "w-8 h-8 duration-200",
            match || isHover ? "w-5 h-5" : ""
          )}
        />
      ),
    },
    {
      name: "MoonStar",
      node: (
        <MoonStar
          className={cn(
            "w-8 h-8 duration-200",
            match || isHover ? "w-5 h-5" : ""
          )}
        />
      ),
    },
  ];

  return (
    <NavLink
      to={to}
      className={cn(
        "w-16 h-16 flex flex-col justify-center items-center gap-y-0 bg-white dark:bg-gray-900 ring-1 md:ring-0 rounded-lg duration-500",
        match || isHover
          ? "gap-y-1 bg-sky-400 dark:bg-gradient-to-tl dark:from-black dark:to-sky-700"
          : ""
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {icons.find((e) => e.name === icon)?.node}
      <h1
        className={cn(
          "font-medium text-xs h-0 opacity-0 duration-500",
          match || isHover ? "h-auto opacity-100" : ""
        )}
      >
        {title}
      </h1>
    </NavLink>
  );
}
