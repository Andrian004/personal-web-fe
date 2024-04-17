import { Outlet } from "react-router-dom";
import { LeftBar } from "@/components/bar/left-bar";
import { RightBar } from "@/components/bar/right-bar";

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen bg-sky bg-no-repeat bg-center bg-cover flex justify-center font-platypi">
      <div className="flex justify-between gap-4 w-full max-w-6xl bg-transparent mt-16 mb-10">
        <section className="min-w-80  bg-transparent">
          <LeftBar />
        </section>
        <section className="w-full  bg-transparent box-border">
          <Outlet />
        </section>
        <section className="min-w-24  bg-transparent">
          <RightBar />
        </section>
      </div>
    </div>
  );
}
