import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { ProjectCard } from "./_components/project-card";
import { SearchHeader } from "./_components/search-header";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "@/lib/fetcher";

export default function ProjectsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["project"],
    queryFn: () => getApi("/project"),
  });

  return (
    <div className="w-full bg-white/70 dark:bg-white/25 backdrop-blur-lg rounded-2xl p-4 space-y-5">
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
        {isLoading ? (
          <>
            <ProjectCard.Skeleton />
            <ProjectCard.Skeleton />
            <ProjectCard.Skeleton />
            <ProjectCard.Skeleton />
          </>
        ) : error || !data ? (
          <h1>Error</h1>
        ) : (
          data.map((project) => (
            <ProjectCard
              key={project.id}
              image={project.image.imgUrl}
              title={project.title}
              link={project.url}
              linkPrev={project.url.split("//").slice(1)[0]}
              likes={project.totalLikes}
              comments={project.totalComments}
            />
          ))
        )}
      </section>
      <Footer />
    </div>
  );
}
