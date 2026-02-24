import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import type { PostsProps } from "@/types";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { stripHtml } from "@/utils/content";

interface PageParams {
  slug: string;
}

interface PageSearchParams {
  id?: string;
}

interface PageProps {
  params: Promise<PageParams>;
  searchParams: Promise<PageSearchParams>;
}

async function fetchPostById(id: string): Promise<PostsProps | null> {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return null;

  const post = await prisma.post.findUnique({
    where: { id: numericId },
  });

  if (!post || post.status !== "published") return null;
  return post as unknown as PostsProps;
}

async function fetchPostBySlug(slug: string): Promise<PostsProps | null> {
  const post = await prisma.post.findFirst({
    where: {
      slug,
      status: "published",
    },
  });
  return (post as unknown as PostsProps) ?? null;
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { id } = await searchParams;

  const post = (id && (await fetchPostById(id))) ?? (await fetchPostBySlug(slug));

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
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="mb-8 text-3xl leading-tight font-bold md:text-5xl">
            {post.title}
          </h1>

          {post.cover_url && (
            <Image
              src={post.cover_url}
              alt={post.title}
              className="h-full w-full object-cover"
              width={640}
              height={360}
            />
          )}
        </header>


        <div
          className="prose prose-invert prose-lg prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags && post.tags.length > 0 && (
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
        )}
      </article>
    </div>
  );
}
