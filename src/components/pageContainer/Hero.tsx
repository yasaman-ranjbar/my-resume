"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Download,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import Typewriter from "typewriter-effect";

export default function Hero() {
  return (
    <div className="relative">
      <div className="absolute z-10 h-full w-full bg-linear-to-l from-[#280A10] via-[#0C0809] to-[#280A10] mix-blend-multiply"></div>
      <section
        id="home"
        style={{
          backgroundImage: "url(/images/bg.png)",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
        className="relative overflow-hidden bg-linear-to-l from-[#280A10] via-[#0C0809] to-[#280A10] pb-20 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
            {/* Text Content */}
            <div className="z-10 flex-1 text-center lg:text-left">
              <span className="mb-4 block text-xl font-medium text-[#F9004D] md:text-2xl">
                Hello, I'm
              </span>
              <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
                Jasmine{" "}
                <span className="text-[#F9004D]">.</span>
              </h1>
              <div className="mb-8 flex flex-col items-center justify-center gap-2 text-2xl font-light text-gray-400 sm:flex-row md:text-4xl lg:justify-start">
                <span>I Am</span>
                <span className="font-medium text-white">
                  <Typewriter
                    options={{
                      strings: [
                        "Front-end developer",
                        "UI Engineer",
                        "Creative Web Developer",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 75,
                    }}
                  />
                </span>
              </div>
              <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400 lg:mx-0">
                I am a passionate Front-end Developer with
                over 5 years of experience in building
                responsive web applications. I specialize in
                turning complex designs into clean,
                efficient code to deliver seamless and
                engaging user experiences.
              </p>

              <div className="flex flex-col items-center justify-center gap-6 sm:flex-row lg:justify-start">
                <Link
                  href="/resume"
                  className="inline-flex items-center justify-center rounded-full bg-[#F9004D] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#F9004D]/20 transition-all hover:scale-105 hover:bg-[#d00040]">
                  Hire Me
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/resume.pdf"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 hover:bg-white/10">
                  Download CV
                  <Download className="ml-2 h-5 w-5" />
                </Link>
              </div>

              {/* Social Links */}
              <div className="mt-12 flex items-center justify-center gap-6 lg:justify-start">
                {[
                  Facebook,
                  Twitter,
                  Linkedin,
                  Instagram,
                ].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="rounded-full border border-white/10 p-2 text-gray-400 transition-colors hover:border-[#F9004D] hover:text-[#F9004D]">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Image Area */}
            <div className="relative w-full max-w-lg flex-1 lg:max-w-xl">
              {/* Back Text - Solid White - Floats Normal */}
              <div className="animate-float pointer-events-none absolute bottom-48 left-1/2 z-10 flex w-full -translate-x-1/2 justify-center">
                <span className="text-6xl font-bold tracking-wider whitespace-nowrap text-white opacity-20 lg:text-6xl lg:opacity-100">
                  Front-end Developer
                </span>
              </div>

              {/* Image and Shape with Mask */}
              <div
                className="relative z-10 w-full"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 80%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 80%, transparent 100%)",
                }}>
                {/* Background Shape */}
                <div className="absolute bottom-0 left-1/2 -z-20 h-[45%] w-full -translate-x-1/2 rounded-tl-[90px] rounded-tr-[90px] bg-linear-to-b from-[#F9004D] to-[#800028] opacity-90"></div>

                <Image
                  src="/images/hero-image.png"
                  alt="Profile"
                  width={1500}
                  height={500}
                  className="relative z-10 object-cover"
                  priority
                />
              </div>

              {/* Front Text - Outlined - Floats Reverse */}
              <div className="animate-float-reverse pointer-events-none absolute bottom-0 left-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <span
                  className="text-6xl font-bold tracking-wider whitespace-nowrap text-transparent lg:text-6xl"
                  style={{
                    WebkitTextStroke:
                      "1px rgba(255, 255, 255, 1)",
                  }}>
                  Front-end Developer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
