"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { PostsProps } from "@/types";

interface BlogPostsProps {
  posts: PostsProps[];
}

export default function BlogPosts({ posts }: BlogPostsProps) {
  return (
    <div className="container py-14">
      {posts.length === 0 ? (
        <p className="text-center text-gray-400">No blog posts available yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group">
              <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-gray-800">
                  {post.cover_url ? (
                    <Image
                      src={post.cover_url}
                      alt={post.title}
                      width={640}
                      height={360}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 transition-transform duration-500 group-hover:scale-105">
                      Blog Cover Image
                    </div>
                  )}
                </div>

                <div className="flex grow flex-col p-6">
                  <div className="mb-4 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-blue-400">
                        {post.tags[0]}
                      </span>
                    )}
                  </div>

                  <h2 className="mb-3 line-clamp-2 text-xl font-bold transition-colors group-hover:text-blue-400">
                    {post.title}
                  </h2>

                  <p className="mb-6 line-clamp-3 grow text-sm text-gray-400">
                    {post.content
                      ? post.content.substring(0, 150) + "..."
                      : "Read more to discover the content"}
                  </p>

                  <div className="mt-auto flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300">
                    Read Article
                    <ArrowRight
                      size={16}
                      className="ml-1 transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
