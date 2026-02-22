const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const API_URL = {
  ADMIN: {
    CATEGORIES: `${BASE_URL}/api/admin/categories`,
    POSTS: `${BASE_URL}/api/admin/posts`,
    PROJECTS: `${BASE_URL}/api/admin/projects`,
    LOGIN: `${BASE_URL}/api/admin/auth/login`,
  },

  PUBLIC: {
    CATEGORIES: `${BASE_URL}/api/categories`,
    POSTS: `${BASE_URL}/api/posts`,
    PROJECTS: `${BASE_URL}/api/projects`,
  },
};
