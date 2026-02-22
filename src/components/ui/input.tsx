import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative flex h-10 items-center gap-4 rounded-lg border border-neutral-300 px-3 py-2">
        {icon}
        <input
          type={type}
          className={cn(
            "placeholder:text-muted-foreground w-full text-sm focus-visible:border-indigo-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 outline-none",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
