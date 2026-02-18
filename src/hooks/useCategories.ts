"use client";

import { API_URL } from "@/config/api";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
}

interface CreateCategoryData {
  name: string;
  slug?: string;
}

interface CreateCategoryResponse {
  category: Category;
}

const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(API_URL.ADMIN.CATEGORIES);

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({}));
    throw new Error(
      errorData.error || "Failed to fetch categories"
    );
  }

  const data = await response.json();
  return data;
};

const createCategory = async (
  data: CreateCategoryData
): Promise<CreateCategoryResponse> => {
  const response = await fetch(API_URL.ADMIN.CATEGORIES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      slug: data.slug || "",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || "Failed to create category"
    );
  }

  return response.json();
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    retry: 1,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      // Invalidate and refetch categories list after successful creation
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};
