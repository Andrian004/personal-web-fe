import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { ProjectCard } from "./_components/project-card";
import lightGradient from "@/assets/light-gradient.jpg";
import { SearchHeader } from "./_components/search-header";

export default function ProjectsPage() {
  return (
    <div className="w-full bg-white/70 backdrop-blur-lg rounded-2xl p-4 space-y-5">
      <section className="w-full flex items-center justify-between gap-x-4 border-b-2 border-sky-400 pb-3">
        <SearchHeader title="Projects" />
      </section>
      <section className="w-full flex flex-row-reverse flex-wrap-reverse items-center gap-x-2">
        <Button variant="secondary" size="xs" className="text-xs">
          Tools
        </Button>
        <Button variant="secondary" size="xs" className="text-xs">
          Popular
        </Button>
        <Button variant="secondary" size="xs" className="text-xs">
          All
        </Button>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ProjectCard
          image={lightGradient}
          title="Nugas Web App"
          link="https://nugasteam.vercel.app/"
          linkPrev="nugasteam.vercel.app"
          likes={127}
          comments={52}
        />
        <ProjectCard
          image={lightGradient}
          title="Skuynime"
          link="https://skuynime-sigma.vercel.app/"
          linkPrev="skuynime-sigma.vercel.app"
          likes={56}
          comments={28}
        />
        <ProjectCard
          image={lightGradient}
          title="Nasa Class"
          link="https://ami-learning-club.netlify.app/"
          linkPrev="ami-learning-club.netlify.app"
          likes={9}
          comments={0}
        />
        <ProjectCard
          image={lightGradient}
          title="Google Converter"
          link="https://nugasteam.vercel.app/"
          linkPrev="converter.google.com"
          likes={17}
          comments={1}
        />
      </section>
      <Footer />
    </div>
  );
}
