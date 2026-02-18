import { Download, FileText } from "lucide-react";

export default function Resume() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center px-4">
      <div className="max-w-lg space-y-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-blue-400">
          <FileText size={40} />
        </div>

        <h1 className="text-3xl font-bold">
          Download Resume
        </h1>
        <p className="text-gray-400">
          Click the button below to download my latest
          resume in PDF format.
        </p>

        <a
          href="/resume.pdf"
          download="My_Resume.pdf"
          className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-base font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 hover:bg-blue-700 sm:w-auto">
          <Download className="mr-2 h-5 w-5" />
          Download PDF
        </a>
      </div>
    </div>
  );
}
