import Image from "next/image";
import { ArrowRight, Lock, Paperclip, Megaphone } from "lucide-react";
import Link from "next/link";

export default function Experience() {
  return (
    <section className="py-20 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Images/Cards */}
          <div className="relative">
            {/* Main Experience Card */}
            <div className="relative z-10 bg-[#131313] p-8 rounded-3xl border border-white/5 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <span className="text-8xl font-bold text-white block mb-2">10+</span>
                <span className="text-3xl font-bold text-white block mb-6">
                  Years Of <br /> Experience
                </span>
              </div>
              
              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#F9004D] opacity-20 blur-[100px] -z-10"></div>
            </div>

            {/* Floating Cards */}
            <div className="mt-8 grid grid-cols-1 gap-6 max-w-md mx-auto lg:mx-0">
               <div className="bg-[#131313] p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-[#F9004D]/30 flex items-center justify-center text-[#F9004D]">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Ui/Ux Design</h4>
                    <p className="text-gray-400 text-sm">241 Projects</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Boost Business Strategic Solutions with Us
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Business consulting consultants provide expert advice and guide businesses to help them improve their performance, efficiency, and organizational growth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-[#131313] p-8 rounded-2xl border border-white/5 hover:border-[#F9004D]/30 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-[#F9004D] flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                  <Paperclip className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Business Solutions</h3>
                <p className="text-gray-400 text-sm">
                  Each one showcases my approach and dedication to detail, creativity.
                </p>
              </div>

              <div className="bg-[#131313] p-8 rounded-2xl border border-white/5 hover:border-[#F9004D]/30 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-[#F9004D] flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                  <Megaphone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Profit Partners</h3>
                <p className="text-gray-400 text-sm">
                  Business consulting consul us to a provide expert advice businesses.
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[#F9004D] rounded-full hover:bg-[#d00040] transition-all hover:scale-105 shadow-lg shadow-[#F9004D]/20"
            >
              Read More About Me
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
