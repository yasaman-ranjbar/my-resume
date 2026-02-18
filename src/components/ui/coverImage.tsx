"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CoverImageProps {
  value?: string | File | null;
  onChange?: (file: File | null) => void;
  className?: string;
  label?: string;
}

const CoverImage = React.forwardRef<
  HTMLDivElement,
  CoverImageProps
>(
  (
    { value, onChange, className, label = "Cover Image" },
    ref
  ) => {
    const [preview, setPreview] = useState<string | null>(
      typeof value === "string"
        ? value
        : value instanceof File
          ? URL.createObjectURL(value)
          : null
    );
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync preview with value prop changes
    useEffect(() => {
      if (value === null || value === undefined) {
        if (preview && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
        setPreview(null);
      } else if (typeof value === "string") {
        if (preview && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
        setPreview(value);
      } else if (value instanceof File) {
        if (preview && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
        setPreview(URL.createObjectURL(value));
      }
    }, [value]);

    // Cleanup object URLs on unmount
    useEffect(() => {
      return () => {
        if (preview && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      };
    }, [preview]);

    const handleFileSelect = (file: File | null) => {
      if (file && file.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        onChange?.(file);
      }
    };

    const handleFileChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = e.target.files?.[0] || null;
      handleFileSelect(file);
    };

    const handleDragOver = (
      e: React.DragEvent<HTMLDivElement>
    ) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (
      e: React.DragEvent<HTMLDivElement>
    ) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDrop = (
      e: React.DragEvent<HTMLDivElement>
    ) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0] || null;
      handleFileSelect(file);
    };

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview(null);
      onChange?.(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    return (
      <div
        className={cn("space-y-2", className)}
        ref={ref}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative w-full cursor-pointer rounded-lg border-2 border-dashed transition-colors",
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500",
            preview
              ? "min-h-[200px] bg-white dark:bg-gray-800"
              : "min-h-[150px] bg-gray-50 dark:bg-gray-900/50"
          )}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {preview ? (
            <div className="relative h-full min-h-[200px] w-full overflow-hidden rounded-lg">
              <img
                src={preview}
                alt="Cover preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 z-10 rounded-full bg-red-500 p-1.5 text-white shadow-lg transition-colors hover:bg-red-600"
                aria-label="Remove image">
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="flex h-full min-h-[150px] flex-col items-center justify-center p-6">
              <Upload
                size={48}
                className={cn(
                  "mb-4 transition-colors",
                  isDragging
                    ? "text-blue-500"
                    : "text-gray-400 dark:text-gray-500"
                )}
              />
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                <span className="cursor-pointer text-blue-600 hover:underline dark:text-blue-400">
                  Browse
                </span>{" "}
                or drop your files here
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

CoverImage.displayName = "CoverImage";

export default CoverImage;
