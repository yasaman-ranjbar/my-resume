export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string; // HTML or Markdown content
  coverImage: string;
}

export const posts: BlogPost[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 14",
    date: "November 29, 2025",
    category: "Development",
    tags: ["Next.js", "React", "Web Development"],
    excerpt:
      "Learn how to build modern web applications with the latest features of Next.js 14, including Server Actions and the App Router.",
    coverImage: "/blog-placeholder.jpg",
    content: `
      <p>Next.js 14 is a game-changer for React developers. It introduces a stable App Router, Server Actions, and partial prerendering.</p>
      <h3>Why Next.js?</h3>
      <p>Next.js provides a robust framework for building full-stack web applications. It handles routing, rendering, and optimization out of the box.</p>
      <h3>Key Features</h3>
      <ul>
        <li><strong>App Router:</strong> A new paradigm for building applications using React Server Components.</li>
        <li><strong>Server Actions:</strong> Execute server-side code directly from your components.</li>
        <li><strong>Metadata API:</strong> Easily manage SEO tags.</li>
      </ul>
      <p>Stay tuned for more in-depth tutorials!</p>
    `,
  },
];
