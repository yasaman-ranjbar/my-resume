"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Level } from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
  Bold,
  Italic,
  Strikethrough,
  ListOrdered,
  List,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Palette,
} from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

type TiptapEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

type ToolbarButtonProps = {
  isActive?: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
};

const ToolbarButton = ({ isActive, onClick, icon, label }: ToolbarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border text-xs transition-colors ${
      isActive
        ? "border-primary bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-muted hover:text-foreground border-transparent"
    }`}>
    {icon}
  </button>
);

const headingOptions = [
  { level: 1, label: "H1", icon: <Heading1 size={16} /> },
  { level: 2, label: "H2", icon: <Heading2 size={16} /> },
  { level: 3, label: "H3", icon: <Heading3 size={16} /> },
  { level: 4, label: "H4", icon: <Heading4 size={16} /> },
  { level: 5, label: "H5", icon: <Heading5 size={16} /> },
  { level: 6, label: "H6", icon: <Heading6 size={16} /> },
];

const TiptapEditor = ({ value, onChange }: TiptapEditorProps) => {
  const [currentColor, setCurrentColor] = useState<string>("#000000");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      Color.configure({ types: ["textStyle"] }),
      TextStyle,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    content: value || "",
    autofocus: "end",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          " max-w-none bg-white text-sm min-h-[260px] w-full px-4 py-3 text-gray-800 outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!editor) return;
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result;
      if (typeof src === "string") {
        editor.chain().focus().setImage({ src }).run();
      }
    };
    reader.readAsDataURL(file);

    // Reset input so selecting the same image again still triggers onChange
    event.target.value = "";
  };

  const handleSetLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previousUrl || "https://");

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!editor) return;
    const color = event.target.value;
    setCurrentColor(color);
    editor.chain().focus().setColor(color).run();
  };

  if (!editor) return null;

  const activeHeading =
    headingOptions.find((option) => editor.isActive("heading", { level: option.level }))
      ?.label || "Normal";

  return (
    <div className="overflow-hidden rounded-md border border-gray-300 bg-gray-100 shadow-sm">
      {/* Top toolbar */}
      <div className="bg-muted/60 flex flex-wrap items-center justify-between gap-3 border-b border-gray-300 px-3 py-2">
        <div className="flex flex-wrap items-center gap-2">
          {/* Heading selector */}

          <Select
            value={activeHeading}
            onValueChange={(value) => {
              console.log(value);
              if (value === "Normal") {
                editor.chain().focus().setParagraph().run();
                return;
              }
              const selected = headingOptions.find((option) => option.label === value);
              if (selected) {
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: selected.level as Level })
                  .run();
              }
            }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a heading" />
            </SelectTrigger>
            <SelectContent>
              {headingOptions.map((option) => (
                <SelectItem
                  key={option.level}
                  value={option.label}>
                  {option.label}
                </SelectItem>
              ))}
              <SelectItem
                value="Normal"
                disabled>
                Normal text
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {/* Basic formatting */}
          <ToolbarButton
            label="Bold"
            icon={<Bold size={16} />}
            isActive={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
          <ToolbarButton
            label="Italic"
            icon={<Italic size={16} />}
            isActive={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
          <ToolbarButton
            label="Strikethrough"
            icon={<Strikethrough size={16} />}
            isActive={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          />

          {/* Lists */}
          <span className="bg-border mx-1 h-5 w-px" />
          <ToolbarButton
            label="Bullet list"
            icon={<List size={16} />}
            isActive={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          <ToolbarButton
            label="Ordered list"
            icon={<ListOrdered size={16} />}
            isActive={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />

          {/* Alignment */}
          <span className="bg-border mx-1 h-5 w-px" />
          <ToolbarButton
            label="Align left"
            icon={<AlignLeft size={16} />}
            isActive={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          />
          <ToolbarButton
            label="Align center"
            icon={<AlignCenter size={16} />}
            isActive={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          />
          <ToolbarButton
            label="Align right"
            icon={<AlignRight size={16} />}
            isActive={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          />
          <ToolbarButton
            label="Justify"
            icon={<AlignJustify size={16} />}
            isActive={editor.isActive({ textAlign: "justify" })}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          />

          {/* Links & images */}
          <span className="bg-border mx-1 h-5 w-px" />
          <ToolbarButton
            label="Add link"
            icon={<LinkIcon size={16} />}
            isActive={editor.isActive("link")}
            onClick={handleSetLink}
          />
          <ToolbarButton
            label="Insert image"
            icon={<ImageIcon size={16} />}
            onClick={() => fileInputRef.current?.click()}
          />
          <Input
            type="color"
            icon={<Palette size={16} />}
            value={currentColor}
            onChange={handleColorChange}
            className="h-4 w-6 cursor-pointer border-none bg-transparent p-0"
          />
        </div>
      </div>

      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Editor area */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
