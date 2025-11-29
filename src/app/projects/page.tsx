import Link from 'next/link';
import { projects } from '@/data/projects';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.slug} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col">
            {/* Image Placeholder */}
            <div className="aspect-video bg-gray-800 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-600 group-hover:scale-105 transition-transform duration-500">
                Project Screenshot
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <a href={project.demoLink} className="p-2 bg-white text-black rounded-full hover:bg-blue-500 hover:text-white transition-colors" title="Live Demo">
                  <ExternalLink size={20} />
                </a>
                <a href={project.githubLink} className="p-2 bg-white text-black rounded-full hover:bg-gray-800 hover:text-white transition-colors" title="GitHub">
                  <Github size={20} />
                </a>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 flex-grow">
                {project.shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 text-xs font-medium bg-white/5 text-gray-400 rounded-md border border-white/10">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors mt-auto"
              >
                View Details
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
