import { API_URL } from "@/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface LoginData {
  email: string;
  password: string;
}

const userLogin = async (data: LoginData): Promise<LoginData> => {
  const response = await fetch(API_URL.ADMIN.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to login");
  }

  return response.json();
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["login"],
      });
    },
  });
};
