import { Download, FileText } from 'lucide-react';

export default function Resume() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4">
      <div className="text-center space-y-6 max-w-lg">
        <div className="w-20 h-20 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mx-auto text-blue-400">
          <FileText size={40} />
        </div>
        
        <h1 className="text-3xl font-bold">Download Resume</h1>
        <p className="text-gray-400">
          Click the button below to download my latest resume in PDF format.
        </p>

        <a
          href="/resume.pdf"
          download="My_Resume.pdf"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/25 w-full sm:w-auto"
        >
          <Download className="mr-2 h-5 w-5" />
          Download PDF
        </a>
      </div>
    </div>
  );
}
