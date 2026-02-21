"use client";

import { Mail, Send, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    console.log("Form submitted:", formData);
    alert("Thanks for reaching out! This is a demo form.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Contact Info */}
        <div>
          <h1 className="mb-6 text-4xl font-bold">Let's Work Together</h1>
          <p className="mb-12 text-xl text-gray-400">
            I'm currently available for freelance projects and full-time opportunities. If you have
            a project that needs some creative touch, I'd love to hear about it.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 text-blue-400">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold">Email Me</h3>
                <a
                  href="mailto:hello@example.com"
                  className="text-gray-400 transition-colors hover:text-white">
                  hello@example.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 text-blue-400">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold">Telegram</h3>
                <a
                  href="https://t.me/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-white">
                  @username
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                className="w-full resize-none rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700">
              Send Message
              <Send
                size={18}
                className="ml-2"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
