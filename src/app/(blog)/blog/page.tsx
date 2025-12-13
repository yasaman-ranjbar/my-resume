import { supabaseAdmin } from "@/lib/supabaseAdmin";
import BlogPosts from "../../../components/pageContainer/Blog/Posts";
import PageHeader from "@/components/pageContainer/pageHeader/PageHeader";

export default async function Blog() {
  const { data: posts, error } = await supabaseAdmin
    .from("posts")
    .select(
      "id, title, slug, status, created_at, content, cover_url, tags, category_id"
    )
    .eq("status", "published") // Only show published posts on the public blog
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div>
      <PageHeader title="Blog" pageName="Blog" className="bg-[#F5F7FB]" />
      {error ? (
        <p className="text-center text-red-400">
          Failed to load posts. Please try again later.
        </p>
      ) : (
        <BlogPosts posts={posts || []} />
      )}
    </div>
  );
}
