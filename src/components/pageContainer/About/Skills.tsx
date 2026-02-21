"use client";

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
    <section
      id="skills"
      className="bg-[#131313] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h3 className="mb-2 font-medium tracking-wider text-[#F9004D] uppercase">My Skills</h3>
          <h2 className="text-4xl font-bold text-white">My Best Skills</h2>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="mb-2 flex justify-between">
                <span className="font-medium text-white">{skill.name}</span>
                <span className="text-gray-400">{skill.percentage}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full border border-white/5 bg-[#1f1f1f]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${skill.percentage}%`,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  className="h-2.5 rounded-full bg-[#F9004D]"></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
