import Link from 'next/link';
import { posts as localPosts } from '@/data/posts';
import { Calendar, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default async function Blog() {
  // Try to fetch posts from Supabase, fall back to local posts if it fails
  let posts = localPosts;
  
  try {
    const { data: supabasePosts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

    console.log(supabasePosts);
    
    if (!error && supabasePosts && supabasePosts.length > 0) {
      posts = supabasePosts;
    }
  } catch (error) {
    // If Supabase is not configured or fails, use local posts
    console.warn('Failed to fetch posts from Supabase, using local posts:', error);
  }


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 h-full flex flex-col">
              {/* Image Placeholder */}
              <div className="aspect-video bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 group-hover:scale-105 transition-transform duration-500">
                  Blog Cover Image
                </div>
              </div>

              <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 grow">
                  {post.excerpt}
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
    </div>
  );
}
