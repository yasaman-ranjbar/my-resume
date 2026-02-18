import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Project One",
    category: "Web Design",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Project Two",
    category: "Development",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Project Three",
    category: "App Design",
    image:
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="bg-[#1f1f1f] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h3 className="mb-2 font-medium tracking-wider text-[#F9004D] uppercase">
            Portfolio
          </h3>
          <h2 className="text-4xl font-bold text-white">
            My Latest Work
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-2 font-medium text-[#F9004D]">
                    {project.category}
                  </span>
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                  <Link
                    href="/projects"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F9004D] text-white transition-colors hover:bg-white hover:text-[#F9004D]">
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#F9004D] px-8 py-3 text-base font-bold text-white transition-all hover:bg-[#F9004D]">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
