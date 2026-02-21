import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-[#131313] py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#F9004D_1px,transparent_1px)] [background-size:16px_16px] opacity-5"></div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
          Have any project in mind?
        </h2>
        <p className="mb-10 text-lg text-gray-400">
          Just send me a message and we can discuss your project.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-[#F9004D] px-10 py-4 text-base font-bold text-white shadow-lg shadow-[#F9004D]/20 transition-all hover:scale-105 hover:bg-[#d00040]">
          Contact Me
        </Link>
      </div>
    </section>
  );
}
