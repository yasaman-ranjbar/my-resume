"use client";

import CoverImage from "@/components/ui/coverImage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CopyPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useForm, Controller } from "react-hook-form";
import PostTag from "@/components/admin/PostTag";
import { CreatePostData, useCreatePost } from "@/hooks/usePosts";
import { useCategories } from "@/hooks/useCategories";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

export default function AddNewPost() {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const { register, handleSubmit, control } = useForm<CreatePostData>({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      status: "draft",
      tags: [],
      category_id: "",
    },
  });
  const createPostMutation = useCreatePost();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  console.log("categories", categories);

  const onSubmit = async (data: CreatePostData) => {
    createPostMutation.mutate(
      {
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
          toast.success("Post created successfully!");
        },
        onError: (err: Error) => {
          toast.error(
            err.message || "Failed to create post. Please try again."
          );
        },
      }
    );
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
        <div className="flex md:flex-row flex-col w-full gap-6">
          <div className="w-full">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" {...register("title")} />
          </div>
          <div className="w-full">
            <Label htmlFor="slug">slug</Label>
            <Input type="text" id="slug" {...register("slug")} />
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
                  disabled={categoriesLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading categories...
                      </SelectItem>
                    ) : categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-categories" disabled>
                        No categories available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-6">
          
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
                <PostTag onClick={handleRemoveTag} tags={tags} />
              )}
            </div>
          )}
          <div className="w-full">
            <Label className="">Status: </Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="h-12 rounded-md py-2 px-4">
                  <RadioGroup
                    className="flex gap-5 pt-2"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="draft" id="draft" />
                      <Label htmlFor="draft">Draft</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="published" id="published" />
                      <Label htmlFor="published">Published</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            />
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
        <Button
          variant="default"
          size="lg"
          type="submit"
          disabled={createPostMutation.isPending}
        >
          {createPostMutation.isPending ? "Creating..." : "Create Post"}
        </Button>
      </form>
    </div>
  );
}
