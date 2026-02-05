import Skills from "./Skills";

export default function About() {
  return (
    <div className="my-20">
      <section id="about" className="py-20 bg-[#1f1f1f] container">
        <div className="px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-16">
            {/* About Text */}
            <div>
              <h3 className="text-[#F9004D] font-medium uppercase tracking-wider mb-2">
                About Me
              </h3>
              <h2 className="text-4xl font-bold text-white mb-6">
                I Build Web Solutions that Work
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                As a passionate Front-end Developer, I specialize in
                transforming complex design concepts into seamless, interactive
                user experiences. With over 4 years of experience, I have honed
                my skills in translating UI/UX wireframes into responsive,
                high-performance web applications. I pride myself on my ability
                to solve challenging technical problems while optimizing web
                performance.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Throughout my career, I’ve collaborated with cross-functional
                teams to deliver polished products on time. I have a strong
                background in using JavaScript, React.js, Next.js, and other
                modern technologies to create scalable and efficient websites.
                Whether it&apos;s building a dynamic e-commerce platform or
                optimizing SEO features, I ensure the code is clean,
                maintainable, and adaptable to changing needs.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                In addition to my technical skills, I enjoy mentoring junior
                developers and sharing best practices to ensure that every team
                member grows and excels. I thrive in agile environments and am
                always eager to take on new challenges that push the boundaries
                of what&apos;s possible on the web. Let’s work together to create
                exceptional digital experiences!
              </p>
              <button className="text-white border-b-2 border-[#F9004D] pb-1 hover:text-[#F9004D] transition-colors font-medium">
                View All Services
              </button>
            </div>
          </div>
        </div>
      </section>
      <Skills />
    </div>
  );
}
