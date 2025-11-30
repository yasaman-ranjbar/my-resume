"use client";

import { PostsProps } from "@/types";
import { useQuery } from "@tanstack/react-query";

interface PostsResponse {
  posts: PostsProps[];
}

const fetchPosts = async (): Promise<PostsProps[]> => {
  const response = await fetch("/api/admin/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data: PostsResponse = await response.json();
  return data.posts;
};

const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};

export default usePosts;
