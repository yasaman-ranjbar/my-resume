"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Header({ className = "bg-transparent" }: { className?: string }) {
  const [isscrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 right-0 left-0 z-50",
        isscrolled && "backdrop-blur-3xl",
        className
      )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              className={clsx("text-2xl font-bold", className)}>
              <span className="text-[#F9004D]">J</span>
              asmine.
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-8 md:flex">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Portfolio", path: "/projects" },
              { name: "Blog", path: "/blog" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={clsx(
                  "text-sm font-medium tracking-wider uppercase transition-colors hover:text-[#F9004D]",
                  className
                )}>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 text-gray-300 hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
