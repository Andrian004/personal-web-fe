import { NavLink, Outlet } from "react-router-dom";
import { UserRound } from "lucide-react";
import { LeftBar } from "@/components/bar/left-bar";
import { RightBar } from "@/components/bar/right-bar";

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen bg-sky dark:bg-skynight bg-no-repeat bg-center bg-cover flex justify-center font-platypi">
      <div className="flex justify-between gap-4 w-full max-w-6xl bg-transparent mt-5 sm:mt-10 md:mt-16 mb-10 px-1 sm:px-4">
        <section className="hidden lg:inline lg:min-w-80 bg-transparent">
          <LeftBar />
        </section>
        <section className="w-full bg-transparent box-border">
          <Outlet />
        </section>
        <section className="hidden md:min-w-24 space-y-4 md:flex flex-col items-center bg-transparent">
          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive
                ? "w-20 h-20 bg-gradient-to-tl from-white to-sky-400 dark:from-black dark:to-sky-700 flex justify-center items-center rounded-full outline outline-4 outline-white dark:outline-sky-500 outline-offset-4"
                : "w-20 h-20 bg-white dark:bg-gray-700 flex justify-center items-center rounded-full"
            }
          >
            <UserRound className="w-12 h-12" />
          </NavLink>
          <RightBar />
        </section>
      </div>
    </div>
  );
}
