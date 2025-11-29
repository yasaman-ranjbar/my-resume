import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 text-center">
      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-2xl shadow-blue-500/20 bg-white/5">
        {/* Placeholder for Profile Image */}
        <div className="w-full h-full flex items-center justify-center text-red-500 text-xs">
          Placeholder
        </div>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Front-End Developer
        </span>
        <br />
        <span className="text-2xl md:text-4xl text-gray-400 font-medium mt-2 block">
          (React & Next.js)
        </span>
      </h1>

      <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10">
        Building fast, scalable, and user-focused web applications with modern technologies.
        Let's create something amazing together.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
        >
          View Projects
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
        <Link
          href="/resume"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-all hover:scale-105"
        >
          Download CV
          <Download className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
