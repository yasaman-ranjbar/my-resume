"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/Badge";
import {
  ProjectsProps,
  useDeleteProject,
  useGetProjects,
  useUpdateProject,
} from "@/hooks/useProjects";
import Image from "next/image";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FieldValues, useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PostTag from "@/components/admin/PostTag";
import CoverImage from "@/components/ui/coverImage";
import ConfirmDeleteModal from "@/components/pageContainer/Admin/ConfirmDeleteModal";

const AdminProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState<string | null>(null);
  const { setValue, getValues, register, handleSubmit } = useForm();
  const { data: projects, isLoading, error } = useGetProjects();
  const deleteProjectMutation = useDeleteProject();
  const updateProjectMutation = useUpdateProject();

  const handleDelete = async (id: string) => {
    deleteProjectMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Post deleted successfully");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to delete post. Please try again later.");
      },
    });
  };

  const handleUpdate = async (id: string, data: FieldValues) => {
    try {
      updateProjectMutation.mutate({ id, data });
      setIsModalOpen(false);
      setEditingProjectId(null);
      toast.success("Project updated successfully");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to update project");
      setIsModalOpen(false);
      setEditingProjectId(null);
    }
  };

  const handleEdit = (project: ProjectsProps) => {
    setEditingProjectId(project.id);
    setIsModalOpen(true);
    setValue("title", project.title);
    setValue("slug", project.slug);
    setValue("description", project.description);
    setValue("shortDescription", project.shortDescription);
    setValue("liveUrl", project.liveUrl);
    setValue("githubUrl", project.githubUrl);
    setValue("tags", project.tags);
    setValue("thumbnail", project.thumbnail);
  };

  return (
    <div>
      {/* Posts Grid with Loading and Error States */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-red-500">Error loading posts: {error.message}</p>
        </div>
      ) : !projects?.length ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">No posts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects?.map((p) => (
            <div
              key={p?.id}
              className="space-y-4 rounded-lg bg-white p-4">
              <div className="flex gap-5 border-b border-gray-200 py-3">
                <div className="relative mb-2 h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src={p?.thumbnail as string}
                    alt={p?.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex-1 flex-col gap-4">
                  <p className="text-sm text-gray-500">/{p?.title}</p>
                  <p className="text-sm text-gray-500">{p?.shortDescription}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p?.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href={p.liveUrl as string}
                  className="rounded-md bg-zinc-300 px-4 py-2 text-sm">
                  view project
                </Link>
                <div className="flex items-center gap-4">
                  <SquarePen
                    size={16}
                    className="cursor-pointer text-blue-500"
                    onClick={() => handleEdit(p)}
                  />
                  <Trash2
                    size={16}
                    className="cursor-pointer text-red-500"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setProjectIdToDelete(p.id);
                    }}
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
        onDelete={() => handleDelete(projectIdToDelete as string)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProjectId(null);
        }}
        title="Edit Project"
        size="lg"
        closeOnOverlayClick={true}
        showCloseButton={true}>
        <div className="space-y-6">
          <form
            onSubmit={handleSubmit(
              (data) => editingProjectId && handleUpdate(editingProjectId, data)
            )}
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
                <Label htmlFor="shortDescription">Short Description</Label>
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
                    value={getValues("tags")}
                    onChange={(e) => setValue("tags", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        setValue("tags", e.currentTarget.value);
                      }
                    }}
                    placeholder="Type a tag and press Enter"
                  />
                </div>
                {getValues("tags")?.length > 0 && (
                  <div className="w-full">
                    {getValues("tags")?.length > 0 && (
                      <PostTag
                        onClick={(tag) =>
                          setValue(
                            "tags",
                            getValues("tags").filter((t: string) => t !== tag)
                          )
                        }
                        tags={getValues("tags")}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="w-full">
                <CoverImage
                  value={getValues("thumbnail")}
                  onChange={(file) => setValue("thumbnail", file)}
                  label="Cover Image"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingProjectId(null);
                }}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateProjectMutation.isPending}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                {updateProjectMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProjectsPage;
