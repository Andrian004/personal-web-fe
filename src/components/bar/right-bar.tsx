import { ReactNode, useState } from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { Home, Send, BriefcaseBusiness, Cog } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItemProps = {
  icon: string;
  title: string;
  to: string;
};

type IconListType = {
  name: string;
  node: ReactNode;
};

export function RightBar() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-6 bg-white/80  backdrop-blur-lg rounded-2xl p-4">
      <NavItem icon="Home" title="Home" to="/" />
      <NavItem icon="BriefcaseBusiness" title="Projects" to="/projects" />
      <NavItem icon="Send" title="Contact" to="/contact" />
      <NavItem icon="Cog" title="Settings" to="/settings" />
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
      name: "Cog",
      node: (
        <Cog
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
        "w-16 h-16 flex flex-col justify-center items-center gap-y-0 bg-white rounded-lg duration-500",
        match || isHover ? "gap-y-1 bg-sky-400" : ""
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
