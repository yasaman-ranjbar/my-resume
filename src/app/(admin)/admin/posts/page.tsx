"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ADMIN_ROUTES } from "@/constant/route";
import usePosts, { useUpdatePostStatus } from "@/hooks/usePosts";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/Badge";
import { SquarePen, Trash2, Eye, EyeOff } from "lucide-react";
import { PostsProps } from "@/types";

export default function AdminPostsPage() {
  const { data: posts, isLoading, error } = usePosts();
  const updatePostStatus = useUpdatePostStatus();

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "Failed to load posts. Please try again later."
      );
    }
  }, [error]);

  const handleToggleStatus = async (post: PostsProps, status: string) => {
    updatePostStatus.mutate(
      { id: post.id, title: post.title, content: post.content, status },
      {
        onSuccess: () => {
          toast.success("Post status updated successfully");
        },
        onError: (error: Error) => {
          toast.error(
            error.message || "Failed to toggle status. Please try again later."
          );
        },
      }
    );
  };

  if (isLoading) {
    return (
        <LoadingSpinner />
    );
  }

  if (error) {
    return (
      <main className="p-8">
        <p className="text-red-500">Error loading posts</p>
      </main>
    );
  }

  console.log(posts);

  return (
    <main className="p-8 min-h-[600px]">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {posts?.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-lg space-y-4">
            <div className="flex flex-col gap-2 border-b border-gray-200 py-3">
              <div className="relative w-full h-48 mb-2">
                <Image
                  src={p.cover_url}
                  alt={p.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex items-center gap-3">
                <h1 className="font-semibold text-xl truncate">{p.title}</h1>
                <Badge
                  variant={p.status === "published" ? "success" : "secondary"}
                >
                  {p.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">/{p.slug}</p>
              <p className="text-sm text-gray-500">{p.content}</p>
              <div className="flex flex-wrap gap-2">
                {p?.tags?.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Created: {p.created_at.toLocaleString().slice(0, 10)}
              </p>
              <div className="flex items-center gap-4">
                {p.status === "published" ? (
                  <Eye
                    size={16}
                    className="text-gray-500 cursor-pointer"
                    onClick={() => handleToggleStatus(p, "draft")}
                  />
                ) : (
                  <EyeOff
                    size={16}
                    className="text-gray-500 cursor-pointer"
                    onClick={() => handleToggleStatus(p, "published")}
                  />
                )}
                <SquarePen size={16} className="text-blue-500 cursor-pointer" />
                <Trash2 size={16} className="text-red-500 cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
