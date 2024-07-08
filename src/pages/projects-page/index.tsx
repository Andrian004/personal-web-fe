import { FormEvent, useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getApi } from "@/lib/fetcher";
import { useAuth } from "@/hooks/use-auth";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { ProjectCard } from "./_components/project-card";
import { SearchHeader } from "./_components/search-header";

import { Project } from "@/interfaces/project-interface";
import { SuccessResponse } from "@/interfaces/api-interface";

export default function ProjectsPage() {
  const { user, token } = useAuth();
  const [searchValue, setSearchValue] = useState("");

  const {
    data,
    isLoading,
    error,
    isFetching,
    refetch,
  }: UseQueryResult<SuccessResponse<Project[]>> = useQuery({
    queryKey: ["projects"],
    queryFn: () => getApi(`/project?search=${searchValue}`),
    retry: false,
  });

  const handleSearchSubmit = async (value: string, e?: FormEvent) => {
    if (e) e.preventDefault();
    await setSearchValue(value); // Please wait me...
    refetch(); // Ok
  };

  return (
    <div className="w-full bg-white/70 dark:bg-white/25 backdrop-blur-lg rounded-2xl p-2 sm:p-4 space-y-5">
      <section className="w-full flex items-center justify-between gap-x-4 border-b-2 border-sky-400 px-2 sm:px-0 pb-3">
        <SearchHeader title="Projects" onSearchSubmit={handleSearchSubmit} />
      </section>
      <section className="w-full flex flex-row-reverse flex-wrap-reverse items-center gap-x-2">
        <Button
          variant="secondary"
          size="xs"
          className="text-xs text-neutral-500 dark:text-neutral-400"
        >
          Tools
        </Button>
        <Button
          variant="secondary"
          size="xs"
          className="text-xs text-neutral-500 dark:text-neutral-400"
        >
          Popular
        </Button>
        <Button
          variant="secondary"
          size="xs"
          className="text-xs border-2 border-sky-500"
        >
          All
        </Button>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {isLoading || isFetching ? (
          <>
            <ProjectCard.Skeleton />
            <ProjectCard.Skeleton />
            <ProjectCard.Skeleton />
            <ProjectCard.Skeleton />
          </>
        ) : error || !data ? (
          <h1>{error?.message}</h1>
        ) : (
          data.body.map((project) => (
            <ProjectCard
              key={project.id}
              projectId={project.id}
              userId={user?._id}
              token={token}
              image={project.image.imgUrl}
              title={project.title}
              link={project.url}
              linkPrev={project.url.split("//").slice(1)[0]}
              likes={project.totalLikes}
              comments={project.totalComments}
              liked={project.liked}
              desc={project.description}
            />
          ))
        )}
      </section>
      <Footer />
    </div>
  );
}
