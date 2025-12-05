"use client";

import CoverImage from "@/components/ui/coverImage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CopyPlus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import PostTag from "@/components/admin/PostTag";
import { useRouter } from "next/navigation";

export default function AddNewPost() {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Create FormData with all fields
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("slug", data.slug || "");
      formData.append("content", data.content);
      formData.append("status", "draft");
      formData.append("tags", JSON.stringify(tags));

      // Add cover image if provided
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      // Submit everything in one request
      const response = await fetch("/api/admin/posts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }

      const result = await response.json();
      console.log("Post created successfully:", result);

      // Redirect to posts list
      router.push("/admin/posts");
    } catch (err: any) {
      console.error("Error submitting post:", err);
      setError(err.message || "An error occurred while creating the post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <CopyPlus size={24} />
        <span>New Post</span>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex w-full gap-6">
          <div className="w-full">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" {...register("title")} />
          </div>
          <div className="w-full">
            <Label htmlFor="slug">slug</Label>
            <Input type="text" id="slug" {...register("slug")} />
          </div>
        </div>
        <div className="flex items-center gap-6">
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
          <div className="w-full">
            {tags.length > 0 && (
              <PostTag onClick={handleRemoveTag} tags={tags} />
            )}
          </div>
        </div>
        <div className="space-y-3">
          <Label htmlFor="content">Content</Label>
          <Textarea id="content" {...register("content")} rows={10} />
        </div>
        <CoverImage
          value={coverImage}
          onChange={(file) => setCoverImage(file)}
          label="Cover Image"
        />
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
        <Button
          variant="default"
          size="lg"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Post"}
        </Button>
      </form>
    </div>
  );
}
