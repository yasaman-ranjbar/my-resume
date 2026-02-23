import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "@/components/QueryProvider";

export const metadata: Metadata = {
  title: "Jasmine Ranjbar",
  description: "Portfolio of a passionate Front-End Developer specializing in React and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="font-inter flex min-h-screen flex-col">
        <NextTopLoader color="#3b82f6" />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
