"use client";

import { PostsProps } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface PostsResponse {
  posts: PostsProps[];
}

export interface CreatePostData {
  title: string;
  slug?: string;
  content: string;
  status?: string;
  tags: string[];
  cover_url?: File | null;
  category_id?: string;
}

interface CreatePostResponse {
  post: PostsProps;
}

interface UpdatePostData {
  id: string;
  title: string;
  slug?: string;
  content: string;
  status?: string;
  tags: string[];
  cover_url?: File | null;
  category_id?: string;
}

interface UpdatePostResponse {
  post: PostsProps;
}

interface PostResponse {
  post: PostsProps;
}

const fetchPosts = async (search?: string, status?: string): Promise<PostsProps[]> => {
  // Build query parameters
  const params = new URLSearchParams();
  if (search && search.trim() !== "") {
    params.append("search", search.trim());
  }
  if (status && status !== "all") {
    params.append("status", status);
  }

  const url = `/api/admin/posts${params.toString() ? `?${params.toString()}` : ""}`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch posts");
  }

  const data = await response.json();
  return data;
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

  if (data.cover_url) {
    formData.append("cover_url", data.cover_url);
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

interface UpdatePostStatusData {
  id: string;
  title: string;
  content: string;
  status: string;
}

const updatePostStatus = async (
  data: UpdatePostStatusData
): Promise<void> => {
  const response = await fetch(`/api/admin/posts/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: data.title, content: data.content, status: data.status }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to update post status");
  }
};

const usePosts = (search?: string, status?: string) => {
  return useQuery({
    queryKey: ["posts", search, status],
    queryFn: () => fetchPosts(search, status),
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

export const useUpdatePostStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePostStatus,
    onSuccess: () => {
      // Invalidate and refetch posts list after successful status update
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

const fetchPost = async (id: string): Promise<PostsProps> => {
  const response = await fetch(`/api/admin/posts/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch post");
  }

  const data = await response.json();
  return data;
};

const updatePost = async (
  data: UpdatePostData
): Promise<UpdatePostResponse> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("slug", data.slug || "");
  formData.append("content", data.content);
  formData.append("status", data.status || "draft");
  formData.append("tags", JSON.stringify(data.tags));

  if (data.category_id) {
    formData.append("category_id", data.category_id);
  }

  if (data.cover_url) {
    formData.append("cover_url", data.cover_url);
  }

  const response = await fetch(`/api/admin/posts/${data.id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to update post");
  }

  return response.json();
};

const deletePost = async (id: string): Promise<void> => {
  const response = await fetch(`/api/admin/posts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to delete post");
  }
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
    retry: 1,
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      // Invalidate and refetch posts list and the specific post
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", data.post.id] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // Invalidate and refetch posts list after successful deletion
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export default usePosts;
