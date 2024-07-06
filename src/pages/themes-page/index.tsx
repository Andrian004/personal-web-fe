// import { useState } from "react";
import { Check } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import lightBg from "@/assets/sky1-small.jpg";
import darkBg from "@/assets/sky-night3-small.jpg";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function ThemesPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full bg-white/70 dark:bg-white/25 backdrop-blur-lg rounded-2xl p-4 space-y-5">
      <section className="w-full flex justify-between gap-x-4 border-b-2 border-sky-400 pb-3">
        <Header title="Themes" />
      </section>
      <section className="space-y-4">
        <div className="flex gap-x-4">
          <img
            src={theme === "light" ? lightBg : darkBg}
            alt="light"
            className="min-w-52 h-28 rounded-md ring-1"
          />
          <div className="w-full">
            <h2 className="text-xl font-semibold">
              {theme === "light" ? "Light" : "Dark"}
            </h2>
            <p className="text-sm font-light text-neutral-700 dark:text-neutral-300">
              {theme === "light"
                ? "A clear sky during the day is a vast expanse of bright blue, offering a sense of openness and tranquility."
                : "The night sky is a mesmerizing tapestry of stars, planets, and celestial wonders that inspire awe and curiosity."}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-md">
          <div className="border-b border-neutral-300 p-2">
            <h2 className="text-lg font-medium">Current theme</h2>
            <p className="text-sm font-light text-neutral-500 dark:text-neutral-400">
              Choose your favorite theme.
            </p>
          </div>
          <div className="flex gap-x-4 p-4">
            <div
              className={cn(
                "relative rounded cursor-pointer",
                theme === "light" && "ring-2 ring-ring ring-offset-2"
              )}
              onClick={() => setTheme("light")}
            >
              <img
                src={lightBg}
                alt="light"
                className={cn(
                  "w-20 h-12 rounded",
                  theme === "light" && "brightness-50"
                )}
              />
              {theme === "light" && (
                <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-transparent text-white">
                  <Check className="w-7 h-7" />
                </div>
              )}
            </div>
            <div
              className={cn(
                "relative rounded cursor-pointer",
                theme === "dark" && "ring-2 ring-ring ring-offset-2"
              )}
              onClick={() => setTheme("dark")}
            >
              <img
                src={darkBg}
                alt="dark"
                className={cn(
                  "w-20 h-12 rounded",
                  theme === "dark" && "brightness-50"
                )}
              />
              {theme === "dark" && (
                <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-transparent text-white">
                  <Check className="w-7 h-7" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
