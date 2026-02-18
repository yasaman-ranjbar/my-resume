"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ADMIN_ROUTES } from "@/constant/route";
import {
  usePosts,
  useUpdatePostStatus,
  useDeletePost,
} from "@/hooks/usePosts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/Badge";
import {
  SquarePen,
  Trash2,
  Eye,
  EyeOff,
  Search,
  CopyPlus,
} from "lucide-react";
import { PostsProps } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Input } from "@/components/ui/input";
import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

function PostListContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL query parameters
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "all"
  );

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(
    searchQuery,
    500
  );

  // Fetch posts with search and filter parameters
  const {
    data: posts,
    isLoading,
    error,
  } = usePosts(debouncedSearchQuery, statusFilter);
  const updatePostStatus = useUpdatePostStatus();
  const deletePostMutation = useDeletePost();

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (
      debouncedSearchQuery &&
      debouncedSearchQuery.trim() !== ""
    ) {
      params.set("search", debouncedSearchQuery.trim());
    }

    if (statusFilter && statusFilter !== "all") {
      params.set("status", statusFilter);
    }

    const queryString = params.toString();
    const newUrl = queryString
      ? `${pathname}?${queryString}`
      : pathname;

    // Use replace to avoid cluttering browser history
    router.replace(newUrl, { scroll: false });
  }, [
    debouncedSearchQuery,
    statusFilter,
    pathname,
    router,
  ]);

  useEffect(() => {
    if (error) {
      toast.error(
        error.message ||
          "Failed to load posts. Please try again later."
      );
    }
  }, [error]);

  const handleToggleStatus = async (
    post: PostsProps,
    status: string
  ) => {
    updatePostStatus.mutate(
      {
        id: post.id,
        title: post.title,
        content: post.content,
        status,
      },
      {
        onSuccess: () => {
          toast.success("Post status updated successfully");
        },
        onError: (error: Error) => {
          toast.error(
            error.message ||
              "Failed to toggle status. Please try again later."
          );
        },
      }
    );
  };

  const handleDeletePost = async (id: string) => {
    deletePostMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Post deleted successfully");
      },
      onError: (error: Error) => {
        toast.error(
          error.message ||
            "Failed to delete post. Please try again later."
        );
      },
    });
  };

  const handleEditPost = async (id: string) => {
    router.push(`${ADMIN_ROUTES.POSTS_EDIT}/${id}`);
  };

  return (
    <main className="min-h-[600px] p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <Link
          href={ADMIN_ROUTES.POSTS_NEW}
          className="flex items-center gap-2 rounded-lg bg-[#280A10] px-4 py-2 text-white">
          <CopyPlus size={16} />
          New post
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex flex-1 gap-3">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <Input
              className="flex-1 pl-10"
              type="text"
              placeholder="Search posts by title..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All Status
                </SelectItem>
                <SelectItem value="published">
                  Published
                </SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Posts Grid with Loading and Error States */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-red-500">
            Error loading posts: {error.message}
          </p>
        </div>
      ) : !posts?.length ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">No posts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts?.map((p) => (
            <div
              key={p?.id}
              className="space-y-4 rounded-lg bg-white p-4">
              <div className="flex flex-col gap-2 border-b border-gray-200 py-3">
                <div className="relative mb-2 h-48 w-full">
                  <Image
                    src={p?.cover_url}
                    alt={p?.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <h1 className="truncate text-xl font-semibold">
                    {p.title}
                  </h1>
                  <Badge
                    variant={
                      p?.status === "published"
                        ? "success"
                        : "secondary"
                    }>
                    {p?.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  /{p?.slug}
                </p>
                <p className="text-sm text-gray-500">
                  {p?.content}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p?.tags?.map((tag) => (
                    <Badge
                      key={tag}
                      variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Created:{" "}
                  {p.createdAt
                    .toLocaleString()
                    .slice(0, 10)}
                </p>
                <div className="flex items-center gap-4">
                  {p.status === "published" ? (
                    <Eye
                      size={16}
                      className="cursor-pointer text-gray-500"
                      onClick={() =>
                        handleToggleStatus(p, "draft")
                      }
                    />
                  ) : (
                    <EyeOff
                      size={16}
                      className="cursor-pointer text-gray-500"
                      onClick={() =>
                        handleToggleStatus(p, "published")
                      }
                    />
                  )}
                  <SquarePen
                    size={16}
                    className="cursor-pointer text-blue-500"
                    onClick={() => handleEditPost(p.id)}
                  />
                  <Trash2
                    size={16}
                    className="cursor-pointer text-red-500"
                    onClick={() => handleDeletePost(p.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default function AdminPostsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <LoadingSpinner />
        </div>
      }>
      <PostListContent />
    </Suspense>
  );
}
