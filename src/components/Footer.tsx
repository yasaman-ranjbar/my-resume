export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Front-End Developer. Built with Next.js & Tailwind CSS.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            GitHub
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
