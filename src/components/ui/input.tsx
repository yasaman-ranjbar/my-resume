import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps =
  React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "placeholder:text-muted-foreground flex h-12 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus-visible:border-indigo-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
