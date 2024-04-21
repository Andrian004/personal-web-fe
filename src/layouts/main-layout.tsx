import { Outlet } from "react-router-dom";
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
        <section className="hidden md:inline md:min-w-24  bg-transparent">
          <RightBar />
        </section>
      </div>
    </div>
  );
}
