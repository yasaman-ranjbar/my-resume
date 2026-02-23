"use client";

import TotalBox from "@/components/admin/TotalBox";
import { Button } from "@/components/ui/Button";
import { ADMIN_ROUTES } from "@/constant/route";
import { usePosts } from "@/hooks/usePosts";
import { useGetProjects } from "@/hooks/useProjects";
import { ListPlus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const AdminPage = () => {

  const { data: projects } = useGetProjects();
  const totalProjects = projects?.length;
  const { data: posts } = usePosts();
  const totalPosts = posts?.length;
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push(ADMIN_ROUTES.PROJECTS_NEW)}
            variant="default"
            className="flex cursor-pointer items-center justify-center rounded-full bg-white py-1 px-3 hover:bg-gray-200 outline-none text-gray-500">
            <Plus size={22} />
            Add Project
          </Button>
          <Button
            onClick={() => router.push(ADMIN_ROUTES.POSTS_NEW)}
            variant="outline"
            className="flex cursor-pointer items-center justify-center rounded-full bg-primary p-1 px-3 hover:bg-gray-200 outline-none text-white">
            <Plus size={22} />
            Add Posts
          </Button>
          <Button
            onClick={() => router.push(ADMIN_ROUTES.New_CATEGORY)}
            variant="outline"
            className="flex cursor-pointer items-center justify-center rounded-full bg-primary p-1 px-3 hover:bg-gray-200 outline-none text-white">
            <ListPlus size={22} />
            Manage Categories
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        plan, priorities, and accomplish your tasks with ease
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TotalBox
          title="Total Projects"
          value={totalProjects?.toString() || "0"}
          percentage="10%"
        />
        <TotalBox
          title="Total Posts"
          value={totalPosts?.toString() || "0"}
          percentage="10%"
        />
        <TotalBox
          title="Total Users"
          value="100"
          percentage="10%"
        />
      </div>
    </div>
  );
};

export default AdminPage;
