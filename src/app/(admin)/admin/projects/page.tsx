"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/Badge";
import {
  useDeleteProject,
  useGetProjects,
} from "@/hooks/useProjects";
import Image from "next/image";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import AddProjectForm from "@/components/pageContainer/Admin/AddProjectForm";

const AdminProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: projects,
    isLoading,
    error,
  } = useGetProjects();
  const deleteProjectMutation = useDeleteProject();

  const handleDelete = async (id: string) => {
    deleteProjectMutation.mutate(id, {
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

  return (
    <div>
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
                  <p className="text-sm text-gray-500">
                    /{p?.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {p?.shortDescription}
                  </p>
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
                    onClick={() => setIsModalOpen(true)}
                  />
                  <Trash2
                    size={16}
                    className="cursor-pointer text-red-500"
                    onClick={() => handleDelete(p.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Project"
        size="lg"
        closeOnOverlayClick={true}
        showCloseButton={true}>
        <div className="space-y-6">
          <AddProjectForm
            handleSubmit={() => {}}
            onSubmit={() => {}}
            register={() => {}}
            buttonText="Save"
            disabled={false}
            imageValue={null}
            imageOnChange={() => {}}
            value=""
            onChange={() => {}}
            handleTagInputKeyDown={() => {}}
            tags={[]}
            handleRemoveTag={() => {}}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={() => setIsModalOpen(false)}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
              Cancel
            </Button>
            <Button
              onClick={() => {
                alert("Saved!");
                setIsModalOpen(false);
              }}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProjectsPage;
