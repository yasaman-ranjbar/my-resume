import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <main className="min-h-screen bg-[#131313] text-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h1>
        
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Image Placeholder */}
          <div className="w-full md:w-1/3 aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 relative overflow-hidden group">
            <span className="group-hover:scale-110 transition-transform duration-500">
              Image Placeholder
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="w-full md:w-2/3 space-y-6 text-gray-300 leading-relaxed">
            <p>
              I am a passionate and highly skilled Front-End Developer with over four years of professional experience building fast, scalable, and user-focused web applications. My expertise spans modern technologies such as React, Next.js, TypeScript, Tailwind CSS, and a deep understanding of clean UI/UX, component architecture, and performance optimization.
            </p>
            <p>
              With a strong background in developing production-level platforms, e-commerce systems, multi-language interfaces, and responsive layouts, I take pride in delivering high-quality work with attention to detail and a strong sense of ownership. I also have over eight years of experience working with WordPress, which has strengthened my understanding of content-driven design and flexible frontend structure.
            </p>
            <p>
              I continuously strive to learn, improve, and create seamless digital experiences that users enjoy. I would welcome the opportunity to bring my skills, creativity, and problem-solving mindset to your team and contribute meaningfully to your product's success.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
