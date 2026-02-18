import Skills from "./Skills";

export default function About() {
  console.log("About component rendered");
  return (
    <div className="my-20">
      <section
        id="about"
        className="container bg-[#1f1f1f] py-20">
        <div className="px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-1">
            {/* About Text */}
            <div>
              <h3 className="mb-2 font-medium tracking-wider text-[#F9004D] uppercase">
                About Me
              </h3>
              <h2 className="mb-6 text-4xl font-bold text-white">
                I Build Web Solutions that Work
              </h2>
              <p className="mb-6 leading-relaxed text-gray-400">
                As a passionate Front-end Developer, I
                specialize in transforming complex design
                concepts into seamless, interactive user
                experiences. With over 4 years of
                experience, I have honed my skills in
                translating UI/UX wireframes into
                responsive, high-performance web
                applications. I pride myself on my ability
                to solve challenging technical problems
                while optimizing web performance.
              </p>
              <p className="mb-8 leading-relaxed text-gray-400">
                Throughout my career, I’ve collaborated with
                cross-functional teams to deliver polished
                products on time. I have a strong background
                in using JavaScript, React.js, Next.js, and
                other modern technologies to create scalable
                and efficient websites. Whether it&apos;s
                building a dynamic e-commerce platform or
                optimizing SEO features, I ensure the code
                is clean, maintainable, and adaptable to
                changing needs.
              </p>
              <p className="mb-8 leading-relaxed text-gray-400">
                In addition to my technical skills, I enjoy
                mentoring junior developers and sharing best
                practices to ensure that every team member
                grows and excels. I thrive in agile
                environments and am always eager to take on
                new challenges that push the boundaries of
                what&apos;s possible on the web. Let’s work
                together to create exceptional digital
                experiences!
              </p>
              <button className="border-b-2 border-[#F9004D] pb-1 font-medium text-white transition-colors hover:text-[#F9004D]">
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
