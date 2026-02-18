import PostTag from "@/components/admin/PostTag";
import { Button } from "@/components/ui/Button";
import CoverImage from "@/components/ui/coverImage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateProjectData } from "@/hooks/useProjects";
import { Label } from "@radix-ui/react-label";
import { UseFormRegister } from "react-hook-form";

interface AddProjectFormProps {
  handleSubmit: (data: CreateProjectData) => void;
  onSubmit: () => void;
  register: UseFormRegister<CreateProjectData>;
  buttonText: string;
  disabled: boolean;
  imageValue: File | null;
  imageOnChange: (file: File | null) => void;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleTagInputKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  tags: string[];
  handleRemoveTag: (tag: string) => void;
}

const AddProjectForm = ({
  register,
  onSubmit,
  buttonText,
  disabled,
  imageValue,
  imageOnChange,
  value,
  onChange,
  handleTagInputKeyDown,
  tags,
  handleRemoveTag,
}: AddProjectFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="w-full">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            {...register("title")}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="slug">Slug</Label>
          <Input
            type="text"
            id="slug"
            {...register("slug")}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
          />

        </div>
        <div className="w-full">
          <Label htmlFor="shortDescription">
            Short Description
          </Label>
          <Textarea
            id="shortDescription"
            {...register("shortDescription")}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="liveUrl">Live URL</Label>
          <Input
            type="text"
            id="liveUrl"
            {...register("liveUrl")}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input
            type="text"
            id="githubUrl"
            {...register("githubUrl")}
          />
        </div>
        <div className="w-full">
          <div className="w-full">
            <Label htmlFor="tags">Tags</Label>
            <Input
              type="text"
              id="tags"
              {...register("tags")}
              value={value}
              onChange={onChange}
              onKeyDown={handleTagInputKeyDown}
              placeholder="Type a tag and press Enter"
            />
          </div>
          {tags?.length > 0 && (
            <div className="w-full">
              {tags.length > 0 && (
                <PostTag
                  onClick={handleRemoveTag}
                  tags={tags}
                />
              )}
            </div>
          )}
        </div>
        <div className="w-full">
          <CoverImage
            value={imageValue}
            onChange={imageOnChange}
            label="Cover Image"
          />
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        type="submit"
        disabled={disabled}>
        {buttonText}
      </Button>
    </form>
  );
};

export default AddProjectForm;
