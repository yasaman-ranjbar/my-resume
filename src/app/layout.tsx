import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/pageContainer/Providers";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

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
      <body
        className={`${inter.className} flex min-h-screen flex-col`}>
        <NextTopLoader color="#3b82f6" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
