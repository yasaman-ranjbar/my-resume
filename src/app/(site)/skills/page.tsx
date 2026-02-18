import {
  Code2,
  PenTool,
  Users,
  Terminal,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Code2 className="h-6 w-6 text-blue-400" />,
    skills: [
      "React",
      "Next.js 14/15",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "React Query",
      "Redux Toolkit",
      "HTML5 & CSS3",
      "Framer Motion",
    ],
  },
  {
    title: "Tools & DevOps",
    icon: <Terminal className="h-6 w-6 text-green-400" />,
    skills: [
      "Git & GitHub",
      "VS Code",
      "Vite",
      "Webpack",
      "Docker (Basic)",
      "Figma",
      "Postman",
      "Vercel",
    ],
  },
  {
    title: "Soft Skills",
    icon: <Users className="h-6 w-6 text-purple-400" />,
    skills: [
      "Clean Code Principles",
      "UI/UX Mindset",
      "Problem Solving",
      "Effective Communication",
      "Team Collaboration",
      "Agile / Scrum",
      "Time Management",
    ],
  },
];

export default function Skills() {
  return (
    <main className="min-h-screen bg-[#131313] text-white">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-16 pt-32 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Skills & Tech Stack
        </h1>
        <p className="mx-auto mb-16 max-w-2xl text-center text-gray-400">
          A comprehensive overview of the technologies and
          tools I use to bring ideas to life.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors duration-300 hover:bg-white/10">
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  {category.icon}
                </div>
                <h2 className="text-xl font-bold">
                  {category.title}
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-default rounded-lg border border-white/5 bg-black/40 px-3 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:border-white/20 hover:text-white">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
