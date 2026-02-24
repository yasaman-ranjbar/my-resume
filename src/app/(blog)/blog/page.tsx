import BlogPosts from "../../../components/pageContainer/Blog/Posts";
import PageHeader from "@/components/pageContainer/pageHeader/PageHeader";
import type { PostsProps } from "@/types";
import { prisma } from "@/lib/prisma";

async function fetchBlogPosts(): Promise<PostsProps[]> {
  const posts = await prisma.post.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
  });
  return posts as unknown as PostsProps[];
}

export default async function Blog() {
  const posts = await fetchBlogPosts();

  return (
    <div>
      <PageHeader
        title="Blog"
        pageName="Blog"
        className="bg-[#F5F7FB]"
      />
      <BlogPosts posts={posts} />
    </div>
  );
}
