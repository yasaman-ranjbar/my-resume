import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/projects"
        className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Projects
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Content */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-gray-400 mb-8">{project.shortDescription}</p>

          <div className="flex gap-4 mb-10">
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ExternalLink size={20} className="mr-2" />
              Live Demo
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium"
            >
              <Github size={20} className="mr-2" />
              GitHub
            </a>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{project.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Challenges & Solutions</h2>
              <div className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-1 bg-red-500/20 rounded text-red-400 mt-1">
                        <span className="sr-only">Challenge</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <p className="text-gray-300 font-medium">Challenge: {challenge}</p>
                    </div>
                    <div className="flex items-start gap-3 pl-4 border-l-2 border-green-500/30">
                      <div className="p-1 bg-green-500/20 rounded text-green-400 mt-1">
                        <CheckCircle2 size={16} />
                      </div>
                      <p className="text-gray-400">Solution: {project.solutions[index]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Right Column: Screenshots */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400 lg:hidden">Screenshots</h2>
          {project.screenshots.map((src, index) => (
            <div
              key={index}
              className="aspect-video bg-gray-800 rounded-xl overflow-hidden border border-white/10 shadow-2xl relative group"
            >
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
