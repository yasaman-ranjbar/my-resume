'use client';

import { motion } from "framer-motion";

export default function Skills() {
  const skills = [
    { name: "HTML", percentage: 95 },
    { name: "CSS", percentage: 95 },
    { name: "JavaScript", percentage: 80 },
    { name: "TypeScript", percentage: 70 },
    { name: "React.js", percentage: 90 },
    { name: "Next.js", percentage: 90 },
    { name: "React Native", percentage: 70 },
    { name: "WordPress", percentage: 95 },
  ];

  return (
    <section id="skills" className="py-20 bg-[#131313]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-[#F9004D] font-medium uppercase tracking-wider mb-2">My Skills</h3>
          <h2 className="text-4xl font-bold text-white">My Best Skills</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="text-white font-medium">{skill.name}</span>
                <span className="text-gray-400">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-[#1f1f1f] rounded-full h-2.5 border border-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="bg-[#F9004D] h-2.5 rounded-full"
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
