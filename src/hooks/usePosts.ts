"use client";

import { PostsProps } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface PostsResponse {
  posts: PostsProps[];
}

interface CreatePostData {
  title: string;
  slug?: string;
  content: string;
  status?: string;
  tags: string[];
  coverImage?: File | null;
  category_id?: string;
}

interface CreatePostResponse {
  post: PostsProps;
}

const fetchPosts = async (): Promise<PostsProps[]> => {
  const response = await fetch("/api/admin/posts");

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch posts");
  }

  const data: PostsResponse = await response.json();
  return data.posts;
};

const createPost = async (
  data: CreatePostData
): Promise<CreatePostResponse> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("slug", data.slug || "");
  formData.append("content", data.content);
  formData.append("status", data.status || "draft");
  formData.append("tags", JSON.stringify(data.tags));

  if (data.category_id) {
    formData.append("category_id", data.category_id);
  }

  if (data.coverImage) {
    formData.append("coverImage", data.coverImage);
  }

  const response = await fetch("/api/admin/posts", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create post");
  }

  return response.json();
};

const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    retry: 1,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch posts list after successful creation
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export default usePosts;
