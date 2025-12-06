export interface PostsProps {
    id: string;
    title: string;
    slug: string;
    status: string;
    created_at: string;
    cover_url:string;
    category_id:string;
    content:string;
    tags:string[];
  }