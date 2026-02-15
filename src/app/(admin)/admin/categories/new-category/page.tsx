"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCreateCategory } from "@/hooks/useCategories";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/Button";

export default function CategoriesPage() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      slug: "",
    },
  });
  const createCategoryMutation = useCreateCategory();

  const onSubmit = async (data: { name: string; slug: string }) => {
    createCategoryMutation.mutate(
      {
        name: data.name,
        slug: data.slug || "",
      },
      {
        onSuccess: () => {
          toast.success("Category created successfully!");
          reset();
        },
        onError: (err: Error) => {
          toast.error(
            err.message || "Failed to create category. Please try again."
          );
        },
      }
    );
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <CopyPlus size={24} />
        <span>New Category</span>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex md:flex-row flex-col w-full gap-6">
          <div className="w-full">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="slug">Slug</Label>
            <Input type="text" id="slug" {...register("slug")} />
          </div>
        </div>
        <Button
          variant="default"
          size="lg"
          type="submit"
          disabled={createCategoryMutation.isPending}
        >
          {createCategoryMutation.isPending ? "Creating..." : "Create Category"}
        </Button>
      </form>
    </div>
  );
}
