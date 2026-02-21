"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-xl font-bold text-transparent">
            DevPortfolio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={clsx(
                  "relative text-sm font-medium transition-colors hover:text-white",
                  pathname === item.path ? "text-white" : "text-gray-400"
                )}>
                {item.name}
                {pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute right-0 -bottom-[21px] left-0 h-[2px] bg-blue-500"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
            <Link
              href="/resume"
              className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              <Download size={16} />
              Resume
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="border-b border-white/10 bg-black/90 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  pathname === item.path
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}>
                {item.name}
              </Link>
            ))}
            <Link
              href="/resume"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-base font-medium text-blue-400 hover:text-blue-300">
              <Download size={18} />
              Download Resume
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
