import { Code2, PenTool, Users, Terminal } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <Code2 className="w-6 h-6 text-blue-400" />,
    skills: [
      'React',
      'Next.js 14/15',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'React Query',
      'Redux Toolkit',
      'HTML5 & CSS3',
      'Framer Motion',
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: <Terminal className="w-6 h-6 text-green-400" />,
    skills: [
      'Git & GitHub',
      'VS Code',
      'Vite',
      'Webpack',
      'Docker (Basic)',
      'Figma',
      'Postman',
      'Vercel',
    ],
  },
  {
    title: 'Soft Skills',
    icon: <Users className="w-6 h-6 text-purple-400" />,
    skills: [
      'Clean Code Principles',
      'UI/UX Mindset',
      'Problem Solving',
      'Effective Communication',
      'Team Collaboration',
      'Agile / Scrum',
      'Time Management',
    ],
  },
];

export default function Skills() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Skills & Tech Stack</h1>
      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
        A comprehensive overview of the technologies and tools I use to bring ideas to life.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                {category.icon}
              </div>
              <h2 className="text-xl font-bold">{category.title}</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm font-medium bg-black/40 text-gray-300 rounded-lg border border-white/5 hover:border-white/20 hover:text-white transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
