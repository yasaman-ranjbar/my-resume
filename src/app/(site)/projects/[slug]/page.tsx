import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center text-gray-400 transition-colors hover:text-white">
        <ArrowLeft
          size={20}
          className="mr-2"
        />
        Back to Projects
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left Column: Content */}
        <div>
          <h1 className="mb-4 text-4xl font-bold">
            {project.title}
          </h1>
          <p className="mb-8 text-xl text-gray-400">
            {project.shortDescription}
          </p>

          <div className="mb-10 flex gap-4">
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700">
              <ExternalLink
                size={20}
                className="mr-2"
              />
              Live Demo
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-white/10 px-6 py-3 font-medium text-white transition-colors hover:bg-white/20">
              <Github
                size={20}
                className="mr-2"
              />
              GitHub
            </a>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-blue-400">
                Overview
              </h2>
              <p className="leading-relaxed text-gray-300">
                {project.description}
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-blue-400">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-300">
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-blue-400">
                Challenges & Solutions
              </h2>
              <div className="space-y-4">
                {project.challenges.map(
                  (challenge, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <div className="mb-2 flex items-start gap-3">
                        <div className="mt-1 rounded bg-red-500/20 p-1 text-red-400">
                          <span className="sr-only">
                            Challenge
                          </span>
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        </div>
                        <p className="font-medium text-gray-300">
                          Challenge: {challenge}
                        </p>
                      </div>
                      <div className="flex items-start gap-3 border-l-2 border-green-500/30 pl-4">
                        <div className="mt-1 rounded bg-green-500/20 p-1 text-green-400">
                          <CheckCircle2 size={16} />
                        </div>
                        <p className="text-gray-400">
                          Solution:{" "}
                          {project.solutions[index]}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Right Column: Screenshots */}
        <div className="space-y-6">
          <h2 className="mb-4 text-2xl font-semibold text-blue-400 lg:hidden">
            Screenshots
          </h2>
          {project.screenshots.map((src, index) => (
            <div
              key={index}
              className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-gray-800 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                Screenshot {index + 1}
              </div>
              {/* Actual Image would go here */}
              {/* <Image src={src} alt={`Screenshot ${index + 1}`} fill className="object-cover" /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
