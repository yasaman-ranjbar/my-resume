'use client';

import Image from "next/image";
import Link from "next/link";
import { Download, ArrowRight, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Typewriter from 'typewriter-effect';

export default function Hero() {
  return (
    <div className="relative">
      <div className="absolute w-full h-full bg-linear-to-l from-[#280A10] via-[#0C0809] to-[#280A10] z-10 mix-blend-multiply"></div>
      <section id="home"
        style={{ backgroundImage: 'url(/images/bg.png)', backgroundSize: 'contain', backgroundPosition: 'center' }}
        className="relative pt-14 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-linear-to-l from-[#280A10] via-[#0C0809] to-[#280A10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left z-10">
              <span className="text-[#F9004D] text-xl md:text-2xl font-medium mb-4 block">
                Hello, I'm
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Jasmine <span className="text-[#F9004D]">.</span>
              </h1>
              <div className="text-2xl md:text-4xl text-gray-400 font-light mb-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2">
                <span>I Am</span>
                <span className="text-white font-medium">
                  <Typewriter
                    options={{
                      strings: ['Front-end developer', 'Web developer', ''],
                      autoStart: true,
                      loop: true,
                      delay: 75,
                    }}
                  />
                </span>
              </div>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                I'm a Freelance UI/UX Designer and Developer based in London, England.
                I strives to build immersive and beautiful web applications through carefully crafted code and user-centric design.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <Link
                  href="/resume"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[#F9004D] rounded-full hover:bg-[#d00040] transition-all hover:scale-105 shadow-lg shadow-[#F9004D]/20"
                >
                  Hire Me
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/resume.pdf"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                  Download CV
                  <Download className="ml-2 h-5 w-5" />
                </Link>
              </div>

              {/* Social Links */}
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-6">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-[#F9004D] transition-colors p-2 border border-white/10 rounded-full hover:border-[#F9004D]"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Image Area */}
            <div className="relative flex-1 w-full max-w-lg lg:max-w-xl">
              {/* Back Text - Solid White - Floats Normal */}
              <div className="absolute bottom-48 left-1/2 -translate-x-1/2 w-full flex justify-center z-10 animate-float pointer-events-none">
                <span className="text-6xl lg:text-6xl font-bold text-white tracking-wider whitespace-nowrap opacity-20 lg:opacity-100">
                  Front-end Developer
                </span>
              </div>

              {/* Image and Shape with Mask */}
              <div className="relative w-full z-10" style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}>
                {/* Background Shape */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[45%] bg-linear-to-b from-[#F9004D] to-[#800028] rounded-tr-[90px]  rounded-tl-[90px] -z-20 opacity-90"></div>

                <Image
                  src="/images/hero-image.png"
                  alt="Profile"
                  width={1500}
                  height={500}
                  className="object-cover relative z-10"
                  priority
                />
              </div>

              {/* Front Text - Outlined - Floats Reverse */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-20 flex items-center justify-center pointer-events-none animate-float-reverse">
                <span className="text-6xl lg:text-6xl font-bold text-transparent tracking-wider whitespace-nowrap"
                  style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 1)' }}>
                  Front-end Developer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section></div>
  );
}
