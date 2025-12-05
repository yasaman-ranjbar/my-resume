"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ADMIN_ROUTES } from "@/constant/route";
import usePosts from "@/hooks/usePosts";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AdminPostsPage() {
  const { data: posts, isLoading, error } = usePosts();

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "Failed to load posts. Please try again later."
      );
    }
  }, [error]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <main className="p-8">
        <p className="text-red-500">Error loading posts</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <Link
          href={ADMIN_ROUTES.POSTS_NEW}
          className="px-4 py-2 bg-[#280A10] text-white rounded-lg"
        >
          New post
        </Link>
      </div>

      {!posts?.length && <p>No posts yet.</p>}

      <ul className="space-y-4">
        {posts?.map((p) => (
          <li
            key={p.id}
            className="border rounded p-4 flex justify-between items-start"
          >
            <div>
              <h2 className="text-lg font-medium">{p.title}</h2>
              <p className="text-sm text-gray-500">
                slug: {p.slug} • {p.status}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(p.created_at).toLocaleString()}
              </p>
            </div>
            <div className="space-x-2">
              <Link
                href={`/admin/posts/${p.id}`}
                className="px-3 py-1 border rounded"
              >
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
