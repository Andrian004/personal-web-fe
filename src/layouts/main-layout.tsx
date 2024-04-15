import { Outlet } from "react-router-dom";
import { LeftBar } from "@/components/bar/left-bar";
import { RightBar } from "@/components/bar/right-bar";

export default function MainLayout() {
  return (
    <div className="w-full h-full bg-pink-200 flex justify-center font-platypi">
      <div className="flex justify-between gap-4 w-full max-w-6xl min-h-screen bg-neutral-100 mt-16">
        <section className="min-w-80 bg-blue-200">
          <LeftBar />
        </section>
        <section className="w-full bg-zinc-200">
          <Outlet />
        </section>
        <section className="min-w-24 bg-indigo-200">
          <RightBar />
        </section>
      </div>
    </div>
  );
}
