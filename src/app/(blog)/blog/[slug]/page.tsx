import { posts } from "@/data/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Folder } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center text-gray-400 transition-colors hover:text-white">
        <ArrowLeft
          size={20}
          className="mr-2"
        />
        Back to Blog
      </Link>

      <article>
        <header className="mb-10 text-center">
          <div className="mb-6 flex items-center justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-blue-400">
              <Folder size={16} />
              {post.category}
            </span>
          </div>

          <h1 className="mb-8 text-3xl leading-tight font-bold md:text-5xl">{post.title}</h1>

          <div className="mb-10 flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-800 text-gray-600">
            Cover Image Placeholder
          </div>
        </header>

        <div
          className="prose prose-invert prose-lg prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-12 border-t border-white/10 pt-8">
          <div className="flex items-center gap-2">
            <Tag
              size={18}
              className="text-gray-400"
            />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
