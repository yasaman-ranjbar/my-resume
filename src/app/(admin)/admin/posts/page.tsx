"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ADMIN_ROUTES } from "@/constant/route";
import { usePosts, useUpdatePostStatus, useDeletePost, useUpdatePost } from "@/hooks/usePosts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/Badge";
import { SquarePen, Trash2, Eye, EyeOff, Search, CopyPlus } from "lucide-react";
import { PostsProps } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Modal } from "@/components/ui/Modal";
import { Label } from "@radix-ui/react-label";
import { useCategories } from "@/hooks/useCategories";
import PostTag from "@/components/admin/PostTag";
import CoverImage from "@/components/ui/coverImage";
import { Button } from "@/components/ui/Button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import ConfirmDeleteModal from "@/components/pageContainer/Admin/ConfirmDeleteModal";

function PostListContent() {
  const { setValue, getValues, register, handleSubmit, control, watch } = useForm();
  const watchedTags = watch("tags");
  const tagsArray = Array.isArray(watchedTags) ? watchedTags : [];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: categories } = useCategories();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [postToEditId, setPostToEditId] = useState<string | null>(null);

  // Initialize state from URL query parameters
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "all");

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch posts with search and filter parameters
  const { data: posts, isLoading, error } = usePosts(debouncedSearchQuery, statusFilter);
  const updatePostStatus = useUpdatePostStatus();
  const deletePostMutation = useDeletePost();
  const updatePostMutation = useUpdatePost();

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearchQuery && debouncedSearchQuery.trim() !== "") {
      params.set("search", debouncedSearchQuery.trim());
    }

    if (statusFilter && statusFilter !== "all") {
      params.set("status", statusFilter);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    // Use replace to avoid cluttering browser history
    router.replace(newUrl, { scroll: false });
  }, [debouncedSearchQuery, statusFilter, pathname, router]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to load posts. Please try again later.");
    }
  }, [error]);

  const handleToggleStatus = async (post: PostsProps, status: string) => {
    updatePostStatus.mutate(
      {
        ...post,
        status,
      },
      {
        onSuccess: () => {
          toast.success("Post status updated successfully");
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to toggle status. Please try again later.");
        },
      }
    );
  };

  const handleDeletePost = async (id: string) => {
    deletePostMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Post deleted successfully");
        setIsDeleteModalOpen(false);
        setPostIdToDelete(null);
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to delete post. Please try again later.");
        setIsDeleteModalOpen(false);
        setPostIdToDelete(null);
      },
    });
  };

  const handleEditPost = async (id: string, post: PostsProps) => {
    setIsEditModalOpen(true);
    setPostToEditId(id);
    setValue("title", post.title);
    setValue("slug", post.slug);
    setValue("content", post.content);
    setValue("status", post.status);
    setValue("category_id", post.category_id != null ? String(post.category_id) : "");
    setValue("tags", post.tags);
    setValue("cover_url", post.cover_url);
  };

  const handleUpdate = async (id: string, data: FieldValues) => {
    try {
      updatePostMutation.mutate({
        id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
        tags: data.tags ?? [],
        category_id: data.category_id,
        cover_url: data.cover_url,
      });
      setIsEditModalOpen(false);
      setPostToEditId(null);
      toast.success("Project updated successfully");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to update project");
      setIsEditModalOpen(false);
      setPostToEditId(null);
    }
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
              onChange={(e) => setSearchQuery(e.target.value)}
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
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
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
          <p className="text-red-500">Error loading posts: {error.message}</p>
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
                  <h1 className="truncate text-xl font-semibold">{p.title}</h1>
                  <Badge variant={p?.status === "published" ? "success" : "secondary"}>
                    {p?.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">/{p?.slug}</p>
                <p className="text-sm text-gray-500">{p?.content}</p>
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
                  Created: {p.createdAt.toLocaleString().slice(0, 10)}
                </p>
                <div className="flex items-center gap-4">
                  {p.status === "published" ? (
                    <Eye
                      size={16}
                      className="cursor-pointer text-gray-500"
                      onClick={() => handleToggleStatus(p, "draft")}
                    />
                  ) : (
                    <EyeOff
                      size={16}
                      className="cursor-pointer text-gray-500"
                      onClick={() => handleToggleStatus(p, "published")}
                    />
                  )}
                  <SquarePen
                    size={16}
                    className="cursor-pointer text-blue-500"
                    onClick={() => handleEditPost(p.id, p)}
                  />
                  <Trash2
                    size={16}
                    className="cursor-pointer text-red-500"
                    onClick={() => { setIsDeleteModalOpen(true); setPostIdToDelete(p.id); }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDeleteModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        onDelete={() => handleDeletePost(postIdToDelete as string)}
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setPostToEditId(null);
        }}
        title="Edit Project"
        size="lg"
        closeOnOverlayClick={true}
        showCloseButton={true}>
        <div className="space-y-6">
          <form
            onSubmit={handleSubmit((data) => postToEditId && handleUpdate(postToEditId, data))}
            className="space-y-4">
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="w-full">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  {...register("title")}
                />
              </div>
              <div className="w-full">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  type="text"
                  id="slug"
                  {...register("slug")}
                />
              </div>
              <div className="w-full">
                <Controller
                  name="category_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value != null && field.value !== "" ? String(field.value) : ""}
                      onValueChange={field.onChange}
                      disabled={isLoading}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoading ? (
                          <SelectItem
                            value="loading"
                            disabled>
                            Loading categories...
                          </SelectItem>
                        ) : categories && categories.length > 0 ? (
                          categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem
                            value="no-categories"
                            disabled>
                            No categories available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>


              <div className="w-full">
                <div className="w-full">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    type="text"
                    id="tags"
                    placeholder="Type a tag and press Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const trimmed = e.currentTarget.value.trim();
                        if (trimmed && !tagsArray.includes(trimmed)) {
                          setValue("tags", [...tagsArray, trimmed], {
                            shouldValidate: true,
                          });
                          e.currentTarget.value = "";
                        }
                      }
                    }}
                  />
                </div>
                {tagsArray.length > 0 && (
                  <div className="w-full">
                    <PostTag
                      onClick={(tag) =>
                        setValue(
                          "tags",
                          tagsArray.filter((t: string) => t !== tag),
                          { shouldValidate: true }
                        )
                      }
                      tags={tagsArray}
                    />
                  </div>
                )}
              </div>
              <div className="w-full"><Label className="">Status: </Label>
                <Controller
                  name="status"
                  control={control}
                  render={() => (
                    <div className="h-12 rounded-md px-4 py-2">
                      <RadioGroup
                        className="flex gap-5 pt-2"
                        value={getValues("status")}
                        onValueChange={(value) => setValue("status", value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="draft"
                            id="draft"
                          />
                          <Label htmlFor="draft">Draft</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="published"
                            id="published"
                          />
                          <Label htmlFor="published">Published</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                /></div>
              <div className="w-full">
                <CoverImage
                  value={getValues("cover_url")}
                  onChange={(file) => setValue("cover_url", file)}
                  label="Cover Image"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setPostToEditId(null);
                }}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updatePostMutation.isPending}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                {updatePostMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
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
