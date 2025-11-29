import { posts } from '@/data/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Folder } from 'lucide-react';

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Blog
      </Link>

      <article>
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-blue-400">
              <Folder size={16} />
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="aspect-video w-full bg-gray-800 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center text-gray-600 mb-10">
            Cover Image Placeholder
          </div>
        </header>

        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Tag size={18} className="text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-white/5 text-gray-300 rounded-full border border-white/10"
                >
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
