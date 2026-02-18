"use client";

import { X } from "lucide-react";

type TagsProps = {
  tags: string[];
  onClick: (tag: string) => void;
};

const PostTag = ({ tags, onClick }: TagsProps) => {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1.5 rounded-md bg-indigo-100 px-3 py-1.5 text-sm font-medium text-indigo-800">
          {tag}
          <button
            type="button"
            onClick={() => onClick(tag)}
            className="rounded-full p-0.5 transition-colors hover:bg-indigo-200"
            aria-label={`Remove ${tag} tag`}>
            <X size={14} />
          </button>
        </span>
      ))}
    </div>
  );
};

export default PostTag;
