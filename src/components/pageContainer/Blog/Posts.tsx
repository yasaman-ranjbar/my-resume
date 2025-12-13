'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { PostsProps } from '@/types';

interface BlogPostsProps {
  posts: PostsProps[];
}

export default function BlogPosts({ posts }: BlogPostsProps) {
  return (
    <div className="container py-14">
      {posts.length === 0 ? (
        <p className="text-center text-gray-400">No blog posts available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 h-full flex flex-col">
                {/* Image */}
                <div className="aspect-video bg-gray-800 relative overflow-hidden">
                  {post.cover_url ? (
                    <Image 
                      src={post.cover_url} 
                      alt={post.title}
                      width={640}
                      height={360}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 group-hover:scale-105 transition-transform duration-500">
                      Blog Cover Image
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col grow">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {post.tags[0]}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 grow">
                    {post.content ? post.content.substring(0, 150) + '...' : 'Read more to discover the content'}
                  </p>

                  <div className="flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300 mt-auto">
                    Read Article
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
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

