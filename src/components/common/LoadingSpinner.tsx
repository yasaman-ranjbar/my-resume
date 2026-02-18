import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner = ({
  size = "md",
  className,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "size-4",
    md: "size-8",
    lg: "size-12",
  };

  return (
    <div
      className={cn(
        "flex min-h-[600px] items-center justify-center",
        className
      )}>
      <Spinner className={sizeClasses[size]} />
      Loading...
    </div>
  );
};

export default LoadingSpinner;
