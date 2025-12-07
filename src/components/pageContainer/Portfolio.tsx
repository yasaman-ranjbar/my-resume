import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Project One",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Project Two",
    category: "Development",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Project Three",
    category: "App Design",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-[#F9004D] font-medium uppercase tracking-wider mb-2">Portfolio</h3>
          <h2 className="text-4xl font-bold text-white">My Latest Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                  <span className="text-[#F9004D] font-medium mb-2">{project.category}</span>
                  <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F9004D] text-white hover:bg-white hover:text-[#F9004D] transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
             <Link
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white border-2 border-[#F9004D] rounded-full hover:bg-[#F9004D] transition-all"
              >
                View All Projects
              </Link>
        </div>
      </div>
    </section>
  );
}
