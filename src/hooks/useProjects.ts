import { API_URL } from "@/config/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export interface CreateProjectData {
    title: string;
    slug?: string;
    description: string;
    shortDescription: string;
    liveUrl?: string;
    githubUrl?: string;
    tags: string[];
    thumbnail?: File | null;
}

export interface ProjectsProps {
    id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription: string;
    liveUrl?: string;
    githubUrl?: string;
    tags: string[];
    thumbnail?: string;
}

// fetch projects************************************************
const fetchProjects = async (): Promise<ProjectsProps[]> => {
    const response = await fetch(API_URL.ADMIN.PROJECTS);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch projects");
    }
    const data = await response.json();
    return data;
}

export const useGetProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
        retry: 1,
    })
}

// create project********************************************
const createProject = async (data: CreateProjectData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug || "");
    formData.append("description", data.description);
    formData.append("shortDescription", data.shortDescription);
    formData.append("liveUrl", data.liveUrl || "");
    formData.append("githubUrl", data.githubUrl || "");
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("thumbnail", data.thumbnail || "");

    const response = await fetch(API_URL.ADMIN.PROJECTS, {
        method: "POST",
        body: formData,
    })
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create project");
    }
    const responseData = await response.json();
    return responseData;
}

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}


// update project************************************************
const updateProject = async (data: ProjectsProps) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug || "");
    formData.append("description", data.description);
    formData.append("shortDescription", data.shortDescription);
    formData.append("liveUrl", data.liveUrl || "");
    formData.append("githubUrl", data.githubUrl || "");
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("thumbnail", data.thumbnail || "");

    const response = await fetch(`${API_URL.ADMIN.PROJECTS}/${data.id}`, {
        method: "PUT",
        body: formData,
    })
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update project");
    }
    const responseData = await response.json();
    return responseData;
}

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}

// delete project************************************************
const deleteProject = async (id: string) => {
    const response = await fetch(`${API_URL.ADMIN.PROJECTS}/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to delete project");
    }
    const responseData = await response.json();
    return responseData;
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}