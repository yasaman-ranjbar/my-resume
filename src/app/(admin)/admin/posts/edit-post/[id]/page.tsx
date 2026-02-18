"use client";

import CoverImage from "@/components/ui/coverImage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react";
import {
  useState,
  useEffect,
  startTransition,
} from "react";
import { Button } from "@/components/ui/Button";
import { useForm, Controller } from "react-hook-form";
import PostTag from "@/components/admin/PostTag";
import { usePost, useUpdatePost } from "@/hooks/usePosts";
import { useCategories } from "@/hooks/useCategories";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/RadioGroup";
import { useParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ADMIN_ROUTES } from "@/constant/route";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = usePost(postId);
  const [coverImage, setCoverImage] = useState<File | null>(
    null
  );
  const [coverImageUrl, setCoverImageUrl] = useState<
    string | null
  >(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const { register, handleSubmit, control, reset } =
    useForm({
      defaultValues: {
        title: "",
        slug: "",
        content: "",
        status: "draft",
        tags: "",
        category_id: "",
      },
    });
  const updatePostMutation = useUpdatePost();
  const { data: categories, isLoading: categoriesLoading } =
    useCategories();

  // Pre-fill form when post data is loaded
  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        slug: post.slug || "",
        content: post.content || "",
        status: post.status || "draft",
        category_id: post.category_id || "",
      });
      // Batch state updates using startTransition to avoid cascading renders
      startTransition(() => {
        setTags(post.tags || []);
        setCoverImageUrl(post.cover_url || null);
      });
    }
  }, [post, reset]);

  interface FormData {
    title: string;
    slug: string;
    content: string;
    status: string;
    category_id: string;
  }

  const onSubmit = async (data: FormData) => {
    if (!postId) {
      toast.error("Post ID is missing");
      return;
    }

    updatePostMutation.mutate(
      {
        id: postId,
        title: data.title,
        slug: data.slug || "",
        content: data.content,
        status: data.status || "draft",
        tags,
        cover_url: coverImage,
        category_id: data.category_id || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Post updated successfully!");
          router.push(ADMIN_ROUTES.POSTS);
        },
        onError: (err: Error) => {
          toast.error(
            err.message ||
              "Failed to update post. Please try again."
          );
        },
      }
    );
  };

  const handleTagInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedValue = tagInput.trim();
      if (trimmedValue && !tags.includes(trimmedValue)) {
        setTags([...tags, trimmedValue]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleCoverImageChange = (file: File | null) => {
    setCoverImage(file);
    if (file) {
      setCoverImageUrl(null); // Clear the URL when a new file is selected
    }
  };

  if (postLoading) {
    return <LoadingSpinner />;
  }

  if (postError) {
    return (
      <div className="p-6">
        <p className="text-red-500">
          {postError.message ||
            "Failed to load post. Please try again later."}
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Post not found.</p>
      </div>
    );
  }

  const categoryName = categories?.find(
    (category) => category.id === parseInt(post.category_id)
  )?.name;
  console.log("categoryName", categoryName);

  return (
    <div className="space-y-8 p-6">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <SquarePen size={24} />
        <span>Edit Post</span>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4">
        <div className="flex w-full gap-6">
          <div className="w-full">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              {...register("title")}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="slug">slug</Label>
            <Input
              type="text"
              id="slug"
              {...register("slug")}
            />
          </div>

          <div className="w-full">
            <Label>Category</Label>
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={categoriesLoading}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesLoading ? (
                      <SelectItem
                        value="loading"
                        disabled>
                        Loading categories...
                      </SelectItem>
                    ) : categories &&
                      categories.length > 0 ? (
                      categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={post?.category_id.toString()}>
                          {categoryName}
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
        </div>
        <div className="flex items-center gap-6">
          <div className="w-full">
            <Label className="">Status: </Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="h-12 rounded-md border border-stone-400 px-4 py-2">
                  <RadioGroup
                    className="flex gap-5 pt-2"
                    value={field.value}
                    onValueChange={field.onChange}>
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
                      <Label htmlFor="published">
                        Published
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="tags">Tags</Label>
            <Input
              type="text"
              id="tags"
              {...register("tags")}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              placeholder="Type a tag and press Enter"
            />
          </div>
          {tags && (
            <div className="w-full">
              {tags.length > 0 && (
                <PostTag
                  onClick={handleRemoveTag}
                  tags={tags}
                />
              )}
            </div>
          )}
        </div>
        <div className="space-y-3">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            {...register("content")}
            rows={10}
          />
        </div>
        <CoverImage
          value={coverImage || coverImageUrl}
          onChange={handleCoverImageChange}
          label="Cover Image"
        />
        <div className="flex gap-4">
          <Button
            variant="default"
            size="lg"
            type="submit"
            disabled={updatePostMutation.isPending}>
            {updatePostMutation.isPending
              ? "Updating..."
              : "Update Post"}
          </Button>
          <Button
            variant="outline"
            size="lg"
            type="button"
            onClick={() => router.push(ADMIN_ROUTES.POSTS)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
