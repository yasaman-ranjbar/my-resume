import Projects from "@/components/pageContainer/Projects/Projects";
import { API_URL } from "@/config/api";
import { ProjectsProps } from "@/hooks/useProjects";
import { getQueryClient } from "@/lib/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

// SSG with ISR: static at build time, revalidate every hour
export const revalidate = 3600;

export default async function projectsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch(API_URL.ADMIN.PROJECTS, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

  const projects = queryClient.getQueryData<ProjectsProps[]>(["projects"]) ?? [];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-12 text-center text-3xl font-bold md:text-4xl">Projects</h1>
        <Projects projects={projects} />
      </div>
    </HydrationBoundary>
  );
}
