import { Heart, Share2 } from "lucide-react";
import SampleImg from "@/assets/light-gradient.jpg";
import { CustomAvatar } from "@/components/custom-avatar";
import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CommentCard } from "./_components/comment-card";
import { ProjectDescription } from "./_components/project-description";
import { CommentForm } from "./_components/comment-form";

export default function DetailProjectPage() {
  return (
    <div className="w-full bg-white/70 dark:bg-white/25 backdrop-blur-lg rounded-2xl p-4 space-y-5">
      <section className="w-full border-b-2 border-sky-400 pb-3">
        <CustomBreadcrumb />
      </section>
      <section className="bg-white dark:bg-gray-800 p-2 rounded-md space-y-3">
        <img src={SampleImg} alt="image" className="aspect-video rounded-sm" />
        <h1 className="text-xl lg:text-2xl text-neutral-700 dark:text-neutral-300 truncate">
          Skuynime
        </h1>
        <div className="flex justify-between flex-wrap gap-2">
          <div className="flex gap-x-2 justify-start items-center">
            <CustomAvatar
              src="https://avatars.githubusercontent.com/u/128672158?s=400&u=3b5a63f174ccfe0a6b401d0a515756adba20e8eb&v=4"
              fallback="A"
            />
            <div>
              <h3 className="font-medium">Andrian004</h3>
              <h4 className="text-xs text-neutral-600 dark:text-neutral-400">
                Creator
              </h4>
            </div>
          </div>
          <div className="flex gap-x-2 justify-start items-center">
            <Button
              variant="gray"
              size="roundSm"
              className="text-xs sm:text-base"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              100
            </Button>
            <Button
              variant="gray"
              size="roundSm"
              className="text-xs sm:text-base"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Share
            </Button>
          </div>
        </div>
        <ProjectDescription />
        <div>
          <h2 className="text-md lg:text-md text-neutral-700 dark:text-neutral-300">
            62 Comments
          </h2>
          <div className="space-y-5 mt-4">
            <CommentForm />
            <div className="space-y-2">
              <CommentCard />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
