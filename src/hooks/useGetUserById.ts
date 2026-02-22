import { useQuery } from "@tanstack/react-query";

const fetchUserById = async (userId: string | number) => {
  const response = await fetch(`/api/admin/user/${userId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

export const useUserById = (userId: string | number) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
  });
};
