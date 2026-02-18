import BlogPosts from "../../../components/pageContainer/Blog/Posts";
import PageHeader from "@/components/pageContainer/pageHeader/PageHeader";

export default async function Blog() {
  // if (error) {
  //   console.error("Error fetching posts:", error);
  // }

  return (
    <div>
      <PageHeader
        title="Blog"
        pageName="Blog"
        className="bg-[#F5F7FB]"
      />
      {/* {error ? (
        <p className="text-center text-red-400">
          Failed to load posts. Please try again later.
        </p>
      ) : (
        <BlogPosts posts={posts || []} />
      )} */}
    </div>
  );
}
