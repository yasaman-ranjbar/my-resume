import Link from "next/link";
import { projects } from "@/data/projects";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

export default function Projects() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-center text-3xl font-bold md:text-4xl">Projects</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
            {/* Image Placeholder */}
            <div className="relative aspect-video overflow-hidden bg-gray-800">
              <div className="absolute inset-0 flex items-center justify-center text-gray-600 transition-transform duration-500 group-hover:scale-105">
                Project Screenshot
              </div>
              <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <a
                  href={project.demoLink}
                  className="rounded-full bg-white p-2 text-black transition-colors hover:bg-blue-500 hover:text-white"
                  title="Live Demo">
                  <ExternalLink size={20} />
                </a>
                <a
                  href={project.githubLink}
                  className="rounded-full bg-white p-2 text-black transition-colors hover:bg-gray-800 hover:text-white"
                  title="GitHub">
                  <Github size={20} />
                </a>
              </div>
            </div>

            <div className="flex flex-grow flex-col p-6">
              <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-blue-400">
                {project.title}
              </h3>
              <p className="mb-4 flex-grow text-sm text-gray-400">{project.shortDescription}</p>

              <div className="mb-6 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-400">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-gray-400">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="mt-auto inline-flex items-center text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">
                View Details
                <ArrowRight
                  size={16}
                  className="ml-1 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
