import Image from "next/image";
import { ArrowRight, Lock, Paperclip, Megaphone } from "lucide-react";
import Link from "next/link";

export default function Experience() {
  return (
    <section className="overflow-hidden bg-[#0a0a0a] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Column: Images/Cards */}
          <div className="relative">
            {/* Main Experience Card */}
            <div className="relative z-10 mx-auto max-w-md rounded-3xl border border-white/5 bg-[#131313] p-8 lg:mx-0">
              <div className="text-center">
                <span className="mb-2 block text-8xl font-bold text-white">10+</span>
                <span className="mb-6 block text-3xl font-bold text-white">
                  Years Of <br /> Experience
                </span>
              </div>

              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[#F9004D] opacity-20 blur-[100px]"></div>
            </div>

            {/* Floating Cards */}
            <div className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-6 lg:mx-0">
              <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#131313] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F9004D]/30 text-[#F9004D]">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Ui/Ux Design</h4>
                  <p className="text-sm text-gray-400">241 Projects</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div>
            <h2 className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl">
              Boost Business Strategic Solutions with Us
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-gray-400">
              Business consulting consultants provide expert advice and guide businesses to help
              them improve their performance, efficiency, and organizational growth.
            </p>

            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="group rounded-2xl border border-white/5 bg-[#131313] p-8 transition-colors hover:border-[#F9004D]/30">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#F9004D] text-white transition-transform group-hover:scale-110">
                  <Paperclip className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">Business Solutions</h3>
                <p className="text-sm text-gray-400">
                  Each one showcases my approach and dedication to detail, creativity.
                </p>
              </div>

              <div className="group rounded-2xl border border-white/5 bg-[#131313] p-8 transition-colors hover:border-[#F9004D]/30">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#F9004D] text-white transition-transform group-hover:scale-110">
                  <Megaphone className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">Profit Partners</h3>
                <p className="text-sm text-gray-400">
                  Business consulting consul us to a provide expert advice businesses.
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full bg-[#F9004D] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#F9004D]/20 transition-all hover:scale-105 hover:bg-[#d00040]">
              Read More About Me
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
