import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-20 bg-[#131313] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#F9004D_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Have any project in mind?
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          Just send me a message and we can discuss your project.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-white bg-[#F9004D] rounded-full hover:bg-[#d00040] transition-all hover:scale-105 shadow-lg shadow-[#F9004D]/20"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
}
