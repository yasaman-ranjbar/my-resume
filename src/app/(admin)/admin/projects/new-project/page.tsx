"use client";

import PostTag from "@/components/admin/PostTag";
import { Button } from "@/components/ui/Button";
import CoverImage from "@/components/ui/coverImage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateProjectData,
  useCreateProject,
} from "@/hooks/useProjects";
import { CopyPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AdminNewProjectPage = () => {
  const [thumbnail, setThumbnail] = useState<File | null>(
    null
  );
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const { register, handleSubmit, reset } =
    useForm<CreateProjectData>();
  const createProjectMutation = useCreateProject();

  const onSubmit = (data: CreateProjectData) => {
    createProjectMutation.mutate(
      { ...data, tags, thumbnail },
      {
        onSuccess: () => {
          toast.success("Project created successfully!");
          reset();
          setThumbnail(null);
          setTags([]);
          setTagInput("");
        },
        onError: (err: Error) => {
          toast.error(
            err.message ||
              "Failed to create project. Please try again."
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

  return (
    <div className="space-y-8 p-6">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <CopyPlus size={24} />
        <span>New Project</span>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="shortDescription">
              Short Description
            </Label>
            <Textarea
              id="shortDescription"
              {...register("shortDescription")}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input
              type="text"
              id="liveUrl"
              {...register("liveUrl")}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              type="text"
              id="githubUrl"
              {...register("githubUrl")}
            />
          </div>
          <div className="w-full">
            <div className="w-full">
              <Label htmlFor="tags">Tags</Label>
              <Input
                type="text"
                id="tags"
                {...register("tags")}
                value={tagInput}
                onChange={(e) =>
                  setTagInput(e.target.value)
                }
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
          <div className="w-full">
            <CoverImage
              value={thumbnail}
              onChange={(file) => setThumbnail(file)}
              label="Cover Image"
            />
          </div>
        </div>
        <Button
          variant="default"
          size="lg"
          type="submit"
          disabled={createProjectMutation.isPending}>
          {createProjectMutation.isPending
            ? "Creating..."
            : "Create Project"}
        </Button>
      </form>
    </div>
  );
};

export default AdminNewProjectPage;
