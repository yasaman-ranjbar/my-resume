"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { LoginData, useLogin } from "@/hooks/useLogin";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { register, handleSubmit, reset } = useForm<LoginData>();
  const { mutate: loginMutation , isPending } = useLogin();

  const onSubmit = (data: LoginData) => {
    loginMutation(data, {
      onSuccess: () => {
        toast.success("Login successful");
        reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="flex w-[300px] flex-col gap-4">
      <h1 className="text-primary mb-2 text-3xl font-bold tracking-tight md:text-3xl">
        Jasmine <span className="text-black">.</span>
      </h1>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full"
          required
        />
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full"
          required
        />
        <Button
          type="submit"
          className="bg-primary w-full text-white"
          disabled={isPending}>
          Login
        </Button>
      </form>
    </div>
  );
}
