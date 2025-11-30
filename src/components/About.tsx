import { Code, Palette, Smartphone } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Web Design",
    description: "The most modern and high-quality design made at a professional level.",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "High-quality development of sites at the professional level.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Professional development of mobile applications for iOS and Android.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* About Text */}
          <div>
            <h3 className="text-[#F9004D] font-medium uppercase tracking-wider mb-2">About Me</h3>
            <h2 className="text-4xl font-bold text-white mb-6">
              I Develop System that Works
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
            <button className="text-white border-b-2 border-[#F9004D] pb-1 hover:text-[#F9004D] transition-colors font-medium">
              View All Services
            </button>
          </div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-8 bg-[#181818] rounded-2xl hover:-translate-y-2 transition-transform duration-300 border border-white/5 ${
                  index === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-[#131313] flex items-center justify-center mb-6 text-[#F9004D] border border-white/5">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
