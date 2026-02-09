"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Experience {
  role: string;
  company: string;
  duration: string;
  position: string;
  description?: string;
}

export default function WorkExperience() {
  const experiences: Experience[] = [
    {
      role: "Senior Front-end Developer",
      company: "Nizek Company",
      duration: "(2024/05 - Present)",
      position: "Full Time - Hybrid",
      description:
        "Engineered scalable e-commerce platform using Next.js with TypeScript, orchestrating robust internationalization and multi-language support.",
    },
    {
      role: "Front-end Developer",
      company: "HoiTech Company",
      duration: "1 Year (2023/04 - 2024/03)",
      position: "Full Time - Remote",
      description:
        "Collaborated on company front-end redesign project, implementing best practices and performance optimization across a team of 10 developers.",
    },
    {
      role: "Front-end Developer",
      company: "HyTech Company",
      duration: "1 Year (2022/03 - 2023/04)",
      position: "Full Time - On Site",
      description:
        "Developed Hekmat Bank and Hekmat insurance projects using React.js and implemented e-commerce marketplace using Next.js.",
    },
    {
      role: "React.js Developer",
      company: "Mobtaker Team Company",
      duration: "3 Years 4 Months (2018/10 - 2022/02)",
      position: "Full Time - On Site",
      description:
        "Created 3 admin panel dashboards for CRM, implemented reusable components and complex UI designs.",
    },
    {
      role: "Web Developer",
      company: "Sobhe-Agahi Advertising Agency",
      duration: "3 Years 6 Months (2015/04 - 2018/09)",
      position: "Full Time - On Site",
      description:
        "Designed WordPress e-commerce websites, optimized performance to 90%, increased customers by up to 90%.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="experience" className="py-20 bg-[#131313]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-[#F9004D] font-medium uppercase tracking-wider mb-2">
            My Journey
          </h3>
          <h2 className="text-4xl font-bold text-white">Experiences</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about-us.png"
                alt="Work Experience"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#131313] via-transparent to-transparent"></div>
            </div>
          </motion.div>

          {/* Right Side - Experience List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-8 border-l-2 border-[#F9004D]/30 hover:border-[#F9004D] transition-colors duration-300"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#F9004D] shadow-lg shadow-[#F9004D]/50"></div>

                <div className="space-y-2">
                  <h3 className="text-[#F9004D] font-semibold text-lg">
                    {exp.role}
                  </h3>
                  <h4 className="text-white text-xl font-bold">
                    {exp.company}
                  </h4>
                  <p className="text-gray-400 text-sm">{exp.position}</p>
                  <p className="text-gray-500 text-sm font-medium">
                    {exp.duration}
                  </p>
                  {exp.description && (
                    <p className="text-gray-400 text-sm leading-relaxed pt-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
