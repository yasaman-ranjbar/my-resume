import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/pageContainer/Providers";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Jasmine resume",
  description:
    "Portfolio of a passionate Front-End Developer specializing in React and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter flex min-h-screen flex-col">
        <NextTopLoader color="#3b82f6" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
