import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1f1f1f] pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold text-white block mb-6">
              <span className="text-[#F9004D]">R</span>eeni.
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {["About", "Services", "Portfolio", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#F9004D] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4 text-gray-400">
              <li>123 Street Name, City, England</li>
              <li>email@example.com</li>
              <li>+123 456 7890</li>
            </ul>
            <div className="mt-6 flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-[#F9004D] transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-gray-500 flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Reeni. Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by Laralink.
          </p>
        </div>
      </div>
    </footer>
  );
}
