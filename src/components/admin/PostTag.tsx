"use client";

import { X } from "lucide-react";

type TagsProps = {
  tags: string[];
  onClick: (tag: string) => void;
};

const PostTag = ({ tags, onClick }: TagsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-100 text-indigo-800 text-sm font-medium"
        >
          {tag}
          <button
            type="button"
            onClick={() => onClick(tag)}
            className="hover:bg-indigo-200 rounded-full p-0.5 transition-colors"
            aria-label={`Remove ${tag} tag`}
          >
            <X size={14} />
          </button>
        </span>
      ))}
    </div>
  );
};

export default PostTag;
