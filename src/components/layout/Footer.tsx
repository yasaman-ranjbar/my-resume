import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#1f1f1f] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="mb-6 block text-2xl font-bold text-white">
              <span className="text-[#F9004D]">R</span>eeni.
            </Link>
            <p className="leading-relaxed text-gray-400">
              Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                "About",
                "Services",
                "Portfolio",
                "Blog",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 transition-colors hover:text-[#F9004D]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">
              Contact
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li>123 Street Name, City, England</li>
              <li>email@example.com</li>
              <li>+123 456 7890</li>
            </ul>
            <div className="mt-6 flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 transition-colors hover:text-[#F9004D]">
                    <Icon className="h-5 w-5" />
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="flex items-center justify-center gap-1 text-gray-500">
            © {new Date().getFullYear()} Reeni. Made with{" "}
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />{" "}
            by Laralink.
          </p>
        </div>
      </div>
    </footer>
  );
}
